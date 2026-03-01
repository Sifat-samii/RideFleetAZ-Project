import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const body = await req.json()
  const { password } = body
  if (!process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'no admin pw set' }, { status: 500 })
  if (password !== process.env.ADMIN_PASSWORD) return NextResponse.json({ error: 'unauthorized' }, { status: 401 })

  const res = NextResponse.json({ ok: true })
  // set simple cookie
  res.headers.set('Set-Cookie', `rf_admin=1; HttpOnly; Path=/; Max-Age=${60*60}`)
  return res
}
