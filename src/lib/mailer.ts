import nodemailer from 'nodemailer'

const SMTP_HOST = process.env.SMTP_HOST
const SMTP_PORT = Number(process.env.SMTP_PORT || 587)
const SMTP_USER = process.env.SMTP_USER
const SMTP_PASS = process.env.SMTP_PASS
const FROM_EMAIL = process.env.FROM_EMAIL || 'no-reply@ridefleetaz.com'

let transporter: nodemailer.Transporter | null = null
if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: SMTP_PORT,
    secure: SMTP_PORT === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS }
  })
}

export async function sendAdminEmail(subject: string, html: string) {
  const to = process.env.ADMIN_EMAIL
  if (!to) {
    console.log('ADMIN_EMAIL not configured. Email body:', subject, html)
    return
  }

  if (!transporter) {
    console.log('SMTP not configured. Logging email for dev:', { to, subject, html })
    return
  }

  await transporter.sendMail({ from: FROM_EMAIL, to, subject, html })
}
