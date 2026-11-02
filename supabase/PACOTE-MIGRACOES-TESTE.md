# Pacote manual para o Supabase de testes

## Destino exclusivo pretendido

- Projeto: `wylor-financeiro-testes`
- Project ID: `mktflkotjfgkmdtoyara`

O fluxo de migrações do ODIM deste projeto continua ligado ao Project ID `jhtptvrfhuprltmkfyfw`. Não use o cartão de migração do ODIM para aplicar estes arquivos. O arquivo `.env.test` configura somente o acesso público do app de testes, não uma conexão administrativa de banco.

O ODIM não oferece neste projeto uma segunda conexão independente de banco para executar migrações. Este pacote contém cópias integrais dos quatro SQLs versionados, organizadas para aplicação manual no SQL Editor do projeto de testes. Os SQLs não contêm chaves, senhas ou URLs.

## Aplicação manual

1. Abra o projeto `wylor-financeiro-testes` no Supabase.
2. Antes de abrir o SQL Editor, confira no painel que o Project ID é exatamente `mktflkotjfgkmdtoyara`. Se for diferente, não execute nada.
3. Abra cada arquivo abaixo no SQL Editor desse mesmo projeto e execute um arquivo por vez, na ordem indicada. Confira o resultado de cada um antes de continuar.
4. Se algum arquivo falhar, pare e guarde a mensagem completa. Não repita a execução nem avance para o próximo arquivo até revisar o estado do projeto de testes.

| Ordem | Arquivo incluído no ZIP | Migração original |
|---|---|---|
| 1 | `01_fundacao_financeira.sql` | `20261028200000_fundacao_financeira.sql` |
| 2 | `02_contas_bancarias_campos_status.sql` | `20261029110000_contas_bancarias_campos_status.sql` |
| 3 | `03_receitas_despesas_ledger.sql` | `20261029200000_receitas_despesas_ledger.sql` |
| 4 | `04_seguranca_integrantes_e_ledger.sql` | `20261030110000_seguranca_integrantes_e_ledger.sql` |

O pacote não é uma conexão ao banco e não consegue verificar sozinho em qual projeto o SQL Editor está aberto. A barreira de destino é conferir o Project ID no painel imediatamente antes de cada execução. Para isolamento técnico mais forte, o mecanismo de migrações do ODIM precisa ser configurado pela plataforma com vínculo de escrita exclusivo ao projeto de testes; essa configuração não está disponível nesta sessão.

## Separação dos ambientes

- O build normal continua usando `.env` e a URL de produção `jhtptvrfhuprltmkfyfw`.
- O build `--environment=test` usa `.env.test` e a URL pública do projeto de testes `mktflkotjfgkmdtoyara`.
- A chave pública de teste serve somente ao cliente web e não concede administração do banco.
- Nenhuma credencial administrativa foi solicitada, copiada ou incluída neste pacote.
- Nenhum SQL foi executado e nenhuma migração foi aplicada durante a preparação do pacote.
