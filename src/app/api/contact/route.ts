import { NextResponse } from 'next/server'
import { prisma } from '../../../lib/prisma'
import { sendAdminEmail } from '../../../lib/mailer'

export async function POST(req: Request) {
  const body = await req.json()
  const { name, email, phone, message } = body
  if (!name || !email || !message) return NextResponse.json({ error: 'missing' }, { status: 400 })

  const contact = await prisma.contactInquiry.create({ data: { name, email, phone, message } })
  await sendAdminEmail('New contact inquiry', `<p>${name} — ${email} — ${phone || ''}</p><p>${String(message)}</p>`)
  return NextResponse.json({ ok: true })
}
