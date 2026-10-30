# WYLOR Financeiro

Aplicação web estática com autenticação e acesso ao Supabase pelo navegador. O projeto usa apenas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`, chaves públicas protegidas pelas políticas RLS do banco. Nenhuma chave administrativa é usada no cliente.

## Iniciar

Execute `npm run build`. Por padrão, ele usa o Supabase de produção já configurado no `.env`. A versão pronta fica em `dist/`.

## Ambiente de testes Supabase

Crie um segundo projeto Supabase separado, com região e senha próprias. Não reutilize o projeto, banco, usuários nem credenciais de produção. No projeto novo, aplique em ordem todos os arquivos de `supabase/migrations/` e configure a autenticação e os URLs de retorno para o endereço usado nos testes. As migrações criam as tabelas, funções e políticas RLS do app; confira o esquema e RLS no projeto de teste antes de cadastrar usuários ou dados.

Copie `.env.test.example` para `.env.test` e preencha somente:

- `WY_TEST_SUPABASE_URL`: Project URL exibida na página Connect ou nas configurações da API do projeto `wylor-financeiro-testes`.
- `WY_TEST_SUPABASE_ANON_KEY`: Publishable Key desse mesmo projeto. O nome da variável também aceita a chave pública legada `anon`.

Não use `service_role`, `sb_secret_` nem senha do banco. O arquivo `.env.test` é ignorado pelo Git. Para gerar a cópia de teste, execute `npm run build -- --environment=test`. Antes de criar `dist/`, esse comando verifica que a URL é diferente da produção, que a chave parece pública e que a API REST do projeto responde aceitando essa chave. Se a conexão não puder ser validada, o build para sem gerar a cópia e nenhuma migração é executada. Depois da validação, aplique as migrações somente ao projeto `wylor-financeiro-testes` pelo cartão correspondente do Supabase. Confira que o cartão indica o projeto de testes antes de confirmar. A cópia de teste mostra um aviso persistente. Para voltar a gerar produção, execute `npm run build`, que seleciona apenas `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` de `.env`.

As chaves `anon` e `publishable` são públicas e podem aparecer no navegador do ambiente correspondente; a segurança depende de RLS. A chave pública fica incluída no build destinado ao ambiente selecionado, e nenhuma chave administrativa é incluída. Nunca publique o build de teste como produção. O projeto de teste precisa ter Auth habilitado e URLs de retorno próprias. Não cadastre dados reais de clientes.

## Primeiro acesso

Crie uma conta com seu e-mail e confirme o endereço pelo link recebido. No primeiro acesso, cadastre os dados reais da empresa. O criador recebe o papel de owner. O saldo inicial de cada conta é opcional, precisa de uma data quando informado e não é registrado como receita.

## Banco de dados

A estrutura inicial está em `supabase/migrations/`. Ela cria perfis, empresas, membros, contas bancárias, categorias financeiras e registros de auditoria, todos com RLS. A migração precisa ser aplicada pelo cartão do banco do projeto antes de usar as telas com dados.

O acesso do Supabase é mantido ligado a este projeto pelo ODIM. Não configure `service_role`, senha do banco ou outra credencial administrativa no frontend.
