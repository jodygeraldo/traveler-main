import { createClient } from 'edgedb'
import { seedCharacters } from './character'
import { seedItems } from './item'
import { seedUser } from './user'
const client = createClient()

async function seed() {
  const characters = seedCharacters(client)
  const items = seedItems(client)

  await Promise.all([characters, ...items])
  await seedUser(client)

  console.log(`Database has been seeded. 🌱`)
}

seed()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    client.close()
  })
