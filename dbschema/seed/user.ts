import type { Client } from 'edgedb'
import { e } from '~/db.server'
import bcrypt from 'bcryptjs'

export async function seedUser(client: Client) {
  const email = 'test@test.com'
  const pass = 'test1234'
  const user = e.select(e.User, (u) => ({
    filter: e.op(u.email, '=', email),
  }))

  // cleanup the existing database
  await e.delete(user).run(client)

  // create password and user nestedly
  const hash = await bcrypt.hash(pass, 10)
  await e
    .insert(e.Password, {
      hash,
      user: e.insert(e.User, {
        email,
        account: e.insert(e.Account, {
          name: 'Default',
          characters: e.insert(e.UserCharacter, {
            characters: null,
          }),
          inventory: e.insert(e.Inventory, {
            ascension_boss: null,
          }),
        }),
      }),
    })
    .run(client)
}
