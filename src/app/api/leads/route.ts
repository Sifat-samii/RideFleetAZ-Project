import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import formidable from 'formidable'
import fs from 'fs'
import { saveLocalFile } from '../../../lib/uploads'
import { prisma } from '../../../lib/prisma'
import { sendAdminEmail } from '../../../lib/mailer'

// Basic in-memory rate limiter per IP
const RATE_LIMIT_WINDOW = 60 * 1000 // 1 minute
const MAX_PER_WINDOW = 10
const ipMap = new Map<string, { count: number; ts: number }>()

const parseForm = (req: NextRequest) => new Promise<any>((resolve, reject) => {
  const form = formidable({ maxFileSize: 10 * 1024 * 1024 })
  // @ts-ignore
  form.parse(req as any, (err, fields, files) => {
    if (err) return reject(err)
    resolve({ fields, files })
  })
})

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('cf-connecting-ip') || 'unknown'
    const entry = ipMap.get(ip) || { count: 0, ts: Date.now() }
    if (Date.now() - entry.ts > RATE_LIMIT_WINDOW) {
      entry.count = 0
      entry.ts = Date.now()
    }
    entry.count += 1
    ipMap.set(ip, entry)
    if (entry.count > MAX_PER_WINDOW) return NextResponse.json({ error: 'rate_limited' }, { status: 429 })

    const { fields, files } = await parseForm(req)

    // honeypot
    if (fields?.hp) return NextResponse.json({ error: 'bot' }, { status: 400 })

    const readyNow = fields.readyNow === 'true'
    const platforms = JSON.parse(fields.platforms || '[]')
    const fullName = fields.fullName
    const phone = fields.phone
    const email = fields.email

    const licenseFile = files?.license
    if (!licenseFile) return NextResponse.json({ error: 'license required' }, { status: 400 })

    const buffer = await fs.promises.readFile(licenseFile.filepath || licenseFile.path)
    const { filename } = await saveLocalFile(buffer, licenseFile.originalFilename || 'license')

    const lead = await prisma.lead.create({ data: {
      readyNow,
      platforms,
      fullName,
      phone,
      email,
      licenseFileUrl: filename
    }})

    // notify admin
    const adminLink = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/admin?lead=${lead.id}`
    await sendAdminEmail('New lead submitted', `<p>New lead: ${fullName} (${phone})</p><p><a href="${adminLink}">View lead</a></p>`)

    return NextResponse.json({ ok: true })
  } catch (err:any) {
    console.error(err)
    return NextResponse.json({ error: String(err.message) }, { status: 500 })
  }
}
