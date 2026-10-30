-- Receitas, despesas e efeitos realizados, preservando o saldo inicial.

create table if not exists public.financial_transactions (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  bank_account_id uuid references public.bank_accounts(id) on delete restrict,
  category_id uuid not null references public.financial_categories(id) on delete restrict,
  kind text not null check (kind in ('income','expense')),
  description text not null check (char_length(description) between 1 and 240),
  amount numeric(14,2) not null check (amount > 0),
  competence_date date not null,
  due_date date,
  settled_at date,
  status text not null check (status in ('pending','paid','received','overdue','cancelled')),
  notes text check (notes is null or char_length(notes) <= 2000),
  request_key uuid not null,
  created_by uuid not null default auth.uid() references auth.users(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(company_id, request_key),
  check ((status = 'received' and kind = 'income') or status <> 'received'),
  check ((status = 'paid' and kind = 'expense') or status <> 'paid'),
  check (((status in ('paid','received')) and settled_at is not null and bank_account_id is not null) or (status not in ('paid','received')))
);
create index if not exists financial_transactions_company_competence_idx on public.financial_transactions(company_id, competence_date desc, id);
create index if not exists financial_transactions_company_status_due_idx on public.financial_transactions(company_id, status, due_date);
create index if not exists financial_transactions_account_idx on public.financial_transactions(bank_account_id);
create index if not exists financial_transactions_category_idx on public.financial_transactions(category_id);
create index if not exists financial_transactions_created_by_idx on public.financial_transactions(created_by);
alter table public.financial_transactions enable row level security;
create policy "financial_transactions: integrantes consultam" on public.financial_transactions
  for select to authenticated using (public.is_company_member(company_id));
create policy "financial_transactions: membros cadastram" on public.financial_transactions
  for insert to authenticated with check (public.is_company_member(company_id, array['owner','admin','member']::text[]) and created_by = (select auth.uid()));
create policy "financial_transactions: membros alteram" on public.financial_transactions
  for update to authenticated using (public.is_company_member(company_id, array['owner','admin','member']::text[]))
  with check (public.is_company_member(company_id, array['owner','admin','member']::text[]));

create table if not exists public.account_movements (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  bank_account_id uuid not null references public.bank_accounts(id) on delete restrict,
  transaction_id uuid not null references public.financial_transactions(id) on delete restrict,
  effect text not null check (effect in ('settlement','reversal')),
  amount numeric(14,2) not null check (amount <> 0),
  effective_date date not null,
  created_at timestamptz not null default now(),
  unique(transaction_id, effect)
);
create index if not exists account_movements_company_date_idx on public.account_movements(company_id, effective_date desc);
create index if not exists account_movements_account_date_idx on public.account_movements(bank_account_id, effective_date desc);
alter table public.account_movements enable row level security;
create policy "account_movements: integrantes consultam" on public.account_movements
  for select to authenticated using (public.is_company_member(company_id));

create table if not exists public.financial_transaction_audit (
  id uuid primary key default gen_random_uuid(),
  company_id uuid not null references public.companies(id) on delete cascade,
  transaction_id uuid not null references public.financial_transactions(id) on delete restrict,
  actor_user_id uuid references auth.users(id) on delete set null,
  action text not null check (action in ('created','updated','settled','cancelled')),
  before_data jsonb,
  after_data jsonb,
  created_at timestamptz not null default now()
);
create index if not exists financial_transaction_audit_txn_idx on public.financial_transaction_audit(company_id, transaction_id, created_at desc);
create index if not exists financial_transaction_audit_transaction_id_idx on public.financial_transaction_audit(transaction_id);
create index if not exists financial_transaction_audit_actor_user_id_idx on public.financial_transaction_audit(actor_user_id);
alter table public.financial_transaction_audit enable row level security;
create policy "financial_transaction_audit: owner e admin consultam" on public.financial_transaction_audit
  for select to authenticated using (public.is_company_member(company_id, array['owner','admin']::text[]));

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
    snapshot_before := to_jsonb(old);
  end if;
  return new;
end $$;
revoke execute on function public.apply_financial_transaction_rules() from public, anon, authenticated;
create or replace trigger financial_transactions_validate before insert or update on public.financial_transactions
  for each row execute function public.apply_financial_transaction_rules();

create or replace function public.record_financial_transaction_effects() returns trigger
language plpgsql security definer set search_path = '' as $$
declare
  signed_amount numeric(14,2);
  row_after jsonb;
  row_before jsonb;
  audit_action text;
begin
  row_after := to_jsonb(new);
  if tg_op = 'UPDATE' then row_before := to_jsonb(old); end if;
  if new.status in ('paid','received') and (tg_op = 'INSERT' or old.status not in ('paid','received')) then
    signed_amount := case when new.kind = 'income' then new.amount else -new.amount end;
    insert into public.account_movements(company_id, bank_account_id, transaction_id, effect, amount, effective_date)
      values (new.company_id, new.bank_account_id, new.id, 'settlement', signed_amount, new.settled_at);
  elsif tg_op = 'UPDATE' and old.status in ('paid','received') and new.status = 'cancelled' then
    select -m.amount into signed_amount from public.account_movements m where m.transaction_id = new.id and m.effect = 'settlement';
    if signed_amount is null then raise exception 'Movimentação original não encontrada para estorno'; end if;
    insert into public.account_movements(company_id, bank_account_id, transaction_id, effect, amount, effective_date)
      values (new.company_id, old.bank_account_id, new.id, 'reversal', signed_amount, (now() at time zone 'America/Sao_Paulo')::date);
  end if;
  audit_action := case when tg_op = 'INSERT' then 'created' when new.status = 'cancelled' and old.status <> 'cancelled' then 'cancelled' when new.status in ('paid','received') and old.status not in ('paid','received') then 'settled' else 'updated' end;
  insert into public.financial_transaction_audit(company_id, transaction_id, actor_user_id, action, before_data, after_data)
    values (new.company_id, new.id, (select auth.uid()), audit_action, row_before, row_after);
  return new;
end $$;
revoke execute on function public.record_financial_transaction_effects() from public, anon, authenticated;
create or replace trigger financial_transactions_effects after insert or update on public.financial_transactions
  for each row execute function public.record_financial_transaction_effects();

create or replace trigger financial_transactions_touch_updated_at before update on public.financial_transactions
  for each row execute function public.touch_updated_at();

create or replace view public.account_movement_totals with (security_invoker = true) as
  select company_id, bank_account_id, sum(amount)::numeric(14,2) as amount
  from public.account_movements group by company_id, bank_account_id;
create or replace view public.financial_current_month_totals with (security_invoker = true) as
  select company_id, kind, sum(amount)::numeric(14,2) as amount
  from public.financial_transactions
  where ((kind = 'income' and status = 'received') or (kind = 'expense' and status = 'paid'))
    and settled_at >= date_trunc('month', (now() at time zone 'America/Sao_Paulo')::date)::date
    and settled_at < (date_trunc('month', (now() at time zone 'America/Sao_Paulo')::date) + interval '1 month')::date
  group by company_id, kind;
revoke all on public.account_movement_totals, public.financial_current_month_totals from public, anon;
grant select on public.account_movement_totals, public.financial_current_month_totals to authenticated;
