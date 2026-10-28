-- Perfis vinculados ao Supabase Auth.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null default '' check (char_length(full_name) <= 120),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy "profiles: usuário lê o próprio perfil" on public.profiles
  for select to authenticated using ((select auth.uid()) = id);
create policy "profiles: usuário atualiza o próprio perfil" on public.profiles
  for update to authenticated using ((select auth.uid()) = id)
  with check ((select auth.uid()) = id);

create or replace function public.touch_updated_at() returns trigger
language plpgsql set search_path = '' as $$
begin
  new.updated_at = now();
  return new;
end $$;
revoke execute on function public.touch_updated_at() from public, anon, authenticated;
create or replace trigger profiles_touch_updated_at before update on public.profiles
  for each row execute function public.touch_updated_at();

create or replace function public.create_profile_for_new_user() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', ''))
  on conflict (id) do nothing;
  return new;
end $$;
revoke execute on function public.create_profile_for_new_user() from public, anon, authenticated;
create or replace trigger auth_user_create_profile after insert on auth.users
  for each row execute function public.create_profile_for_new_user();

-- Empresas e participação com papéis conferidos no banco.
create table if not exists public.companies (
  id uuid primary key default gen_random_uuid(),
  fantasy_name text not null check (char_length(fantasy_name) between 1 and 160),
  legal_name text check (legal_name is null or char_length(legal_name) <= 200),
  cnpj text check (cnpj is null or cnpj ~ '^[0-9]{14}$'),
  control_start_date date not null,
  currency text not null default 'BRL' check (currency = 'BRL'),
  time_zone text not null default 'America/Sao_Paulo' check (time_zone = 'America/Sao_Paulo'),
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
create index if not exists companies_created_by_idx on public.companies (created_by);
alter table public.companies enable row level security;
create or replace trigger companies_touch_updated_at before update on public.companies
  for each row execute function public.touch_updated_at();

create table if not exists public.company_members (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  role text not null default 'member' check (role in ('owner','admin','member','viewer')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, user_id)
);
create index if not exists company_members_user_id_idx on public.company_members (user_id);
alter table public.company_members enable row level security;
create or replace function public.is_company_member(target_company_id uuid, allowed_roles text[] default null)
returns boolean language sql stable security definer set search_path = '' as $$
  select exists (
    select 1 from public.company_members member_row
    where member_row.company_id = target_company_id
      and member_row.user_id = (select auth.uid())
      and (allowed_roles is null or member_row.role = any (allowed_roles))
  );
$$;
revoke execute on function public.is_company_member(uuid, text[]) from public, anon;
grant execute on function public.is_company_member(uuid, text[]) to authenticated;
create policy "companies: membros consultam" on public.companies
  for select to authenticated using (public.is_company_member(id) or created_by = (select auth.uid()));
create policy "companies: usuário cria a própria empresa" on public.companies
  for insert to authenticated with check (created_by = (select auth.uid()));
create policy "companies: owner e admin alteram" on public.companies
  for update to authenticated
  using (public.is_company_member(id, array['owner','admin']::text[]))
  with check (public.is_company_member(id, array['owner','admin']::text[]));
create policy "company_members: integrantes consultam" on public.company_members
  for select to authenticated using (public.is_company_member(company_id));
create policy "company_members: integrantes saem ou admin remove" on public.company_members
  for delete to authenticated
  using (user_id = (select auth.uid()) or public.is_company_member(company_id, array['owner','admin']::text[]));

create or replace function public.add_company_owner() returns trigger
language plpgsql security definer set search_path = '' as $$
begin
  insert into public.company_members (company_id, user_id, role)
  values (new.id, new.created_by, 'owner')
  on conflict (company_id, user_id) do nothing;
  return new;
end $$;
revoke execute on function public.add_company_owner() from public, anon, authenticated;
create or replace trigger company_add_creator_as_owner after insert on public.companies
  for each row execute function public.add_company_owner();

create or replace function public.protect_last_company_owner() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  locked_company_id uuid;
begin
  if old.role = 'owner' and (tg_op = 'DELETE' or new.role <> 'owner') then
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
  return coalesce(new, old);
end $$;
revoke execute on function public.protect_last_company_owner() from public, anon, authenticated;
create or replace trigger company_members_protect_last_owner before update or delete on public.company_members
  for each row execute function public.protect_last_company_owner();
create or replace trigger company_members_touch_updated_at before update on public.company_members
  for each row execute function public.touch_updated_at();

-- Contas bancárias sem saldo fictício. O saldo inicial é opcional e não é receita.
create table if not exists public.bank_accounts (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  bank_name text check (bank_name is null or char_length(bank_name) <= 120),
  account_type text not null check (account_type in ('checking','savings','payment','investment','other')),
  currency text not null default 'BRL' check (currency = 'BRL'),
  opening_balance numeric(14,2),
  opening_balance_date date,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check ((opening_balance is null and opening_balance_date is null) or (opening_balance is not null and opening_balance_date is not null))
);
create index if not exists bank_accounts_company_id_idx on public.bank_accounts (company_id);
create index if not exists bank_accounts_created_by_idx on public.bank_accounts (created_by);
alter table public.bank_accounts enable row level security;
create policy "bank_accounts: integrantes consultam" on public.bank_accounts
  for select to authenticated using (public.is_company_member(company_id));
create policy "bank_accounts: membros cadastram" on public.bank_accounts
  for insert to authenticated
  with check (public.is_company_member(company_id, array['owner','admin','member']::text[]) and created_by = (select auth.uid()));
create policy "bank_accounts: membros atualizam" on public.bank_accounts
  for update to authenticated
  using (public.is_company_member(company_id, array['owner','admin','member']::text[]))
  with check (public.is_company_member(company_id, array['owner','admin','member']::text[]));
create policy "bank_accounts: owner e admin removem" on public.bank_accounts
  for delete to authenticated using (public.is_company_member(company_id, array['owner','admin']::text[]));
create or replace trigger bank_accounts_touch_updated_at before update on public.bank_accounts
  for each row execute function public.touch_updated_at();

create table if not exists public.financial_categories (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  name text not null check (char_length(name) between 1 and 120),
  kind text not null check (kind in ('income','expense')),
  active boolean not null default true,
  created_by uuid not null default auth.uid() references auth.users (id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (company_id, kind, name)
);
create index if not exists financial_categories_company_id_idx on public.financial_categories (company_id);
create index if not exists financial_categories_created_by_idx on public.financial_categories (created_by);
alter table public.financial_categories enable row level security;
create policy "financial_categories: integrantes consultam" on public.financial_categories
  for select to authenticated using (public.is_company_member(company_id));
create policy "financial_categories: membros cadastram" on public.financial_categories
  for insert to authenticated
  with check (public.is_company_member(company_id, array['owner','admin','member']::text[]) and created_by = (select auth.uid()));
create policy "financial_categories: membros atualizam" on public.financial_categories
  for update to authenticated
  using (public.is_company_member(company_id, array['owner','admin','member']::text[]))
  with check (public.is_company_member(company_id, array['owner','admin','member']::text[]));
create policy "financial_categories: owner e admin removem" on public.financial_categories
  for delete to authenticated using (public.is_company_member(company_id, array['owner','admin']::text[]));
create or replace trigger financial_categories_touch_updated_at before update on public.financial_categories
  for each row execute function public.touch_updated_at();

create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies (id) on delete cascade,
  actor_user_id uuid references auth.users (id) on delete set null,
  action text not null check (action in ('insert','update','delete')),
  entity text not null check (entity in ('companies','company_members','bank_accounts','financial_categories')),
  entity_id uuid not null,
  created_at timestamptz not null default now()
);
create index if not exists audit_logs_company_created_idx on public.audit_logs (company_id, created_at desc);
create index if not exists audit_logs_actor_user_id_idx on public.audit_logs (actor_user_id);
alter table public.audit_logs enable row level security;
create policy "audit_logs: owner e admin consultam" on public.audit_logs
  for select to authenticated using (public.is_company_member(company_id, array['owner','admin']::text[]));

create or replace function public.write_audit_log() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  changed_row jsonb;
  company_key uuid;
  entity_key uuid;
begin
  if tg_op = 'DELETE' then
    changed_row := to_jsonb(old);
  else
    changed_row := to_jsonb(new);
  end if;
  if tg_table_name = 'companies' then
    company_key := (changed_row ->> 'id')::uuid;
  else
    company_key := (changed_row ->> 'company_id')::uuid;
  end if;
  entity_key := (changed_row ->> 'id')::uuid;
  if company_key is not null and entity_key is not null then
    insert into public.audit_logs (company_id, actor_user_id, action, entity, entity_id)
    values (company_key, (select auth.uid()), lower(tg_op), tg_table_name, entity_key);
  end if;
  if tg_op = 'DELETE' then return old; end if;
  return new;
end $$;
revoke execute on function public.write_audit_log() from public, anon, authenticated;
create or replace trigger companies_write_audit_log after insert or update or delete on public.companies
  for each row execute function public.write_audit_log();
create or replace trigger company_members_write_audit_log after insert or update or delete on public.company_members
  for each row execute function public.write_audit_log();
create or replace trigger bank_accounts_write_audit_log after insert or update or delete on public.bank_accounts
  for each row execute function public.write_audit_log();
create or replace trigger financial_categories_write_audit_log after insert or update or delete on public.financial_categories
  for each row execute function public.write_audit_log();
