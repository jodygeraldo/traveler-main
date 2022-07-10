import * as Prisma from '@prisma/client'
import * as Character from './character'
import * as Item from './item'
import * as User from './user'

const prisma = new Prisma.PrismaClient()

async function seed() {
  await Promise.all([
    Character.seed(prisma),
    Item.seed(prisma),
    User.seed(prisma),
  ])

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    prisma.$disconnect()
  })
