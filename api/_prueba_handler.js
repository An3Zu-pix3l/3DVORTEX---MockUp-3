// Los casos que no son el feliz: metodo, configuracion ausente, trampa
// antispam, correo invalido, mensaje corto, campos kilometricos e inyeccion
// de cabeceras. No toca la red: SMTP_HOST se deja vacio salvo donde importa.
const path = '/home/claude/web/api/contact.js';
function cargar(env) {
  for (const k of ['SMTP_HOST','SMTP_PORT','SMTP_USER','SMTP_PASS','MAIL_TO']) delete process.env[k];
  Object.assign(process.env, env);
  delete require.cache[require.resolve(path)];
  return require(path);
}
function falsoRes() {
  const r = { code: 0, cuerpo: null, cab: {} };
  r.setHeader = (k, v) => { r.cab[k] = v; };
  r.status = c => { r.code = c; return r; };
  r.json = o => { r.cuerpo = o; return r; };
  return r;
}
const CONF = { SMTP_HOST: 'no-existe.invalido', SMTP_USER: 'info@3dvortex.ch', SMTP_PASS: 'x' };
const bueno = { name: 'Ana', email: 'ana@estudio.ch', company: 'Estudio', message: 'Necesitamos visualizaciones para un proyecto.' };

const casos = [
  ['GET en vez de POST',          {}, { method: 'GET' }, 405],
  ['sin variables de entorno',    {}, { method: 'POST', body: bueno }, 503],
  ['cuerpo que no es JSON',       CONF, { method: 'POST', body: 'no soy json' }, 400],
  ['trampa antispam rellenada',   CONF, { method: 'POST', body: { ...bueno, website: 'http://spam' } }, 200],
  ['correo invalido',             CONF, { method: 'POST', body: { ...bueno, email: 'ana(arroba)estudio' } }, 400],
  ['mensaje de dos letras',       CONF, { method: 'POST', body: { ...bueno, message: 'ey' } }, 400],
  ['mensaje de 6000 caracteres',  CONF, { method: 'POST', body: { ...bueno, message: 'x'.repeat(6000) } }, 400],
];

(async () => {
  let mal = 0;
  for (const [nombre, env, req, esperado] of casos) {
    const h = cargar(env);
    const res = falsoRes();
    await h(req, res);
    const ok = res.code === esperado;
    console.log('  %s %-30s -> %d %s', ok ? '·' : 'MAL', nombre, res.code, JSON.stringify(res.cuerpo || {}));
    if (!ok) { console.log('      esperaba', esperado); mal++; }
  }

  // inyeccion de cabeceras: un nombre con saltos de linea no puede anadir destinatarios
  const c = cargar(CONF);
  const sucio = 'Ana\r\nBcc: ladron@malo.ch\nTo: otro@malo.ch';
  const limpio = c.limpiaCabecera(sucio);
  const inyecta = /[\r\n]/.test(limpio);
  console.log('  %s inyeccion de cabeceras        -> %j', inyecta ? 'MAL' : '·', limpio);
  if (inyecta) mal++;

  // un correo con acentos en el nombre sale codificado, no crudo
  const cab = c.cabeceraUtf8('Grüezi — Müller');
  const okCab = cab.startsWith('=?UTF-8?B?');
  console.log('  %s asunto con acentos            -> %s', okCab ? '·' : 'MAL', cab.slice(0, 40) + '…');
  if (!okCab) mal++;

  console.log('\n' + (mal === 0 ? 'los 9 casos, como deben' : mal + ' fallos'));
  process.exit(mal ? 1 : 0);
})();
