import { cookies } from 'next/headers'
import { prisma } from '../../lib/prisma'
import Section from '../../components/Section'
import Button from '../../components/Button'
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
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-black text-white">Leads Dashboard</h1>
          <form action="/api/admin/logout" method="post">
            <Button type="submit" variant="outline">Sign Out</Button>
          </form>
        </div>
        <AdminLeadsTable leads={leads} />
      </div>
    </Section>
  )
}
