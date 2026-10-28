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
const svg = (name, cls = '') => `<svg class="${cls}" viewBox="0 0 24 24" aria-hidden="true">${icons[name]}</svg>`;
nav.innerHTML = navItems.map(([id, title, icon]) => `<a class="nav-link" href="#${id}" data-page="${id}">${svg(icon, 'nav-icon')}<span>${title}</span></a>`).join('');

const emptyState = (heading, description, icon = 'empty') => `<div class="empty-state"><span class="empty-icon">${svg(icon)}</span><strong>${heading}</strong><p>${description}</p></div>`;
const metric = (label, note, icon) => `<article class="metric-card"><div class="metric-top"><span class="metric-label">${label}</span><span class="metric-icon">${svg(icon)}</span></div><div class="metric-value">Sem dados</div><div class="metric-note">${note}</div></article>`;
function renderDashboard() {
  return `<section aria-labelledby="page-title">
    <div class="page-heading"><div><p class="eyebrow">Visão geral</p><h1 id="page-title">Dashboard</h1><p class="page-description">Acompanhe a saúde financeira da WYLOR em um só lugar.</p></div><div class="period-label">${svg('calendar')}<span>Período atual</span></div></div>
    <div class="setup-banner"><span class="banner-icon">${svg('alert')}</span><div><strong>Conecte o Supabase para iniciar</strong><p>Ainda não há uma fonte de dados vinculada. Os indicadores abaixo aguardam a conexão e os primeiros registros financeiros.</p></div></div>
    <div class="metrics-grid" aria-label="Indicadores financeiros sem dados disponíveis">
      ${metric('Saldo total das contas', 'Cadastre contas para acompanhar os saldos', 'bank')}
      ${metric('Receitas do mês', 'Sem lançamentos de receita', 'income')}
      ${metric('Despesas do mês', 'Sem lançamentos de despesa', 'expense')}
      ${metric('Resultado do período', 'Calculado após os primeiros lançamentos', 'flow')}
      ${metric('Contas a pagar', 'Nenhuma conta cadastrada', 'payable')}
      ${metric('Contas a receber', 'Nenhuma conta cadastrada', 'receivable')}
    </div>
    <div class="dashboard-grid">
      <section class="content-card" aria-labelledby="activity-heading"><div class="card-heading"><h2 id="activity-heading">Movimentação financeira</h2><span>Período atual</span></div>${emptyState('Nenhuma movimentação disponível','Quando os lançamentos estiverem configurados, a atividade financeira aparecerá aqui.')}</section>
      <section class="content-card" aria-labelledby="accounts-heading"><div class="card-heading"><h2 id="accounts-heading">Contas bancárias</h2><span>Resumo</span></div>${emptyState('Nenhuma conta cadastrada','As contas bancárias da empresa serão exibidas nesta área.','bank')}</section>
    </div>
  </section>`;
}
function renderModule(id) {
  const [, title, icon] = navItems.find(([key]) => key === id) || navItems[0];
  return `<section aria-labelledby="page-title"><div class="page-heading"><div><p class="eyebrow">WYLOR Financeiro</p><h1 id="page-title">${title}</h1><p class="page-description">Área de ${title.toLocaleLowerCase('pt-BR')} da operação financeira da WYLOR.</p></div></div>
    <div class="module-intro"><span class="module-symbol">${svg(icon)}</span><div><h2>Módulo em desenvolvimento</h2><p>${moduleDescriptions[id]}</p><span class="module-status">Disponível após configurar o acesso aos dados</span></div></div>
    <div class="foundation-note">${svg('lock')}<span>Esta tela é apenas a estrutura de navegação. Nenhuma operação ou dado financeiro está sendo simulado.</span></div>
  </section>`;
}
function navigate() {
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
