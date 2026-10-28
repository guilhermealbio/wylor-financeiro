# WYLOR Financeiro

Aplicação web estática com autenticação e acesso ao Supabase pelo navegador. O projeto usa apenas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, chaves públicas protegidas pelas políticas RLS do banco. Nenhuma chave administrativa é usada no cliente.

## Iniciar

Execute `npm run build`. A versão pronta fica em `dist/`.

## Primeiro acesso

Crie uma conta com seu e-mail e confirme o endereço pelo link recebido. No primeiro acesso, cadastre os dados reais da empresa. O criador recebe o papel de owner. O saldo inicial de cada conta é opcional, precisa de uma data quando informado e não é registrado como receita.

## Banco de dados

A estrutura inicial está em `supabase/migrations/`. Ela cria perfis, empresas, membros, contas bancárias, categorias financeiras e registros de auditoria, todos com RLS. A migração precisa ser aplicada pelo cartão do banco do projeto antes de usar as telas com dados.

O acesso do Supabase é mantido ligado a este projeto pelo ODIM. Não configure `service_role`, senha do banco ou outra credencial administrativa no frontend.
