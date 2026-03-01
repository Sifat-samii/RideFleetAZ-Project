import { NextResponse } from 'next/server'
import { createAdminSessionCookie } from '../../../../lib/admin-auth'

export async function POST(req: Request) {
  const body = await req.json()
  const { password } = body

  if (!process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'no admin pw set' }, { status: 500 })
  }

  if (password !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 })
  }

  const res = NextResponse.json({ ok: true })
  res.headers.set('Set-Cookie', createAdminSessionCookie())
  return res
}
