import { LeadStatus } from '@prisma/client'
import { NextResponse } from 'next/server'
import { isAdminAuthorized } from '../../../../lib/admin-auth'
import { prisma } from '../../../../lib/prisma'

export async function GET(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'unauth' }, { status: 401 })
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 200 })
  return NextResponse.json(leads)
}

export async function PATCH(req: Request) {
  if (!isAdminAuthorized(req)) {
    return NextResponse.json({ error: 'unauth' }, { status: 401 })
  }

  const body = await req.json()
  const { id, status } = body
  if (!id || !status) {
    return NextResponse.json({ error: 'missing' }, { status: 400 })
  }

  if (!Object.values(LeadStatus).includes(status)) {
    return NextResponse.json({ error: 'invalid_status' }, { status: 400 })
  }

  const updated = await prisma.lead.update({ where: { id }, data: { status } })
  return NextResponse.json(updated)
}
