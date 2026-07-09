const { onRequest } = require('firebase-functions/v2/https')
const { defineSecret } = require('firebase-functions/params')
const nodemailer = require('nodemailer')

const GMAIL_USER = defineSecret('GMAIL_USER')
const GMAIL_PASS = defineSecret('GMAIL_PASS')

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i

// Rate limiter en memoria: máximo 3 envíos por IP por hora
const rateMap = new Map()
const RATE_LIMIT  = 3
const WINDOW_MS   = 60 * 60 * 1000
const MAX_ENTRIES = 500

// Tras el rewrite de Hosting, X-Forwarded-For llega como
// "<lo que mande el cliente...>, <ip real>, <proxy de Google>":
// solo el penúltimo valor es confiable; el resto es falsificable.
function clientIp(req) {
  const xff = req.headers['x-forwarded-for']
  if (typeof xff === 'string' && xff.length) {
    const ips = xff.split(',').map((s) => s.trim()).filter(Boolean)
    if (ips.length >= 2) return ips[ips.length - 2]
    if (ips.length === 1) return ips[0]
  }
  return req.ip ?? 'unknown'
}

function isRateLimited(ip) {
  const now   = Date.now()

  if (rateMap.size > MAX_ENTRIES) {
    for (const [key, val] of rateMap) {
      if (now - val.start > WINDOW_MS) rateMap.delete(key)
    }
  }

  const entry = rateMap.get(ip)

  if (!entry || now - entry.start > WINDOW_MS) {
    rateMap.set(ip, { count: 1, start: now })
    return false
  }
  if (entry.count >= RATE_LIMIT) return true
  entry.count++
  return false
}

function escape(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

exports.sendContactEmail = onRequest(
  { cors: false, secrets: [GMAIL_USER, GMAIL_PASS], region: 'us-central1', invoker: 'public' },
  async (req, res) => {
    if (req.method !== 'POST') {
      res.status(405).json({ error: 'Method not allowed' })
      return
    }

    const ip = clientIp(req)
    if (isRateLimited(ip)) {
      res.status(429).json({ error: 'Too many requests' })
      return
    }

    const { from_name, from_email, subject, message } = req.body

    // Validaciones servidor
    if (!from_name || !from_email || !message) {
      res.status(400).json({ error: 'Missing required fields' })
      return
    }
    if (from_name.trim().length < 2 || from_name.length > 80) {
      res.status(400).json({ error: 'Invalid name' })
      return
    }
    if (!EMAIL_RE.test(from_email)) {
      res.status(400).json({ error: 'Invalid email' })
      return
    }
    if (message.trim().length < 10 || message.length > 2000) {
      res.status(400).json({ error: 'Invalid message length' })
      return
    }

    const name    = escape(from_name.trim())
    const email   = escape(from_email.trim())
    const subj    = escape((subject ?? '').trim().slice(0, 120))
    const msg     = escape(message.trim())

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: GMAIL_USER.value(), pass: GMAIL_PASS.value() },
    })

    try {
      await transporter.sendMail({
        from:    `"Portafolio Fabián" <${GMAIL_USER.value()}>`,
        to:      GMAIL_USER.value(),
        replyTo: from_email,
        subject: `[Portafolio] ${subj || 'Nuevo mensaje'}`,
        html: `
          <div style="font-family:sans-serif;max-width:600px">
            <h2 style="color:#00b4d8">Nuevo mensaje desde tu portafolio</h2>
            <p><strong>Nombre:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Asunto:</strong> ${subj || '—'}</p>
            <hr style="border-color:#eee"/>
            <p style="white-space:pre-line">${msg}</p>
          </div>
        `,
      })
      res.status(200).json({ ok: true })
    } catch (err) {
      console.error('Nodemailer error:', err)
      res.status(500).json({ error: 'Send failed' })
    }
  }
)
