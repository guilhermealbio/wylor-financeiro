const fs = require('node:fs');
const path = require('node:path');

const root = process.cwd();
const output = path.join(root, 'dist');

function readEnvFile(file) {
  const fullPath = path.join(root, file);
  if (!fs.existsSync(fullPath)) throw new Error(`Arquivo ${file} não encontrado.`);
  return Object.fromEntries(fs.readFileSync(fullPath, 'utf8').split(/\r?\n/)
    .map(line => line.trim())
    .filter(line => line && !line.startsWith('#') && line.includes('='))
    .map(line => {
      const separator = line.indexOf('=');
      const key = line.slice(0, separator).trim();
      let value = line.slice(separator + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) value = value.slice(1, -1);
      return [key, value];
    }));
}

function projectRef(url) {
  try {
    const host = new URL(url).hostname;
    return host.endsWith('.supabase.co') ? host.slice(0, -'.supabase.co'.length) : null;
  } catch {
    return null;
  }
}

function isPublicSupabaseKey(key) {
  if (key.startsWith('sb_publishable_')) return true;
  try {
    const payload = JSON.parse(Buffer.from(key.split('.')[1], 'base64url').toString('utf8'));
    return payload.role === 'anon';
  } catch {
    return false;
  }
}

const requestedEnvironment = process.argv.slice(2).find(arg => arg.startsWith('--environment='))?.split('=')[1] || 'production';
if (!['production', 'test'].includes(requestedEnvironment)) throw new Error('Use --environment=production ou --environment=test.');
const productionEnv = readEnvFile('.env');
const selectedEnv = requestedEnvironment === 'test' ? readEnvFile('.env.test') : productionEnv;
const urlKey = requestedEnvironment === 'test' ? 'WY_TEST_SUPABASE_URL' : 'VITE_SUPABASE_URL';
const anonKeyKey = requestedEnvironment === 'test' ? 'WY_TEST_SUPABASE_ANON_KEY' : 'VITE_SUPABASE_ANON_KEY';
const supabaseUrl = selectedEnv[urlKey];
const supabaseAnonKey = selectedEnv[anonKeyKey];
if (!supabaseUrl || !supabaseAnonKey) throw new Error(`Faltam ${urlKey} e/ou ${anonKeyKey} em ${requestedEnvironment === 'test' ? '.env.test' : '.env'}.`);
if (!projectRef(supabaseUrl) || !isPublicSupabaseKey(supabaseAnonKey)) throw new Error('A URL ou a chave pública do Supabase tem formato inválido. Use apenas a chave anon/publishable, nunca service_role ou sb_secret_.');
if (requestedEnvironment === 'test' && projectRef(supabaseUrl) === projectRef(productionEnv.VITE_SUPABASE_URL || '')) throw new Error('O projeto de teste precisa ter uma URL Supabase diferente da produção.');

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });
for (const file of ['index.html', 'styles.css', 'app.js', 'odim-paginas.json']) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}
fs.cpSync(path.join(root, 'assets'), path.join(output, 'assets'), { recursive: true });
fs.writeFileSync(path.join(output, 'assets', 'supabase-config.js'), `window.WYLOR_SUPABASE_CONFIG = Object.freeze(${JSON.stringify({ url: supabaseUrl, anonKey: supabaseAnonKey, environment: requestedEnvironment })});\n`);
