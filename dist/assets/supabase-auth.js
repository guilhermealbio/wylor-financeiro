(() => {
  window.wylorAuthOptions = function wylorAuthOptions() {
    const memory = {};
    const memoryStorage = {
      getItem: key => Object.prototype.hasOwnProperty.call(memory, key) ? memory[key] : null,
      setItem: (key, value) => { memory[key] = String(value); },
      removeItem: key => { delete memory[key]; }
    };
    let storage = memoryStorage;
    for (const name of ['localStorage', 'sessionStorage']) {
      try {
        const candidate = window[name];
        candidate.setItem('__wylor_auth_test__', '1');
        candidate.removeItem('__wylor_auth_test__');
        storage = candidate;
        break;
      } catch { /* A prévia pode bloquear armazenamento do navegador. */ }
    }
    const auth = { storage, persistSession: true, autoRefreshToken: true, detectSessionInUrl: true };
    if (self.origin === 'null') auth.lock = (_name, _wait, run) => run();
    return auth;
  };
})();
