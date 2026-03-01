import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  await prisma.lead.createMany({
    data: [
      {
        readyNow: true,
        platforms: ['Uber','DoorDash'],
        fullName: 'Maria Gomez',
        phone: '+15555550123',
        email: 'maria@example.com',
        licenseFileUrl: 'seed/license-maria.jpg',
        status: 'NEW'
      }
    ]
  })
  console.log('Seed complete')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
