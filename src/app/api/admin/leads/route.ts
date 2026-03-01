import { NextResponse } from 'next/server'
import { prisma } from '../../../../lib/prisma'
function isAdminAuthorized(req: Request) {
  const cookie = req.headers.get('cookie') || ''
  if (cookie.includes('rf_admin=1')) return true
  const pw = req.headers.get('x-admin-password')
  if (pw && pw === process.env.ADMIN_PASSWORD) return true
  return false
}

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) return NextResponse.json({ error: 'unauth' }, { status: 401 })
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  return NextResponse.json(leads)
}

export async function PATCH(req: Request) {
  if (!isAdminAuthorized(req)) return NextResponse.json({ error: 'unauth' }, { status: 401 })
  const body = await req.json()
  const { id, status } = body
  if (!id || !status) return NextResponse.json({ error: 'missing' }, { status: 400 })
  const updated = await prisma.lead.update({ where: { id }, data: { status } })
  return NextResponse.json(updated)
}
