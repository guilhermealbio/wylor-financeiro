-- Corrige ajustes feitos depois da aplicação das migrações anteriores.
-- Novos integrantes entram somente pela função controlada; não há políticas
-- de INSERT ou UPDATE para clientes na tabela company_members.
-- A política é verificada antes de ser criada ou alinhada. Objetos com outra
-- tabela, comando, papel ou permissividade causam parada para revisão manual.
do $$
declare
  existing_policy record;
  normalized_qual text;
begin
  select policyname, permissive, roles, cmd, qual
    into existing_policy
  from pg_catalog.pg_policies
  where schemaname = 'public'
    and tablename = 'company_members'
    and policyname = 'company_members: integrantes saem ou admin remove';

  if not found then
    create policy "company_members: integrantes saem ou admin remove"
      on public.company_members
      for delete to authenticated
      using (user_id = (select auth.uid()) or public.is_company_member(company_id, array['owner','admin']::text[]));
  else
    normalized_qual := lower(existing_policy.qual);
    normalized_qual := regexp_replace(normalized_qual, '::(pg_catalog\.)?text(\[\])?', '', 'g');
    normalized_qual := regexp_replace(normalized_qual, 'public\.', '', 'g');
    normalized_qual := regexp_replace(normalized_qual, 'as uid', '', 'g');
    normalized_qual := regexp_replace(normalized_qual, $pattern$[[:space:]()']$pattern$, '', 'g');

    if existing_policy.cmd <> 'DELETE'
       or existing_policy.permissive <> 'PERMISSIVE'
       or existing_policy.roles <> array['authenticated']::name[]
       or existing_policy.qual is null
       or normalized_qual is distinct from 'user_id=selectauth.uid()oris_company_member(company_id,array[owner,admin])' then
      raise exception 'A política existente tem comando, permissividade, papel ou regra inesperada; interrompida sem alteração.'
        using errcode = '55000';
    end if;

    -- Mantém a política existente e atualiza sua condição à regra esperada.
    alter policy "company_members: integrantes saem ou admin remove"
      on public.company_members
      to authenticated
      using (user_id = (select auth.uid()) or public.is_company_member(company_id, array['owner','admin']::text[]));
  end if;
end $$;

create or replace function public.add_company_member(
  target_company_id uuid,
  target_email text,
  target_role text default 'member'
) returns uuid
language plpgsql security definer set search_path = '' as $$
declare
  actor_role text;
  target_user_id uuid;
  new_member_id uuid;
begin
  select member_row.role into actor_role
  from public.company_members member_row
  where member_row.company_id = target_company_id
    and member_row.user_id = (select auth.uid())
  for update;

  if actor_role is null or actor_role not in ('owner','admin') then
    raise exception 'Somente owner ou admin pode adicionar integrantes.' using errcode = '42501';
  end if;
  if target_role is null or target_role not in ('member','viewer','admin') then
    raise exception 'O papel solicitado não pode ser atribuído por esta função.' using errcode = '22023';
  end if;
  if target_role = 'admin' and actor_role <> 'owner' then
    raise exception 'Somente owner pode conceder o papel de admin.' using errcode = '42501';
  end if;

  select auth_user.id into target_user_id
  from auth.users auth_user
  where lower(auth_user.email) = lower(trim(target_email));
  if target_user_id is null then
    raise exception 'Esta pessoa ainda não tem uma conta no WYLOR Financeiro.' using errcode = 'P0002';
  end if;

  insert into public.company_members (company_id, user_id, role)
  values (target_company_id, target_user_id, target_role)
  on conflict (company_id, user_id) do nothing
  returning id into new_member_id;
  if new_member_id is null then
    raise exception 'Esta pessoa já participa da empresa.' using errcode = '23505';
  end if;
  return new_member_id;
end $$;
revoke execute on function public.add_company_member(uuid, text, text) from public, anon;
grant execute on function public.add_company_member(uuid, text, text) to authenticated;

create or replace function public.protect_last_company_owner() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  locked_company_id uuid;
  owner_is_being_removed boolean := false;
begin
  if tg_op = 'UPDATE' then
    if new.company_id is distinct from old.company_id then
      raise exception 'A participação não pode ser movida para outra empresa.' using errcode = '23514';
    end if;
    owner_is_being_removed := old.role = 'owner' and new.role is distinct from old.role;
  else
    owner_is_being_removed := old.role = 'owner';
  end if;

  if owner_is_being_removed then
    select company_row.id into locked_company_id
    from public.companies company_row
    where company_row.id = old.company_id
    for update;
    if locked_company_id is not null and not exists (
      select 1 from public.company_members other_owner
      where other_owner.company_id = old.company_id
        and other_owner.role = 'owner'
        and other_owner.id <> old.id
    ) then
      raise exception 'A empresa precisa manter pelo menos um owner.' using errcode = 'P0001';
    end if;
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
revoke execute on function public.protect_last_company_owner() from public, anon, authenticated;

create or replace function public.write_audit_log() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  changed_row jsonb;
  company_key uuid;
  entity_key uuid;
begin
  if tg_op = 'DELETE' then changed_row := to_jsonb(old); else changed_row := to_jsonb(new); end if;
  if tg_table_name = 'companies' then
    company_key := (changed_row ->> 'id')::uuid;
  else
    company_key := (changed_row ->> 'company_id')::uuid;
  end if;
  entity_key := (changed_row ->> 'id')::uuid;
  -- Evita inserir auditoria ligada a uma empresa já removida durante cascata.
  if company_key is not null and entity_key is not null
     and exists (select 1 from public.companies company_row where company_row.id = company_key) then
    insert into public.audit_logs (company_id, actor_user_id, action, entity, entity_id)
    values (company_key, (select auth.uid()), lower(tg_op), tg_table_name, entity_key);
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
revoke execute on function public.write_audit_log() from public, anon, authenticated;

-- Campos de lançamentos liquidados não podem ser alterados sem cancelamento.
create or replace function public.apply_financial_transaction_rules() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  category_kind text;
  account_company uuid;
  account_status text;
  snapshot_before jsonb;
begin
  if not public.is_company_member(new.company_id, array['owner','admin','member']::text[]) then
    raise exception 'Acesso não autorizado à empresa';
  end if;
  if new.status = 'overdue' and (new.due_date is null or new.due_date >= (now() at time zone 'America/Sao_Paulo')::date) then
    raise exception 'Um lançamento só pode vencer após a data de vencimento';
  end if;
  select c.kind into category_kind from public.financial_categories c
    where c.id = new.category_id and c.company_id = new.company_id and c.active;
  if category_kind is distinct from new.kind then raise exception 'A categoria não corresponde ao tipo do lançamento'; end if;
  if new.bank_account_id is not null then
    select a.company_id, a.status into account_company, account_status from public.bank_accounts a where a.id = new.bank_account_id;
    if account_company is distinct from new.company_id then raise exception 'A conta bancária pertence a outra empresa'; end if;
    if new.status in ('paid','received') and account_status <> 'active' then raise exception 'Selecione uma conta bancária ativa para liquidar'; end if;
  end if;
  if new.kind = 'income' and new.status = 'paid' then raise exception 'Use o estado recebido para receitas'; end if;
  if new.kind = 'expense' and new.status = 'received' then raise exception 'Use o estado pago para despesas'; end if;
  if tg_op = 'UPDATE' then
    if old.company_id <> new.company_id or old.kind <> new.kind or old.request_key <> new.request_key then raise exception 'Empresa, tipo e chave do lançamento não podem ser alterados'; end if;
    if old.status in ('paid','received') and new.status not in ('paid','received','cancelled') then raise exception 'Estorne o lançamento antes de alterar seu estado'; end if;
    if old.status = 'cancelled' and new.status <> 'cancelled' then raise exception 'Um lançamento cancelado não pode ser reaberto'; end if;
    if old.status in ('paid','received') and (
      old.amount <> new.amount
      or old.bank_account_id is distinct from new.bank_account_id
      or old.category_id <> new.category_id
      or old.competence_date <> new.competence_date
      or old.due_date is distinct from new.due_date
      or old.settled_at is distinct from new.settled_at
      or old.description <> new.description
    ) then raise exception 'Cancele e registre um novo lançamento para corrigir dados liquidados'; end if;
  end if;
  return new;
end $$;
revoke execute on function public.apply_financial_transaction_rules() from public, anon, authenticated;
