import Badge from './Badge'
import Button from './Button'

interface Lead {
  id: string
  createdAt: Date
  fullName: string
  phone: string
  email: string
  platforms: string[]
  status: string
  licenseFileUrl: string
}

export default function AdminLeadsTable({ leads }: { leads: Lead[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-primary-500/20 bg-dark-800 shadow-card-lg">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary-500/20 bg-dark-700">
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Date</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Name</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Phone</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Email</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Platforms</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">Status</th>
              <th className="px-6 py-4 text-left text-sm font-bold text-white">License</th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400">
                  No leads yet
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr key={lead.id} className="border-b border-primary-500/10 transition hover:bg-dark-700">
                  <td className="px-6 py-4 text-sm text-gray-400">{new Date(lead.createdAt).toLocaleDateString()}</td>
                  <td className="px-6 py-4 text-sm font-medium text-white">{lead.fullName}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{lead.phone}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{lead.email}</td>
                  <td className="px-6 py-4 text-sm text-gray-400">{lead.platforms.join(', ')}</td>
                  <td className="px-6 py-4 text-sm">
                    <Badge variant={lead.status === 'QUALIFIED' ? 'accent' : 'primary'}>
                      {lead.status}
                    </Badge>
                  </td>
                  <td className="px-6 py-4 text-sm">
                    <Button size="sm" as="a" href={`/api/files/${lead.licenseFileUrl}`} variant="outline">
                      Download
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
