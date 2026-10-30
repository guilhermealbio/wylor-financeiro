const icons = {
  dashboard: '<rect x="3" y="3" width="8" height="8" rx="1.5"/><rect x="13" y="3" width="8" height="5" rx="1.5"/><rect x="13" y="10" width="8" height="11" rx="1.5"/><rect x="3" y="13" width="8" height="8" rx="1.5"/>',
  bank: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M3 11h18M7 16h3M5 4h14M8 2h8"/>',
  flow: '<path d="M4 18V6m0 12h16M7 15l4-4 3 2 6-7"/><path d="M16 6h4v4"/>',
  income: '<path d="M12 19V5m-6 6 6-6 6 6"/><path d="M4 20h16"/>',
  expense: '<path d="M12 5v14m-6-6 6 6 6-6"/><path d="M4 4h16"/>',
  payable: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5m-4 5 2 2 4-4"/>',
  receivable: '<rect x="4" y="3" width="16" height="18" rx="2"/><path d="M8 8h8M8 12h5m0 4 2 2 3-3"/>',
  sales: '<path d="M3 5h2l2.2 10.2a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 1.9-1.5L21 9H6"/><circle cx="10" cy="20" r="1"/><circle cx="18" cy="20" r="1"/><path d="M14 4v7m-3.5-3.5h7"/>',
  products: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="M3 8v9l9 5 9-5V8M12 13v9"/>',
  pricing: '<circle cx="12" cy="12" r="9"/><path d="M16 8.5c-.8-.8-1.8-1.2-3.1-1.2-1.8 0-3 .8-3 2s1.1 1.8 3 2.2 3 1 3 2.3-1.2 2.2-3.1 2.2c-1.4 0-2.6-.5-3.5-1.4M12 5.8v12.4"/>',
  suppliers: '<circle cx="9" cy="8" r="3"/><path d="M3 20v-1a6 6 0 0 1 12 0v1M16 5.5a3 3 0 0 1 0 5.8M18 14a5 5 0 0 1 3 4.6v1"/>',
  partners: '<circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3 20a6 6 0 0 1 12 0m1-4a5 5 0 0 1 5 4"/>',
  reports: '<path d="M4 20V10m5 10V4m5 16v-7m5 7V7"/><path d="M3 20h18"/>',
  settings: '<circle cx="12" cy="12" r="3"/><path d="m19.4 15 .1.1 1.4 1.1-1.4 2.4-1.7-.6a8 8 0 0 1-1.7 1l-.3 1.8h-2.8l-.3-1.8a8 8 0 0 1-1.7-1l-1.7.6-1.4-2.4 1.4-1.1a7 7 0 0 1 0-2l-1.4-1.1 1.4-2.4 1.7.6a8 8 0 0 1 1.7-1l.3-1.8h2.8l.3 1.8a8 8 0 0 1 1.7 1l1.7-.6 1.4 2.4-1.4 1.1a7 7 0 0 1-.1 1.9Z" transform="translate(-1 -1)"/>',
  calendar: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
  alert: '<path d="m10.3 4.3-7 12.1A2 2 0 0 0 5 19.4h14a2 2 0 0 0 1.7-3L13.7 4.3a2 2 0 0 0-3.4 0Z"/><path d="M12 9v4m0 3h.01"/>',
  empty: '<path d="M4 19V5m0 14h16M8 15l3-3 3 2 5-6"/><circle cx="19" cy="8" r="1"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  lock: '<rect x="4" y="10" width="16" height="11" rx="2"/><path d="M8 10V7a4 4 0 1 1 8 0v3m-4 5v2"/>'
};
const navItems = [
  ['dashboard', 'Dashboard', 'dashboard'], ['bank_accounts', 'Contas bancárias', 'bank'], ['cash_flow', 'Fluxo de caixa', 'flow'],
  ['revenues', 'Receitas', 'income'], ['expenses', 'Despesas', 'expense'], ['payables', 'Contas a pagar', 'payable'],
  ['receivables', 'Contas a receber', 'receivable'], ['marketplaces', 'Vendas e marketplaces', 'sales'], ['products', 'Produtos e estoque', 'products'],
  ['pricing', 'Custos e precificação', 'pricing'], ['suppliers', 'Fornecedores', 'suppliers'], ['partners', 'Sócios e retiradas', 'partners'],
  ['reports', 'Relatórios e DRE', 'reports'], ['settings', 'Configurações', 'settings']
];
const moduleDescriptions = {
  bank_accounts: 'Cadastre as contas bancárias empresariais e acompanhe seus saldos quando a conexão de dados estiver ativa.',
  cash_flow: 'Acompanhe entradas, saídas e projeções de caixa em um só lugar.',
  revenues: 'Organize os recebimentos da WYLOR e identifique sua origem.',
  expenses: 'Registre e classifique as despesas da operação.',
  payables: 'Visualize compromissos financeiros e vencimentos próximos.',
  receivables: 'Acompanhe valores a receber e datas previstas de entrada.',
  marketplaces: 'Reúna informações de vendas da Shopee e do Mercado Livre.',
  products: 'Organize o catálogo, os custos e a movimentação de estoque.',
  pricing: 'Estruture custos e margens para apoiar a formação de preços.',
  suppliers: 'Mantenha os dados dos fornecedores da operação.',
  partners: 'Organize informações sobre sócios e retiradas.',
  reports: 'Consulte relatórios financeiros e demonstrativos de resultado.',
  settings: 'Configure os dados da empresa, usuários e preferências do sistema.'
};
const nav = document.querySelector('#primary-nav');
const page = document.querySelector('#page-content');
const currentTitle = document.querySelector('#breadcrumb-current');
const appState = { user: null, profile: null, company: null, availableCompanies: [], accounts: null, accountEditingId: null, accountSaving: false, accountNotice: '', dataError: null, categories: null, transactions: null, movements: null, monthTotals: [], financeError: null, transactionEditingId: null, transactionSaving: false, transactionNotice: '', transactionType: 'income', transactionFilters: { category: '', account: '', status: '', from: '', to: '' }, authReady: false, workspaceLoaded: false, workspaceLoadingUserId: null };
const svg = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
nav.innerHTML = navItems.map(([id, title, icon]) => `<a class="nav-link" href="#${id}" data-page="${id}">${svg(icon, 'nav-icon')}<span>${title}</span></a>`).join('');

const emptyState = (heading, description, icon = 'empty') => `<div class="empty-state"><span class="empty-icon">${svg(icon)}</span><strong>${heading}</strong><p>${description}</p></div>`;
const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
function decimalToCents(value) {
  const match = /^(-?)(\d+)(?:\.(\d{1,2}))?$/.exec(String(value));
  if (!match) return 0n;
  const cents = BigInt(match[2]) * 100n + BigInt((match[3] || '').padEnd(2, '0'));
  return match[1] ? -cents : cents;
}
function formatBRL(cents) {
  const negative = cents < 0n;
  const absolute = negative ? -cents : cents;
  const whole = (absolute / 100n).toLocaleString('pt-BR');
  const fraction = String(absolute % 100n).padStart(2, '0');
  return `${negative ? '-' : ''}R$ ${whole},${fraction}`;
}
function getBalanceStatus() {
  if (appState.dataError) return { value: 'Não foi possível consultar', note: 'Tente carregar os dados novamente' };
  if (appState.accounts === null) return { value: 'Carregando', note: 'Consultando as contas da empresa' };
  const activeAccounts = appState.accounts.filter(account => account.status === 'active');
  if (activeAccounts.length === 0) return { value: 'Sem contas cadastradas', note: 'Cadastre uma conta bancária' };
  const knownBalances = activeAccounts.filter(account => account.opening_balance !== null);
  if (knownBalances.length !== activeAccounts.length) {
    return { value: knownBalances.length ? 'Saldo incompleto' : 'Saldo inicial pendente', note: 'Informe o saldo inicial de cada conta' };
  }
  let cents = knownBalances.reduce((total, account) => total + decimalToCents(account.opening_balance), 0n);
  if (appState.movements) cents += appState.movements.filter(movement => activeAccounts.some(account => account.id === movement.bank_account_id)).reduce((total, movement) => total + decimalToCents(movement.amount), 0n);
  return { value: formatBRL(cents), note: appState.movements ? 'Saldo inicial mais movimentações realizadas' : 'Saldo baseado no saldo inicial; movimentações indisponíveis' };
}
function getAccountRealizedBalance(account) {
  if (account.opening_balance === null) return null;
  const effects = appState.movements?.filter(movement => movement.bank_account_id === account.id).reduce((sum, movement) => sum + decimalToCents(movement.amount), 0n) || 0n;
  return decimalToCents(account.opening_balance) + effects;
}
const accountTypeNames = { checking: 'Conta corrente', savings: 'Poupança', payment: 'Conta de pagamento', investment: 'Investimento', other: 'Outra conta' };
const transactionStatusNames = { pending: 'Pendente', paid: 'Pago', received: 'Recebido', overdue: 'Vencido', cancelled: 'Cancelado' };
const transactionTypeNames = { income: 'Receita', expense: 'Despesa' };
function parseMoney(value) {
  const raw = String(value || '').trim().replace(/^R\$\s*/i, '').replace(/\s/g, '');
  if (!raw) return '';
  const normalized = raw.includes(',') ? raw.replace(/\./g, '').replace(',', '.') : raw;
  return /^-?\d{1,12}(?:\.\d{1,2})?$/.test(normalized) ? normalized : null;
}
function formatDateTime(value) {
  if (!value) return 'Sem atualização';
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? 'Sem atualização' : new Intl.DateTimeFormat('pt-BR', { dateStyle: 'short', timeStyle: 'short' }).format(date);
}
function accountForm(account = null) {
  const editing = Boolean(account);
  const money = account?.opening_balance === null || account?.opening_balance === undefined ? '' : String(account.opening_balance).replace('.', ',');
  return `<form id="account-form" class="data-form" data-editing-id="${escapeHTML(account?.id || '')}">
    <label>Nome da conta<input name="name" maxlength="120" autocomplete="off" placeholder="Ex.: Conta principal" value="${escapeHTML(account?.name || '')}" required /></label>
    <label>Banco ou instituição <span class="optional">Opcional</span><input name="bank_name" maxlength="120" autocomplete="organization" placeholder="Nome da instituição" value="${escapeHTML(account?.bank_name || '')}" /></label>
    <label>Tipo de conta<select name="account_type" required>${Object.entries(accountTypeNames).map(([key, label]) => `<option value="${key}" ${account?.account_type === key ? 'selected' : ''}>${label}</option>`).join('')}</select></label>
    <label>Descrição <span class="optional">Opcional</span><textarea name="description" maxlength="500" rows="3" placeholder="Observações sobre esta conta">${escapeHTML(account?.description || '')}</textarea></label>
    <div class="form-grid"><label>Saldo inicial <span class="optional">Opcional</span><input name="opening_balance" type="text" inputmode="decimal" autocomplete="off" placeholder="0,00" value="${escapeHTML(money)}" /></label><label>Data de referência<input name="opening_balance_date" type="date" value="${escapeHTML(account?.opening_balance_date || '')}" /></label></div>
    <label>Status<select name="status"><option value="active" ${!account || account.status === 'active' ? 'selected' : ''}>Ativa</option><option value="inactive" ${account?.status === 'inactive' ? 'selected' : ''}>Inativa</option></select></label>
    <p class="form-hint">O saldo atual soma o saldo inicial e os recebimentos ou pagamentos registrados. O saldo inicial permanece separado das receitas.</p><p class="form-message" id="account-message" role="status" aria-live="polite">${escapeHTML(appState.accountNotice)}</p>
    <div class="form-actions"><button class="primary-button" type="submit">${editing ? 'Salvar alterações' : 'Salvar conta'}</button>${editing ? '<button class="secondary-button" type="button" data-cancel-edit>Cancelar edição</button>' : ''}</div>
  </form>`;
}
function renderBankAccounts(title, icon) {
  const accounts = appState.accounts || [];
  const editing = accounts.find(account => account.id === appState.accountEditingId) || null;
  const rows = appState.dataError
    ? `${emptyState('Não foi possível carregar as contas', 'Verifique sua conexão e tente novamente.', 'alert')}<div class="retry-row"><button class="text-button" type="button" data-retry-data>Tentar carregar novamente</button></div>`
    : appState.accounts === null
      ? '<div class="data-loading" aria-busy="true">Carregando contas bancárias...</div>'
      : accounts.length
        ? `<div class="account-list">${accounts.map(account => `<article class="account-row ${account.status === 'inactive' ? 'is-inactive' : ''}"><span class="module-symbol">${svg('bank')}</span><div class="account-main"><strong>${escapeHTML(account.name)} <span class="account-status">${account.status === 'active' ? 'Ativa' : 'Inativa'}</span></strong><small>${escapeHTML(account.bank_name || accountTypeNames[account.account_type] || 'Conta bancária')} · ${accountTypeNames[account.account_type] || 'Conta'}${account.description ? ` · ${escapeHTML(account.description)}` : ''}</small></div><div class="account-balance"><strong>${account.opening_balance === null ? 'Saldo inicial pendente' : formatBRL(getAccountRealizedBalance(account))}</strong><small>${appState.movements ? 'Saldo atual' : 'Saldo inicial, movimentos indisponíveis'}${account.opening_balance_date ? ` desde ${formatDate(account.opening_balance_date)}` : ''}</small><small>Atualizada ${formatDateTime(account.updated_at)}</small></div><div class="account-actions"><button type="button" class="text-button" data-edit-account="${escapeHTML(account.id)}">Editar</button>${account.status === 'active' ? `<button type="button" class="text-button danger-button" data-deactivate-account="${escapeHTML(account.id)}">Desativar</button>` : `<button type="button" class="text-button" data-activate-account="${escapeHTML(account.id)}">Reativar</button>`}</div></article>`).join('')}</div>`
        : emptyState('Nenhuma conta cadastrada', 'Cadastre a primeira conta da empresa. O saldo inicial é opcional e não será tratado como receita.', 'bank');
  return `<section aria-labelledby="page-title"><div class="page-heading"><div><p class="eyebrow">WYLOR Financeiro</p><h1 id="page-title">${title}</h1><p class="page-description">Contas, saldos iniciais e status das contas da empresa.</p></div></div>
    <div class="accounts-layout"><section class="content-card"><div class="card-heading"><h2>Contas cadastradas</h2><span>${accounts.length} ${accounts.length === 1 ? 'conta' : 'contas'}</span></div>${rows}</section>
    <section class="content-card account-form-card"><div class="card-heading"><h2>${editing ? 'Editar conta bancária' : 'Adicionar conta bancária'}</h2><span>BRL</span></div>${accountForm(editing)}</section></div>
  </section>`;
}
const metric = (label, note, icon, value = 'Módulo pendente') => `<article class="metric-card"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${svg(icon)}</span></div><div class="metric-value">${value}</div><div class="metric-note">${note}</div></article>`;
function financeTotal(kind) {
  if (appState.financeError) return 'Indisponível';
  if (!appState.transactions) return 'Carregando';
  const total = appState.monthTotals.find(row => row.kind === kind)?.amount || 0;
  return formatBRL(decimalToCents(total));
}
function financeResult() {
  if (appState.financeError) return 'Indisponível';
  if (!appState.transactions) return 'Carregando';
  const total = appState.monthTotals.reduce((sum, row) => sum + (row.kind === 'income' ? decimalToCents(row.amount) : -decimalToCents(row.amount)), 0n);
  return formatBRL(total);
}
function visibleTransactionStatus(item) {
  const now = new Date();
  const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`;
  if (item.status === 'pending' && item.due_date && item.due_date < today) return 'overdue';
  return item.status;
}
function transactionRow(item) {
  const status = visibleTransactionStatus(item);
  return `<article class="account-row"><span class="module-symbol">${svg(item.kind === 'income' ? 'income' : 'expense')}</span><div class="account-main"><strong>${escapeHTML(item.description)} <span class="account-status">${transactionStatusNames[status]}</span></strong><small>${escapeHTML(item.financial_categories?.name || 'Categoria')} · ${formatDate(item.competence_date)}${item.due_date ? ` · vence ${formatDate(item.due_date)}` : ''}</small></div><div class="account-balance"><strong class="${item.kind === 'income' ? 'income-value' : 'expense-value'}">${item.kind === 'expense' ? '−' : '+'}${formatBRL(decimalToCents(item.amount))}</strong><small>${escapeHTML(item.bank_accounts?.name || 'Sem conta vinculada')}</small></div><div class="account-actions"><button class="text-button" type="button" data-edit-transaction="${escapeHTML(item.id)}">Ver / editar</button></div></article>`;
}
function transactionForm(id, title) {
  const kind = id === 'revenues' ? 'income' : id === 'expenses' ? 'expense' : appState.transactionType;
  const editing = appState.transactions?.find(item => item.id === appState.transactionEditingId) || null;
  const locked = editing && ['paid','received','cancelled'].includes(editing.status);
  const cancelled = editing?.status === 'cancelled';
  const categories = (appState.categories || []).filter(category => category.kind === kind && category.active);
  const options = categories.map(category => `<option value="${escapeHTML(category.id)}" ${editing?.category_id === category.id ? 'selected' : ''}>${escapeHTML(category.name)}</option>`).join('');
  const accounts = (appState.accounts || []).filter(account => account.status === 'active');
  const accountOptions = accounts.map(account => `<option value="${escapeHTML(account.id)}" ${editing?.bank_account_id === account.id ? 'selected' : ''}>${escapeHTML(account.name)}${account.bank_name ? ` · ${escapeHTML(account.bank_name)}` : ''}</option>`).join('');
  const settledStatus = kind === 'income' ? 'received' : 'paid';
  const dateToday = new Date();
  const today = `${dateToday.getFullYear()}-${String(dateToday.getMonth() + 1).padStart(2, '0')}-${String(dateToday.getDate()).padStart(2, '0')}`;
  return `<form id="transaction-form" class="data-form" data-editing-id="${escapeHTML(editing?.id || '')}">
    <label>Descrição<input name="description" maxlength="240" value="${escapeHTML(editing?.description || '')}" required ${cancelled ? 'disabled' : ''}/></label>
    <div class="form-grid"><label>Categoria<select name="category_id" required ${locked ? 'disabled' : ''}><option value="">Selecione</option>${options}</select></label><label>Valor em reais<input name="amount" inputmode="decimal" placeholder="0,00" value="${escapeHTML(editing?.amount == null ? '' : String(editing.amount).replace('.', ','))}" required ${locked ? 'disabled' : ''}/></label></div>
    <div class="form-grid"><label>Competência<input type="date" name="competence_date" value="${escapeHTML(editing?.competence_date || today)}" required ${locked ? 'disabled' : ''}/></label><label>Vencimento <span class="optional">Opcional</span><input type="date" name="due_date" value="${escapeHTML(editing?.due_date || '')}" ${locked ? 'disabled' : ''}/></label></div>
    <div class="form-grid"><label>Conta bancária<select name="bank_account_id" ${locked ? 'disabled' : ''}><option value="">Sem conta vinculada</option>${accountOptions}</select></label><label>Data de ${kind === 'income' ? 'recebimento' : 'pagamento'}<input type="date" name="settled_at" value="${escapeHTML(editing?.settled_at || (editing?.status === settledStatus ? today : ''))}" ${locked ? 'disabled' : ''}/></label></div>
    <label>Status<select name="status" ${editing?.status === 'cancelled' ? 'disabled' : ''}>${editing ? `<option value="${escapeHTML(editing.status)}">${transactionStatusNames[visibleTransactionStatus(editing)]}</option>${['paid','received'].includes(editing.status) ? '<option value="cancelled">Cancelar e estornar</option>' : `<option value="${settledStatus}">${transactionStatusNames[settledStatus]}</option><option value="cancelled">Cancelar</option>`}` : `<option value="pending">Pendente</option><option value="${settledStatus}">${transactionStatusNames[settledStatus]}</option>`}</select></label>
    <label>Observações<textarea name="notes" maxlength="2000" rows="3" ${cancelled ? 'disabled' : ''}>${escapeHTML(editing?.notes || '')}</textarea></label>
    ${!editing ? `<input type="hidden" name="request_key" value="${crypto.randomUUID()}"/>` : ''}
    <p class="form-hint">Pendentes não mudam o saldo. Ao liquidar, a movimentação é registrada junto com o lançamento. O cancelamento de item liquidado cria estorno rastreável.</p><p class="form-message" id="transaction-message" role="status" aria-live="polite">${escapeHTML(appState.transactionNotice)}</p>
    <div class="form-actions">${cancelled ? '' : `<button class="primary-button" type="submit" ${appState.transactionSaving ? 'disabled' : ''}>${editing ? 'Salvar alterações' : `Salvar ${kind === 'income' ? 'receita' : 'despesa'}`}</button>`}${editing ? '<button class="secondary-button" type="button" data-cancel-transaction-edit>Voltar</button>' : ''}</div>
  </form>`;
}
function renderTransactions(id, title) {
  const kind = id === 'revenues' ? 'income' : id === 'expenses' ? 'expense' : null;
  const editing = appState.transactionEditingId;
  const all = appState.transactions || [];
  const filtered = all.filter(item => (!kind || item.kind === kind) && (!appState.transactionFilters.category || item.category_id === appState.transactionFilters.category) && (!appState.transactionFilters.account || item.bank_account_id === appState.transactionFilters.account) && (!appState.transactionFilters.status || visibleTransactionStatus(item) === appState.transactionFilters.status) && (!appState.transactionFilters.from || item.competence_date >= appState.transactionFilters.from) && (!appState.transactionFilters.to || item.competence_date <= appState.transactionFilters.to));
  const list = appState.financeError ? `${emptyState('Não foi possível carregar os lançamentos', 'Confira a conexão e tente novamente.', 'alert')}<button class="text-button" type="button" data-retry-finance>Tentar novamente</button>` : appState.transactions === null ? '<div class="data-loading" aria-busy="true">Carregando dados financeiros...</div>' : filtered.length ? `<div class="account-list">${filtered.map(transactionRow).join('')}</div>` : emptyState('Sem lançamentos para estes filtros', 'Cadastre um lançamento ou ajuste os filtros.', 'flow');
  const categoryList = (appState.categories || []).filter(category => !kind || category.kind === kind);
  const form = ['revenues','expenses'].includes(id) ? `<section class="content-card"><div class="card-heading"><h2>${editing ? 'Detalhes do lançamento' : `Novo ${kind === 'income' ? 'recebimento ou previsão' : 'pagamento ou compromisso'}`}</h2></div>${transactionForm(id, title)}</section>` : `<section class="content-card"><div class="card-heading"><h2>Registrar movimentação</h2><span>BRL</span></div><div class="form-actions"><a class="secondary-button" href="#revenues">Nova receita</a><a class="secondary-button" href="#expenses">Nova despesa</a></div></section>`;
  return `<section aria-labelledby="page-title"><div class="page-heading"><div><p class="eyebrow">WYLOR Financeiro</p><h1 id="page-title">${title}</h1><p class="page-description">Lançamentos da empresa, saldos bancários só mudam quando há pagamento ou recebimento.</p></div></div>
    <div class="transaction-layout"><section class="content-card"><div class="card-heading"><h2>${id === 'cash_flow' ? 'Fluxo de caixa e compromissos' : `Lista de ${title.toLocaleLowerCase('pt-BR')}`}</h2><span>${filtered.length} ${filtered.length === 1 ? 'item' : 'itens'}</span></div>
      <div class="filter-grid"><label>Competência desde<input type="date" data-finance-filter="from" value="${escapeHTML(appState.transactionFilters.from)}"/></label><label>Até<input type="date" data-finance-filter="to" value="${escapeHTML(appState.transactionFilters.to)}"/></label><label>Categoria<select data-finance-filter="category"><option value="">Todas</option>${categoryList.map(c => `<option value="${escapeHTML(c.id)}" ${appState.transactionFilters.category === c.id ? 'selected' : ''}>${escapeHTML(c.name)}</option>`).join('')}</select></label><label>Conta<select data-finance-filter="account"><option value="">Todas</option>${(appState.accounts || []).map(a => `<option value="${escapeHTML(a.id)}" ${appState.transactionFilters.account === a.id ? 'selected' : ''}>${escapeHTML(a.name)}</option>`).join('')}</select></label><label>Status<select data-finance-filter="status"><option value="">Todos</option>${Object.entries(transactionStatusNames).map(([key, value]) => `<option value="${key}" ${appState.transactionFilters.status === key ? 'selected' : ''}>${value}</option>`).join('')}</select></label>${id === 'cash_flow' ? '<label>Tipo<select data-finance-type><option value="">Receitas e despesas</option><option value="income" '+(appState.transactionType === 'income'?'selected':'')+'>Receitas</option><option value="expense" '+(appState.transactionType === 'expense'?'selected':'')+'>Despesas</option></select></label>' : ''}</div>${list}</section>
      <div class="finance-side">${form}<section class="content-card"><div class="card-heading"><h2>Categorias financeiras</h2></div><form id="category-form" class="data-form"><label>Nova categoria<input name="name" maxlength="120" required placeholder="Ex.: Vendas Shopee"/></label><label>Tipo<select name="kind"><option value="${kind || appState.transactionType}">${transactionTypeNames[kind || appState.transactionType]}</option>${!kind ? '<option value="expense">Despesa</option><option value="income">Receita</option>' : ''}</select></label><button class="secondary-button" type="submit">Adicionar categoria</button><p id="category-message" class="form-message" role="status" aria-live="polite"></p></form><ul class="category-list">${categoryList.map(c => `<li><span>${escapeHTML(c.name)} <small>${c.active ? 'Ativa' : 'Inativa'}</small></span><button class="text-button" type="button" data-toggle-category="${escapeHTML(c.id)}">${c.active ? 'Desativar' : 'Reativar'}</button></li>`).join('') || '<li>Sem categorias cadastradas</li>'}</ul></section></div>
    </div><section class="content-card history-card"><div class="card-heading"><h2>Histórico de alterações</h2><span>Até 20 eventos recentes</span></div>${appState.financeError ? emptyState('Histórico indisponível', 'A auditoria ficará disponível após aplicar a estrutura do módulo.', 'alert') : appState.audit?.length ? `<div class="account-list">${appState.audit.slice(0,20).map(row => `<div class="account-row"><div class="account-main"><strong>${transactionStatusNames[row.action] || ({created:'Criado',updated:'Atualizado',settled:'Liquidado',cancelled:'Cancelado'}[row.action])}</strong><small>${escapeHTML(all.find(t => t.id === row.transaction_id)?.description || 'Lançamento')} · ${formatDateTime(row.created_at)}</small></div></div>`).join('')}</div>` : emptyState('Sem alterações registradas', 'As próximas operações serão registradas automaticamente.')}</section></section>`;
}
async function loadFinanceData(force = false) {
  if (!appState.user || !appState.company || (appState.transactions !== null && !force)) return;
  const companyId = appState.company.id;
  appState.financeError = null;
  const [transactionResult, categoryResult, movementResult, totalsResult, auditResult] = await Promise.all([
    fetchAllRows(window.wylorSupabase.from('financial_transactions').select('id, company_id, bank_account_id, category_id, kind, description, amount, competence_date, due_date, settled_at, status, notes, updated_at, financial_categories(name), bank_accounts(name)').eq('company_id', companyId).order('competence_date', { ascending: false })),
    window.wylorSupabase.from('financial_categories').select('id, name, kind, active').eq('company_id', companyId).order('name'),
    window.wylorSupabase.from('account_movement_totals').select('bank_account_id, amount').eq('company_id', companyId),
    window.wylorSupabase.from('financial_current_month_totals').select('kind, amount').eq('company_id', companyId),
    window.wylorSupabase.from('financial_transaction_audit').select('id, transaction_id, action, created_at').eq('company_id', companyId).order('created_at', { ascending: false }).limit(20)
  ]);
  if (companyId !== appState.company?.id) return;
  if (transactionResult.error || categoryResult.error || movementResult.error || totalsResult.error || auditResult.error) {
    appState.financeError = 'Não foi possível consultar os dados financeiros. A estrutura do módulo precisa estar aplicada e acessível.';
    appState.transactions = [];
    appState.categories = categoryResult.data || [];
    appState.movements = null;
    appState.monthTotals = [];
    appState.audit = [];
  } else {
    appState.transactions = transactionResult.data || [];
    appState.categories = categoryResult.data || [];
    appState.movements = movementResult.data || [];
    appState.monthTotals = totalsResult.data || [];
    appState.audit = auditResult.data || [];
  }
  navigate();
}
async function fetchAllRows(query) {
  const rows = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await query.range(from, from + 999);
    if (error) return { data: null, error };
    rows.push(...(data || []));
    if (!data || data.length < 1000) return { data: rows, error: null };
  }
}
function renderDashboard() {
  const balance = getBalanceStatus();
  const companyName = escapeHTML(appState.company?.fantasy_name || 'empresa');
  return `<section aria-labelledby="page-title">
    <div class="page-heading"><div><p class="eyebrow">Visão geral</p><h1 id="page-title">Dashboard</h1><p class="page-description">Acompanhe a saúde financeira de ${companyName} em um só lugar.</p></div><div class="period-label">${svg('calendar')}<span>Período atual</span></div></div>
    <div class="setup-banner"><span class="banner-icon">${svg('alert')}</span><div><strong>Indicadores ligados aos dados da empresa</strong><p>O saldo considera o saldo inicial das contas ativas e as movimentações liquidadas. O saldo inicial permanece separado de receitas e despesas.</p>${appState.dataError || appState.financeError ? '<button class="text-button" type="button" data-retry-data>Tentar carregar novamente</button>' : ''}</div></div>
    <div class="metrics-grid" aria-label="Indicadores financeiros">
      ${metric('Saldo total das contas', balance.note, 'bank', balance.value)}
      ${metric('Receitas do mês', 'Recebidas no mês atual', 'income', financeTotal('income'))}
      ${metric('Despesas do mês', 'Pagas no mês atual', 'expense', financeTotal('expense'))}
      ${metric('Resultado do período', 'Recebimentos menos pagamentos', 'flow', financeResult())}
      ${metric('Contas a pagar', 'Aguardando o módulo de contas a pagar', 'payable')}
      ${metric('Contas a receber', 'Aguardando o módulo de contas a receber', 'receivable')}
    </div>
    <div class="dashboard-grid">
      <section class="content-card" aria-labelledby="activity-heading"><div class="card-heading"><h2 id="activity-heading">Movimentação financeira</h2><a class="text-button" href="#cash_flow">Ver fluxo de caixa</a></div>${appState.transactions?.length ? `<div class="account-list">${appState.transactions.filter(item => ['paid','received'].includes(item.status)).slice(0,5).map(transactionRow).join('')}</div>` : emptyState(appState.transactions === null ? 'Carregando movimentações' : 'Sem movimentações realizadas','Receitas e despesas pendentes não alteram o saldo bancário.')}</section>
      <section class="content-card" aria-labelledby="accounts-heading"><div class="card-heading"><h2 id="accounts-heading">Contas bancárias</h2><a class="text-button" href="#bank_accounts">Ver módulo</a></div>${appState.accounts?.some(account => account.status === 'active') ? `<div class="account-list dashboard-account-list">${appState.accounts.filter(account => account.status === 'active').slice(0, 4).map(account => `<div class="account-row"><div class="account-main"><strong>${escapeHTML(account.name)}</strong><small>${escapeHTML(account.bank_name || accountTypeNames[account.account_type] || 'Conta bancária')}</small></div><div class="account-balance"><strong>${getAccountRealizedBalance(account) === null ? 'Saldo pendente' : formatBRL(getAccountRealizedBalance(account))}</strong><small>Saldo atual</small></div></div>`).join('')}</div>` : emptyState(appState.accounts === null ? 'Carregando contas' : 'Nenhuma conta ativa', appState.accounts === null ? 'Consultando as contas da empresa.' : 'Cadastre ou reative uma conta bancária.', 'bank')}</section>
    </div>
  </section>`;
}
function renderModule(id) {
  const [, title, icon] = navItems.find(([key]) => key === id) || navItems[0];
  if (id === 'bank_accounts') return renderBankAccounts(title, icon);
  if (['revenues', 'expenses', 'cash_flow'].includes(id)) return renderTransactions(id, title);
  return `<section aria-labelledby="page-title"><div class="page-heading"><div><p class="eyebrow">WYLOR Financeiro</p><h1 id="page-title">${title}</h1><p class="page-description">Área de ${title.toLocaleLowerCase('pt-BR')} da operação financeira da WYLOR.</p></div></div>
    <div class="module-intro"><span class="module-symbol">${svg(icon)}</span><div><h2>Módulo em desenvolvimento</h2><p>${moduleDescriptions[id]}</p><span class="module-status">Disponível após configurar o acesso aos dados</span></div></div>
    <div class="foundation-note">${svg('lock')}<span>Esta tela é apenas a estrutura de navegação. Nenhuma operação ou dado financeiro está sendo simulado.</span></div>
  </section>`;
}
function navigate() {
  if (!appState.user || !appState.company) return;
  const requested = location.hash.slice(1) || 'dashboard';
  const item = navItems.find(([id]) => id === requested) || navItems[0];
  const [id, title] = item;
  currentTitle.textContent = title;
  document.title = `${title} | WYLOR Financeiro`;
  page.innerHTML = id === 'dashboard' ? renderDashboard() : renderModule(id);
  nav.querySelectorAll('.nav-link').forEach(link => {
    if (link.dataset.page === id) link.setAttribute('aria-current', 'page');
    else link.removeAttribute('aria-current');
  });
  closeMenu();
  if (['dashboard', 'bank_accounts', 'cash_flow', 'revenues', 'expenses'].includes(id)) loadBankAccounts();
  if (['dashboard', 'bank_accounts', 'cash_flow', 'revenues', 'expenses'].includes(id)) loadFinanceData();
}
function closeMenu() {
  document.body.classList.remove('menu-open');
  document.querySelector('#menu-toggle').setAttribute('aria-expanded', 'false');
}
document.querySelector('#menu-toggle').addEventListener('click', event => {
  const open = !document.body.classList.contains('menu-open');
  document.body.classList.toggle('menu-open', open);
  event.currentTarget.setAttribute('aria-expanded', String(open));
});
document.querySelector('#scrim').addEventListener('click', closeMenu);
window.addEventListener('hashchange', navigate);
window.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
navigate();

function formatDate(value) {
  const date = new Date(`${value}T12:00:00Z`);
  return Number.isNaN(date.getTime()) ? '' : new Intl.DateTimeFormat('pt-BR', { timeZone: 'UTC' }).format(date);
}
function authRedirect() {
  return window.location.origin + window.location.pathname;
}
function setFormMessage(selector, message, isError = false) {
  const element = document.querySelector(selector);
  if (!element) return;
  element.textContent = message;
  element.classList.toggle('is-error', isError);
}
function renderAuth(view = 'login', notice = '') {
  document.body.classList.add('auth-mode');
  const views = {
    login: { title: 'Acesse sua conta', description: 'Entre para acompanhar as informações financeiras da WYLOR.', button: 'Entrar', fields: `<label>E-mail<input name="email" type="email" autocomplete="email" required /></label><label>Senha<span class="password-field"><input name="password" type="password" autocomplete="current-password" required /><button class="password-toggle" type="button" data-toggle-password aria-label="Mostrar senha" aria-pressed="false">Mostrar</button></span></label>`, links: `<button class="text-button" type="button" data-auth-view="forgot">Esqueci minha senha</button><span>Não tem uma conta? <button class="text-button" type="button" data-auth-view="signup">Criar conta</button></span>` },
    signup: { title: 'Crie seu acesso', description: 'Use seu e-mail de trabalho. Enviaremos uma mensagem para confirmar o endereço.', button: 'Criar acesso', fields: `<label>Seu nome<input name="full_name" maxlength="120" autocomplete="name" required /></label><label>E-mail<input name="email" type="email" autocomplete="email" required /></label><label>Senha<input name="password" type="password" autocomplete="new-password" minlength="8" required /><small class="field-hint">Use pelo menos 8 caracteres.</small></label>`, links: `<span>Já tem uma conta? <button class="text-button" type="button" data-auth-view="login">Entrar</button></span>` },
    forgot: { title: 'Recuperar senha', description: 'Informe o e-mail da sua conta para receber um link seguro de recuperação.', button: 'Enviar link', fields: `<label>E-mail<input name="email" type="email" autocomplete="email" required /></label>`, links: `<button class="text-button" type="button" data-auth-view="login">Voltar para entrar</button>` },
    newPassword: { title: 'Defina uma nova senha', description: 'Escolha uma senha nova para acessar sua conta.', button: 'Salvar nova senha', fields: `<label>Nova senha<input name="password" type="password" autocomplete="new-password" minlength="8" required /></label><label>Confirme a nova senha<input name="password_confirm" type="password" autocomplete="new-password" minlength="8" required /></label>`, links: '' }
  };
  const current = views[view] || views.login;
  page.innerHTML = `<section class="auth-layout" aria-labelledby="auth-title"><div class="auth-brand-panel"><a class="brand" href="#dashboard"><span class="brand-mark" aria-hidden="true">W</span><span class="brand-copy"><strong>WYLOR</strong><small>FINANCEIRO</small></span></a><div class="auth-brand-message"><p class="eyebrow">Gestão financeira empresarial</p><h1>Clareza para cuidar da operação.</h1><p>Contas e informações da empresa em um ambiente organizado e protegido.</p></div><span class="auth-footnote">Acesso restrito a usuários autorizados.</span></div><div class="auth-form-panel"><div class="auth-form-wrap"><span class="auth-lock">${svg('lock')}</span><p class="eyebrow">Área segura</p><h2 id="auth-title">${current.title}</h2><p class="auth-description">${current.description}</p>${view === 'newPassword' ? '' : `<div class="auth-tabs" role="tablist" aria-label="Tipo de acesso"><button type="button" role="tab" aria-selected="${view === 'login'}" data-auth-view="login">Entrar</button><button type="button" role="tab" aria-selected="${view === 'signup'}" data-auth-view="signup">Criar conta</button></div>`}<form id="auth-form" data-auth-action="${view}" class="data-form auth-form">${current.fields}<p class="form-message" id="auth-message" role="status" aria-live="polite">${escapeHTML(notice)}</p><button class="primary-button" type="submit">${current.button}</button></form><div class="auth-links">${current.links}</div><p class="auth-security">${svg('check')} Seus dados são protegidos pelo acesso da sua empresa.</p></div></div></section>`;
}
function renderCompanySetup(errorMessage = '') {
  document.body.classList.remove('auth-mode');
  page.innerHTML = `<section class="company-setup" aria-labelledby="page-title"><div class="company-setup-card"><span class="auth-lock">${svg('bank')}</span><p class="eyebrow">Primeiro acesso</p><h1 id="page-title">Cadastre sua empresa</h1><p class="page-description">A empresa será vinculada à sua conta. O saldo inicial poderá ser informado ao cadastrar as contas bancárias.</p><form id="company-form" class="data-form"><label>Nome fantasia<input name="fantasy_name" maxlength="160" value="WYLOR" required /></label><label>Razão social <span class="optional">Opcional</span><input name="legal_name" maxlength="200" /></label><label>CNPJ <span class="optional">Opcional</span><input name="cnpj" inputmode="numeric" autocomplete="off" maxlength="18" placeholder="00.000.000/0000-00" /></label><label>Início do controle financeiro<input name="control_start_date" type="date" required /></label><div class="company-fixed-values"><span>Moeda <strong>Real brasileiro (BRL)</strong></span><span>Fuso horário <strong>America/Sao_Paulo</strong></span></div><p class="form-message ${errorMessage ? 'is-error' : ''}" id="company-message" role="status" aria-live="polite">${escapeHTML(errorMessage)}</p><button class="primary-button" type="submit">Salvar dados da empresa</button></form><button type="button" class="text-button signout-button" data-signout>Sair da conta</button></div></section>`;
}
function renderWorkspaceError() {
  document.body.classList.remove('auth-mode');
  page.innerHTML = `<section class="company-setup" aria-labelledby="page-title"><div class="company-setup-card"><span class="auth-lock">${svg('alert')}</span><p class="eyebrow">Configuração do banco</p><h1 id="page-title">A estrutura está aguardando aplicação</h1><p class="page-description">O acesso ao Supabase está conectado, mas as tabelas iniciais ainda não estão disponíveis. Aplique a mudança preparada neste projeto e tente novamente.</p><p class="form-message is-error" role="status">${escapeHTML(appState.dataError || 'Não foi possível carregar sua empresa.')}</p><button class="primary-button" type="button" data-retry-workspace>Tentar novamente</button><button type="button" class="text-button signout-button" data-signout>Sair da conta</button></div></section>`;
}
function renderCompanyPicker(companies) {
  appState.availableCompanies = companies;
  document.body.classList.remove('auth-mode');
  page.innerHTML = `<section class="company-setup" aria-labelledby="page-title"><div class="company-setup-card"><p class="eyebrow">Seus espaços</p><h1 id="page-title">Escolha uma empresa</h1><p class="page-description">Selecione a empresa que deseja acessar.</p><div class="company-options">${companies.map(company => `<button class="company-option" type="button" data-company-id="${escapeHTML(company.id)}"><span>${escapeHTML(company.fantasy_name)}</span><small>BRL · ${escapeHTML(company.time_zone)}</small></button>`).join('')}</div><button type="button" class="text-button signout-button" data-signout>Sair da conta</button></div></section>`;
}
function renderAppForCompany(company) {
  appState.company = company;
  appState.accounts = null;
  appState.categories = null;
  appState.transactions = null;
  appState.movements = null;
  appState.monthTotals = [];
  appState.audit = null;
  appState.financeError = null;
  appState.dataError = null;
  document.body.classList.remove('auth-mode');
  const profileName = appState.profile?.full_name || appState.user?.user_metadata?.full_name || 'Conta WYLOR';
  document.querySelector('#profile-name').textContent = profileName;
  document.querySelector('#profile-email').textContent = appState.user?.email || '';
  document.querySelector('#logout-button').setAttribute('aria-label', `Sair da conta ${appState.user?.email || ''}`);
  navigate();
}
async function loadWorkspace(user) {
  if (appState.user?.id === user.id && (appState.workspaceLoaded || appState.workspaceLoadingUserId === user.id)) return;
  appState.user = user;
  appState.workspaceLoadingUserId = user.id;
  appState.dataError = null;
  const [profileResult, membershipResult] = await Promise.all([
    window.wylorSupabase.from('profiles').select('full_name').eq('id', user.id).maybeSingle(),
    window.wylorSupabase.from('company_members').select('company_id, role, companies(id, fantasy_name, currency, time_zone)').eq('user_id', user.id)
  ]);
  if (appState.user?.id !== user.id) return;
  appState.workspaceLoadingUserId = null;
  appState.workspaceLoaded = true;
  if (membershipResult.error) {
    appState.dataError = 'As tabelas do sistema ainda não estão acessíveis. Aplique a estrutura inicial do banco e tente novamente.';
    renderWorkspaceError();
    return;
  }
  appState.profile = profileResult.data || null;
  const companies = (membershipResult.data || []).map(row => row.companies).filter(Boolean);
  if (!companies.length) {
    renderCompanySetup();
    return;
  }
  if (companies.length > 1) {
    renderCompanyPicker(companies);
    return;
  }
  renderAppForCompany(companies[0]);
}
async function loadBankAccounts() {
  if (!appState.user || !appState.company || appState.accounts !== null) return;
  const companyId = appState.company.id;
  const { data, error } = await window.wylorSupabase.from('bank_accounts')
    .select('id, name, bank_name, account_type, description, opening_balance, opening_balance_date, currency, status, updated_at')
    .eq('company_id', companyId).order('name');
  if (companyId !== appState.company?.id) return;
  if (error) {
    appState.dataError = 'Não foi possível consultar as contas bancárias. Tente novamente.';
    appState.accounts = [];
  } else {
    appState.dataError = null;
    appState.accounts = data || [];
  }
  if (appState.accountEditingId && !appState.accounts.some(account => account.id === appState.accountEditingId)) appState.accountEditingId = null;
  navigate();
}
async function createCompany(form) {
  const values = new FormData(form);
  const cnpj = String(values.get('cnpj') || '').replace(/\D/g, '');
  if (cnpj && cnpj.length !== 14) {
    setFormMessage('#company-message', 'Confira o CNPJ. Ele deve ter 14 números.', true);
    return;
  }
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  button.textContent = 'Salvando...';
  const { data, error } = await window.wylorSupabase.from('companies').insert({
    fantasy_name: String(values.get('fantasy_name')).trim(),
    legal_name: String(values.get('legal_name') || '').trim() || null,
    cnpj: cnpj || null,
    control_start_date: values.get('control_start_date')
  }).select('id, fantasy_name, currency, time_zone').single();
  if (error) {
    button.disabled = false;
    button.textContent = 'Salvar dados da empresa';
    setFormMessage('#company-message', 'Não foi possível salvar os dados. Verifique as informações e tente novamente.', true);
    return;
  }
  renderAppForCompany(data);
}
async function createBankAccount(form) {
  if (appState.accountSaving) return;
  const values = new FormData(form);
  const balance = parseMoney(values.get('opening_balance'));
  const balanceDate = String(values.get('opening_balance_date') || '').trim();
  if (balance === null) {
    setFormMessage('#account-message', 'Informe um valor em reais com até duas casas decimais.', true);
    return;
  }
  if (Boolean(balance) !== Boolean(balanceDate)) {
    setFormMessage('#account-message', 'Informe o valor e a data de referência do saldo inicial, ou deixe os dois vazios.', true);
    return;
  }
  const editingAccount = appState.accounts?.find(account => account.id === form.dataset.editingId);
  if (editingAccount?.status === 'active' && values.get('status') === 'inactive' && !window.confirm(`Desativar a conta “${editingAccount.name}”? Ela continuará disponível no histórico.`)) return;
  const button = form.querySelector('button[type="submit"]');
  appState.accountSaving = true;
  appState.accountNotice = '';
  button.disabled = true;
  button.textContent = 'Salvando...';
  const payload = {
    name: String(values.get('name')).trim(),
    bank_name: String(values.get('bank_name') || '').trim() || null,
    account_type: values.get('account_type'),
    description: String(values.get('description') || '').trim() || null,
    opening_balance: balance || null,
    opening_balance_date: balanceDate || null,
    status: values.get('status')
  };
  const editingId = form.dataset.editingId;
  const result = editingId
    ? await window.wylorSupabase.from('bank_accounts').update(payload).eq('id', editingId).eq('company_id', appState.company.id).select('id').single()
    : await window.wylorSupabase.from('bank_accounts').insert({ ...payload, company_id: appState.company.id }).select('id').single();
  appState.accountSaving = false;
  if (result.error) {
    button.disabled = false;
    button.textContent = editingId ? 'Salvar alterações' : 'Salvar conta';
    setFormMessage('#account-message', 'Não foi possível salvar a conta. Verifique os campos e tente novamente.', true);
    return;
  }
  appState.accountEditingId = null;
  appState.accountNotice = editingId ? 'Alterações salvas.' : 'Conta cadastrada.';
  appState.accounts = null;
  appState.dataError = null;
  await loadBankAccounts();
}
async function setAccountStatus(accountId, status) {
  if (appState.accountSaving) return;
  const account = appState.accounts?.find(item => item.id === accountId);
  if (!account || !appState.company) return;
  if (status === 'inactive' && !window.confirm(`Desativar a conta “${account.name}”? Ela continuará disponível no histórico.`)) return;
  appState.accountSaving = true;
  appState.accountNotice = '';
  const { error } = await window.wylorSupabase.from('bank_accounts').update({ status }).eq('id', accountId).eq('company_id', appState.company.id);
  appState.accountSaving = false;
  if (error) {
    appState.dataError = 'Não foi possível atualizar o status da conta. Tente novamente.';
    navigate();
    return;
  }
  appState.accountEditingId = null;
  appState.accountNotice = status === 'inactive' ? 'Conta desativada.' : 'Conta reativada.';
  appState.accounts = null;
  appState.dataError = null;
  await loadBankAccounts();
}
async function submitAuth(form) {
  const action = form.dataset.authAction;
  const values = new FormData(form);
  const email = String(values.get('email') || '').trim().toLowerCase();
  const password = String(values.get('password') || '');
  const button = form.querySelector('button[type="submit"]');
  button.disabled = true;
  const originalText = button.textContent;
  button.textContent = 'Aguarde...';
  let result;
  if (action === 'login') {
    result = await window.wylorSupabase.auth.signInWithPassword({ email, password });
  } else if (action === 'signup') {
    result = await window.wylorSupabase.auth.signUp({
      email, password,
      options: { data: { full_name: String(values.get('full_name') || '').trim() }, emailRedirectTo: authRedirect() }
    });
    if (!result.error && !result.data.session) {
      renderAuth('login', 'A conta foi criada. Confirme seu e-mail pelo link enviado e depois entre.');
      return;
    }
  } else if (action === 'forgot') {
    result = await window.wylorSupabase.auth.resetPasswordForEmail(email, { redirectTo: authRedirect() });
    if (!result.error) {
      renderAuth('login', 'Se o endereço estiver cadastrado, você receberá um link para redefinir a senha.');
      return;
    }
  } else if (action === 'newPassword') {
    const confirmation = String(values.get('password_confirm') || '');
    if (password !== confirmation) {
      button.disabled = false;
      button.textContent = originalText;
      setFormMessage('#auth-message', 'As senhas não coincidem.', true);
      return;
    }
    result = await window.wylorSupabase.auth.updateUser({ password });
    if (!result.error) {
      await window.wylorSupabase.auth.signOut();
      appState.user = null;
      renderAuth('login', 'Senha atualizada. Entre com sua nova senha.');
      return;
    }
  }
  if (result?.error) {
    button.disabled = false;
    button.textContent = originalText;
    const message = result.error.code === 'invalid_credentials'
      ? 'E-mail ou senha incorretos.'
      : result.error.code === 'email_not_confirmed'
        ? 'Confirme seu e-mail pelo link enviado antes de entrar.'
        : 'Não foi possível concluir o acesso. Confira os dados e tente novamente.';
    setFormMessage('#auth-message', message, true);
  }
}
async function saveFinancialTransaction(form) {
  if (appState.transactionSaving) return;
  const editing = appState.transactions?.find(item => item.id === form.dataset.editingId) || null;
  const values = new FormData(form);
  const kind = editing?.kind || (location.hash === '#expenses' ? 'expense' : location.hash === '#revenues' ? 'income' : appState.transactionType);
  const settledStatus = kind === 'income' ? 'received' : 'paid';
  const status = editing?.status === 'cancelled' ? 'cancelled' : String(values.get('status') || 'pending');
  if (status === 'cancelled' && !window.confirm(editing?.status === settledStatus ? 'Cancelar este lançamento e registrar o estorno na conta bancária?' : 'Cancelar este lançamento?')) return;
  const amountText = editing && ['paid','received','cancelled'].includes(editing.status) ? String(editing.amount) : parseMoney(values.get('amount'));
  if (amountText === null || !amountText || Number(amountText) <= 0) { setFormMessage('#transaction-message', 'Informe um valor maior que zero, com até duas casas decimais.', true); return; }
  const competenceDate = editing && ['paid','received','cancelled'].includes(editing.status) ? editing.competence_date : String(values.get('competence_date') || '');
  const accountId = editing && ['paid','received','cancelled'].includes(editing.status) ? editing.bank_account_id : String(values.get('bank_account_id') || '') || null;
  const settledAt = editing && ['paid','received','cancelled'].includes(editing.status) ? editing.settled_at : String(values.get('settled_at') || '') || null;
  if (!editing && status === settledStatus && (!accountId || !settledAt)) { setFormMessage('#transaction-message', 'Para liquidar agora, informe a conta e a data de pagamento ou recebimento.', true); return; }
  if (!editing && status !== settledStatus && status !== 'pending') { setFormMessage('#transaction-message', 'Estado inválido para um novo lançamento.', true); return; }
  if (editing && ['paid','received'].includes(editing.status) && status === settledStatus && !editing.bank_account_id) { setFormMessage('#transaction-message', 'O lançamento liquidado não tem conta vinculada.', true); return; }
  const payload = editing && ['paid','received','cancelled'].includes(editing.status) ? (status === 'cancelled' ? { status } : { status, description: String(values.get('description') || editing.description).trim(), notes: String(values.get('notes') || '').trim() || null }) : {
    company_id: appState.company.id,
    bank_account_id: accountId,
    category_id: String(values.get('category_id') || ''), kind,
    description: String(values.get('description') || '').trim(), amount: amountText,
    competence_date: competenceDate, due_date: String(values.get('due_date') || '') || null,
    settled_at: status === settledStatus ? settledAt : null,
    status, notes: String(values.get('notes') || '').trim() || null
  };
  if (editing && !['paid','received','cancelled'].includes(editing.status) && status === settledStatus && (!payload.bank_account_id || !payload.settled_at)) { setFormMessage('#transaction-message', 'Para liquidar, informe a conta e a data de pagamento ou recebimento.', true); return; }
  if (!editing) payload.request_key = String(values.get('request_key'));
  if (!editing && !payload.category_id) { setFormMessage('#transaction-message', 'Selecione uma categoria financeira.', true); return; }
  if (!editing && !payload.description) { setFormMessage('#transaction-message', 'Informe a descrição do lançamento.', true); return; }
  appState.transactionSaving = true;
  const button = form.querySelector('[type="submit"]'); if (button) button.disabled = true;
  const query = editing
    ? window.wylorSupabase.from('financial_transactions').update(payload).eq('id', editing.id).eq('company_id', appState.company.id).select('id').single()
    : window.wylorSupabase.from('financial_transactions').insert(payload).select('id').single();
  let { error } = await query;
  if (error?.code === '23505' && !editing) {
    const duplicate = await window.wylorSupabase.from('financial_transactions').select('id').eq('company_id', appState.company.id).eq('request_key', payload.request_key).maybeSingle();
    if (duplicate.data?.id) error = null;
  }
  appState.transactionSaving = false;
  if (error) { if (button) button.disabled = false; setFormMessage('#transaction-message', 'Não foi possível salvar. Confira a categoria, a conta ativa e os dados obrigatórios.', true); return; }
  appState.transactionEditingId = null;
  appState.transactionNotice = editing ? 'Alterações salvas com sucesso.' : 'Lançamento salvo com sucesso.';
  appState.transactions = null; appState.movements = null;
  await loadFinanceData(true);
}
async function saveFinancialCategory(form) {
  const values = new FormData(form);
  const name = String(values.get('name') || '').trim();
  const kind = String(values.get('kind') || '');
  if (!name || !['income','expense'].includes(kind)) { setFormMessage('#category-message', 'Informe nome e tipo da categoria.', true); return; }
  const { error } = await window.wylorSupabase.from('financial_categories').insert({ company_id: appState.company.id, name, kind });
  if (error) { setFormMessage('#category-message', 'Não foi possível adicionar. O nome pode já estar cadastrado para este tipo.', true); return; }
  appState.financeError = null; appState.transactions = null;
  await loadFinanceData(true);
  setFormMessage('#category-message', 'Categoria adicionada.');
}
function handlePageClick(event) {
  const passwordToggle = event.target.closest('[data-toggle-password]');
  if (passwordToggle) {
    const passwordInput = passwordToggle.parentElement.querySelector('input');
    const isVisible = passwordInput.type === 'password';
    passwordInput.type = isVisible ? 'text' : 'password';
    passwordToggle.textContent = isVisible ? 'Ocultar' : 'Mostrar';
    passwordToggle.setAttribute('aria-label', isVisible ? 'Ocultar senha' : 'Mostrar senha');
    passwordToggle.setAttribute('aria-pressed', String(isVisible));
    return;
  }
  const viewButton = event.target.closest('[data-auth-view]');
  if (viewButton) {
    renderAuth(viewButton.dataset.authView);
    return;
  }
  if (event.target.closest('[data-signout]')) {
    window.wylorSupabase.auth.signOut();
    return;
  }
  const companyButton = event.target.closest('[data-company-id]');
  if (companyButton) {
    const company = appState.availableCompanies?.find(item => item.id === companyButton.dataset.companyId);
    if (company) renderAppForCompany(company);
    return;
  }
  if (event.target.closest('[data-retry-workspace]')) {
    if (appState.user) { appState.workspaceLoaded = false; loadWorkspace(appState.user); }
    return;
  }
  if (event.target.closest('[data-retry-data]')) {
    appState.accounts = null;
    appState.dataError = null;
    navigate();
    return;
  }
  const editButton = event.target.closest('[data-edit-account]');
  if (editButton) {
    appState.accountNotice = '';
    appState.accountEditingId = editButton.dataset.editAccount;
    navigate();
    return;
  }
  if (event.target.closest('[data-cancel-edit]')) {
    appState.accountEditingId = null;
    appState.accountNotice = '';
    navigate();
    return;
  }
  const deactivateButton = event.target.closest('[data-deactivate-account]');
  if (deactivateButton) { setAccountStatus(deactivateButton.dataset.deactivateAccount, 'inactive'); return; }
  const activateButton = event.target.closest('[data-activate-account]');
  if (activateButton) { setAccountStatus(activateButton.dataset.activateAccount, 'active'); return; }
  const transactionButton = event.target.closest('[data-edit-transaction]');
  if (transactionButton) {
    appState.transactionEditingId = transactionButton.dataset.editTransaction;
    const row = appState.transactions?.find(item => item.id === appState.transactionEditingId);
    if (row) { appState.transactionType = row.kind; location.hash = row.kind === 'income' ? '#revenues' : '#expenses'; }
    return;
  }
  if (event.target.closest('[data-cancel-transaction-edit]')) { appState.transactionEditingId = null; navigate(); return; }
  if (event.target.closest('[data-retry-finance]')) { appState.transactions = null; appState.financeError = null; loadFinanceData(true); return; }
  const categoryToggle = event.target.closest('[data-toggle-category]');
  if (categoryToggle) {
    const category = appState.categories?.find(item => item.id === categoryToggle.dataset.toggleCategory);
    if (!category) return;
    window.wylorSupabase.from('financial_categories').update({ active: !category.active }).eq('id', category.id).eq('company_id', appState.company.id).then(({ error }) => {
      if (error) { setFormMessage('#category-message', 'Não foi possível atualizar a categoria.', true); return; }
      appState.transactions = null; loadFinanceData(true);
    });
    return;
  }
}
page.addEventListener('click', handlePageClick);
page.addEventListener('submit', event => {
  event.preventDefault();
  if (event.target.id === 'auth-form') submitAuth(event.target);
  if (event.target.id === 'company-form') createCompany(event.target);
  if (event.target.id === 'account-form') createBankAccount(event.target);
  if (event.target.id === 'transaction-form') saveFinancialTransaction(event.target);
  if (event.target.id === 'category-form') saveFinancialCategory(event.target);
});
page.addEventListener('change', event => {
  if (event.target.matches('[data-finance-filter]')) { appState.transactionFilters[event.target.dataset.financeFilter] = event.target.value; navigate(); }
  if (event.target.matches('[data-finance-type]')) { appState.transactionType = event.target.value; navigate(); }
});
document.querySelector('#logout-button').addEventListener('click', () => window.wylorSupabase?.auth.signOut());
async function initializeSupabase() {
  if (window.WYLOR_SUPABASE_CONFIG?.environment === 'test') {
    document.querySelector('#environment-banner')?.removeAttribute('hidden');
    document.body.classList.add('is-test-environment');
  }
  if (!window.supabase?.createClient || !window.WYLOR_SUPABASE_CONFIG?.url || !window.WYLOR_SUPABASE_CONFIG?.anonKey) {
    renderAuth('login', 'Não foi possível carregar a conexão segura. Atualize a página em alguns instantes.');
    return;
  }
  window.wylorSupabase = window.supabase.createClient(
    window.WYLOR_SUPABASE_CONFIG.url,
    window.WYLOR_SUPABASE_CONFIG.anonKey,
    { auth: window.wylorAuthOptions() }
  );
  window.wylorSupabase.auth.onAuthStateChange((event, session) => {
    if (event === 'PASSWORD_RECOVERY') {
      renderAuth('newPassword');
      return;
    }
    setTimeout(() => {
      if (session?.user) loadWorkspace(session.user);
      else if (appState.authReady) {
        appState.user = null;
        appState.company = null;
        appState.accounts = null;
        appState.categories = null;
        appState.transactions = null;
        appState.movements = null;
        appState.monthTotals = [];
        appState.audit = null;
        appState.workspaceLoaded = false;
        appState.workspaceLoadingUserId = null;
        renderAuth('login');
      }
    }, 0);
  });
  const { data, error } = await window.wylorSupabase.auth.getSession();
  appState.authReady = true;
  if (error) {
    renderAuth('login', 'Não foi possível verificar sua sessão. Entre novamente.');
    return;
  }
  if (data.session?.user) await loadWorkspace(data.session.user);
  else if (location.hash.includes('type=recovery')) renderAuth('newPassword');
  else renderAuth('login');
}
initializeSupabase();
