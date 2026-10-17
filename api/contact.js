// El formulario de contacto, enviado desde nuestro propio dominio.
//
// Por que no Formspree ni ningun otro intermediario: los datos del visitante no
// salen de 3dvortex.ch mas que para llegar al buzon de Hostpoint, que esta en
// Suiza. Eso simplifica la Datenschutzerklarung y evita el limite de mensajes
// de los planes gratuitos.
//
// Por que SMTP a mano y no nodemailer: el sitio es estatico y no tiene
// package.json. Anadir dependencias obligaria a Vercel a montar un build donde
// hoy no hay ninguno. Son setenta lineas de dialogo SMTP y asi no hay nada que
// actualizar ni auditar.
//
// EL DIA DE LA MUDANZA A HOSTPOINT: la web deja de estar en Vercel y esta
// funcion no viaja. Hay que escribir `api/contact.php` que haga lo mismo —en
// Hostpoint, con PHP, basta mail() o PHPMailer contra el mismo servidor— y
// dejar la ruta /api/contact igual. El formulario de la web no se toca, y la
// Datenschutzerklarung solo cambia en la frase del alojamiento.
//
// Variables de entorno (en el panel de Vercel, nunca en el repositorio):
//   SMTP_HOST  asmtp.mail.hostpoint.ch
//   SMTP_PORT  465
//   SMTP_USER  info@3dvortex.ch
//   SMTP_PASS  la contrasena del buzon
//   MAIL_TO    opcional; por defecto, SMTP_USER

const tls = require('node:tls');

const LIMITES = { name: 120, email: 160, company: 160, message: 5000 };

// Una cabecera de correo no puede llevar saltos de linea: por ahi se cuelan
// destinatarios de mas. Se quitan, no se escapan.
function limpiaCabecera(s) {
  return String(s == null ? '' : s).replace(/[\r\n]+/g, ' ').trim();
}

function pareceCorreo(s) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(s);
}

// Cabecera con acentos, en base64 segun RFC 2047.
function cabeceraUtf8(s) {
  return /^[\x20-\x7E]*$/.test(s)
    ? s
    : '=?UTF-8?B?' + Buffer.from(s, 'utf8').toString('base64') + '?=';
}

function troceaBase64(s) {
  return (Buffer.from(s, 'utf8').toString('base64').match(/.{1,76}/g) || []).join('\r\n');
}

// Un dialogo SMTP es una conversacion por turnos: se manda una orden y se
// espera una respuesta que empieza por su codigo. Aqui se espera siempre, para
// que un fallo del servidor se note en vez de perderse.
function conversacion(socket) {
  let buffer = '';
  let esperando = null;
  socket.setEncoding('utf8');
  socket.on('data', trozo => {
    buffer += trozo;
    // una respuesta termina en una linea "250 texto" (sin guion tras el codigo)
    const m = buffer.match(/^\d{3} [^\r\n]*\r\n/m);
    if (m && esperando) {
      const respuesta = buffer;
      buffer = '';
      const f = esperando;
      esperando = null;
      f.resolver(respuesta);
    }
  });
  return {
    leer() {
      return new Promise((resolver, rechazar) => {
        esperando = { resolver, rechazar };
        socket.once('error', rechazar);
      });
    },
    async orden(texto, codigoEsperado, loQueEs) {
      if (texto !== null) socket.write(texto + '\r\n');
      const r = await this.leer();
      if (!r.startsWith(String(codigoEsperado))) {
        // nunca se incluye el contenido del mensaje en el error
        throw new Error(loQueEs + ': el servidor respondio ' + r.slice(0, 80).trim());
      }
      return r;
    }
  };
}

async function envia({ host, port, user, pass, para }, datos) {
  const nombre = limpiaCabecera(datos.name);
  const correo = limpiaCabecera(datos.email);
  const empresa = limpiaCabecera(datos.company);
  const mensaje = String(datos.message == null ? '' : datos.message);

  const asunto = cabeceraUtf8(
    'Web 3dvortex.ch — ' + (nombre || 'mensaje') + (empresa ? ' (' + empresa + ')' : '')
  );
  const cuerpo = [
    'Nombre:  ' + (nombre || '—'),
    'Correo:  ' + (correo || '—'),
    'Oficina: ' + (empresa || '—'),
    '',
    mensaje,
    '',
    '— enviado desde el formulario de 3dvortex.ch'
  ].join('\r\n');

  const cabeceras = [
    'From: ' + cabeceraUtf8('3dvortex Web') + ' <' + user + '>',
    'To: <' + para + '>',
    // responder va directo al visitante, pero el remitente sigue siendo
    // nuestro buzon: con el suyo, el SPF de su dominio rechazaria el correo.
    correo ? 'Reply-To: <' + correo + '>' : null,
    'Subject: ' + asunto,
    'Date: ' + new Date().toUTCString().replace('GMT', '+0000'),
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: base64'
  ].filter(Boolean).join('\r\n');

  const socket = tls.connect({ host, port, servername: host });
  await new Promise((ok, mal) => {
    socket.once('secureConnect', ok);
    socket.once('error', mal);
    socket.setTimeout(15000, () => mal(new Error('el servidor de correo no responde')));
  });

  const c = conversacion(socket);
  try {
    await c.orden(null, 220, 'saludo');
    await c.orden('EHLO 3dvortex.ch', 250, 'EHLO');
    await c.orden('AUTH LOGIN', 334, 'AUTH');
    await c.orden(Buffer.from(user, 'utf8').toString('base64'), 334, 'usuario');
    await c.orden(Buffer.from(pass, 'utf8').toString('base64'), 235, 'contrasena');
    await c.orden('MAIL FROM:<' + user + '>', 250, 'remitente');
    await c.orden('RCPT TO:<' + para + '>', 250, 'destinatario');
    await c.orden('DATA', 354, 'DATA');
    await c.orden(cabeceras + '\r\n\r\n' + troceaBase64(cuerpo) + '\r\n.', 250, 'envio');
    socket.write('QUIT\r\n');
  } finally {
    socket.end();
  }
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'metodo' });
  }

  const cfg = {
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  };
  cfg.para = process.env.MAIL_TO || cfg.user;
  if (!cfg.host || !cfg.user || !cfg.pass) {
    // 503 y no 500: el formulario lo traduce en «todavia no esta conectado» y
    // ofrece el correo, que es la verdad.
    return res.status(503).json({ error: 'sin-configurar' });
  }

  let datos = req.body;
  if (typeof datos === 'string') {
    try { datos = JSON.parse(datos); } catch (e) { datos = null; }
  }
  if (!datos || typeof datos !== 'object') {
    return res.status(400).json({ error: 'formato' });
  }

  // La trampa antispam: un campo escondido que una persona nunca ve. Si viene
  // relleno, se responde que si y no se envia nada.
  if (datos.website) return res.status(200).json({ ok: true });

  for (const campo of Object.keys(LIMITES)) {
    if (String(datos[campo] || '').length > LIMITES[campo]) {
      return res.status(400).json({ error: 'largo', campo });
    }
  }
  if (!pareceCorreo(limpiaCabecera(datos.email))) {
    return res.status(400).json({ error: 'correo' });
  }
  if (String(datos.message || '').trim().length < 10) {
    return res.status(400).json({ error: 'mensaje' });
  }

  try {
    await envia(cfg, datos);
    return res.status(200).json({ ok: true });
  } catch (e) {
    // el fallo se cuenta en los registros de Vercel sin el contenido del
    // mensaje; al visitante se le dice que escriba al correo.
    console.error('contacto: fallo el envio —', e.message);
    return res.status(502).json({ error: 'envio' });
  }
};

module.exports.envia = envia;
module.exports.cabeceraUtf8 = cabeceraUtf8;
module.exports.limpiaCabecera = limpiaCabecera;
