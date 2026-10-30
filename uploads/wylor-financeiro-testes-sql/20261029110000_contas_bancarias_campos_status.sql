-- Campos operacionais do módulo de contas, preservando os registros existentes.
alter table public.bank_accounts
  add column if not exists description text,
  add column if not exists status text not null default 'active';

alter table public.bank_accounts drop constraint if exists bank_accounts_status_check;
alter table public.bank_accounts add constraint bank_accounts_status_check
  check (status in ('active', 'inactive')) not valid;
alter table public.bank_accounts validate constraint bank_accounts_status_check;
alter table public.bank_accounts drop constraint if exists bank_accounts_description_check;
alter table public.bank_accounts add constraint bank_accounts_description_check
  check (description is null or char_length(description) <= 500) not valid;
alter table public.bank_accounts validate constraint bank_accounts_description_check;

create index if not exists bank_accounts_company_status_name_idx
  on public.bank_accounts (company_id, status, name);
