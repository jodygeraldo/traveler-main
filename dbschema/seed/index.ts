import { createClient } from 'edgedb'
import { seedCharacters } from './character'
import { seedItems } from './item'
import { seedUser } from './user'
const client = createClient()

async function seed() {
  const user = seedUser(client)
  const characters = seedCharacters(client)
  const items = seedItems(client)

  await Promise.all([user, characters, ...items])

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
