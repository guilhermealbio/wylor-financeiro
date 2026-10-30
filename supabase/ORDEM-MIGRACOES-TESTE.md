# Migrações do banco de testes WYLOR

Este roteiro prepara a aplicação manual das migrações no SQL Editor do Supabase. Nenhuma migração foi executada por este roteiro.

## Confirme o destino antes de executar

No painel Supabase, abra o projeto `wylor-financeiro-testes` e confira que o Project ID exibido é `mktflkotjfgkmdtoyara`. Execute os arquivos somente no SQL Editor desse projeto. Se o identificador não corresponder, pare. Não use o projeto de produção nem uma conexão de escrita ligada a ele.

Os arquivos SQL abaixo não contêm URL de projeto, Project ID, chave de API ou credencial. Eles operam sobre o banco ao qual o SQL Editor estiver conectado; por isso a conferência do projeto no painel é indispensável.

## Ordem e dependências

1. `migrations/20261028200000_fundacao_financeira.sql`
   Cria `profiles`, `companies`, `company_members`, `bank_accounts`, `financial_categories` e `audit_logs`, com índices, políticas RLS, funções e gatilhos de perfil, participação, proteção do último owner e auditoria. É a base exigida pelas migrações seguintes.
2. `migrations/20261029110000_contas_bancarias_campos_status.sql`
   Altera `bank_accounts`, criada na etapa 1, acrescentando descrição e status, restrições e índice.
3. `migrations/20261029200000_receitas_despesas_ledger.sql`
   Depende das empresas, contas, categorias, função de participação e função de atualização da etapa 1, além dos campos de contas preparados na etapa 2. Cria `financial_transactions`, `account_movements` e `financial_transaction_audit`, com índices, políticas RLS, validações, registro de auditoria, movimentos e views de totais.
4. `migrations/20261030110000_seguranca_integrantes_e_ledger.sql`
   Atualiza políticas e funções já criadas nas etapas 1 e 3. Controla a inclusão de integrantes por papel, protege o último owner ao excluir ou alterar papel, evita falha de auditoria na remoção em cascata da empresa e impede editar campos de um lançamento já liquidado sem cancelá-lo antes.

Cada arquivo deve ser executado inteiro, uma vez, na ordem acima. A etapa 4 só funciona depois das três anteriores. Aguarde o resultado de cada arquivo antes de passar ao próximo. Se algum arquivo apresentar erro, pare e não execute os seguintes até revisar o erro.

## Conferência local

- Os quatro arquivos de migração versionados foram revisados em conjunto.
- O conjunto cria nove tabelas; cada tabela habilita RLS e define políticas.
- As referências entre tabelas e objetos seguem a ordem listada.
- `company_members` não aceita inclusão ou troca de papel diretamente pela API; a etapa 4 oferece inclusão pela função com verificação de papel.
- Liquidações e estornos têm unicidade por lançamento e efeito; saldos iniciais permanecem em `bank_accounts` e não viram movimentos.
- Não há URL, Project ID ou credencial de produção nos scripts.
- A revisão local não comprova o estado atual do banco de testes nem substitui a conferência do resultado após a execução.
- Nenhum dado de produção é copiado. As migrações definem estrutura e lógica, sem inserir lançamentos ou registros financeiros.
