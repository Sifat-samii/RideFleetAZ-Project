import { prisma } from '../../lib/prisma'
import Link from 'next/link'
import { cookies } from 'next/headers'
import Section from '../../components/Section'
import Badge from '../../components/Badge'
import Button from '../../components/Button'
import Input from '../../components/Input'
import AdminLoginClient from '../../components/AdminLoginClient'
import AdminLeadsTable from '../../components/AdminLeadsTable'

export default async function AdminPage() {
  const cookieStore = await cookies()
  const authorized = Boolean(cookieStore.get('rf_admin'))
  
  if (!authorized) {
    return <AdminLoginClient />
  }

  const leads = await prisma.lead.findMany({ orderBy: { createdAt: 'desc' }, take: 100 })
  
  return (
    <Section className="py-24">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl font-black text-white">Leads Dashboard</h1>
          <Button as="a" href="/api/admin/logout" variant="outline">Sign Out</Button>
        </div>
        <AdminLeadsTable leads={leads} />
      </div>
    </Section>
  )
}
