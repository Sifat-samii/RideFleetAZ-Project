import { NextResponse } from 'next/server'
import { createContactInquiry } from '../../../lib/contact-inquiries'
import { sendAdminEmail } from '../../../lib/mailer'
import { contactSchema } from '../../../lib/validation'

export async function POST(req: Request) {
  const body = await req.json()
  const parsed = contactSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: 'invalid_payload' }, { status: 400 })
  }

  const { name, email, phone, message } = parsed.data
  await createContactInquiry({ name, email, phone, message })
  await sendAdminEmail('New contact inquiry', `<p>${name} — ${email} — ${phone || ''}</p><p>${String(message)}</p>`)
  return NextResponse.json({ ok: true })
}
