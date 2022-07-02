import bcrypt from 'bcryptjs'
import type { Client } from 'edgedb'
import { e } from '~/db.server'

export async function seedUser(client: Client) {
  const email = 'jody@test.com'
  const password = 'test1234'
  const prevUser = e.select(e.User, (u) => ({
    filter: e.op(u.email, '=', email),
  }))

  await e.delete(prevUser).run(client)

  const hashedPassword = await bcrypt.hash(password, 10)
  const queryPassword = e.insert(e.Password, {
    hash: hashedPassword,
    user: e.insert(e.User, {
      email,
    }),
  })

  const { user } = await e
    .select(queryPassword, () => ({
      user: true,
    }))
    .run(client)

  const account = await e
    .insert(e.Account, {
      owner: e.select(e.User, (u) => ({
        filter: e.op(u.id, '=', e.uuid(user.id)),
      })),
    })
    .run(client)

  // await e
  //   .select(queryAccount, () => ({
  //     ...e.Account['*'],
  //     owner: {
  //       ...e.User['*'],
  //     },
  //   }))
  //   .run(client)

  const freeCharacters = e.set(
    e.str('Traveler Anemo'),
    e.str('Amber'),
    e.str('Kaeya'),
    e.str('Lisa'),
    e.str('Barbara'),
    e.str('Xiangling'),
    e.str('Noelle')
  )

  const character = e.insert(e.UserCharacter, {
    owner: e.select(e.Account, (a) => ({
      filter: e.op(a.id, '=', e.uuid(account.id)),
    })),
    characters: e.select(e.Character, (c) => ({
      filter: e.op(c.name, 'in', freeCharacters),
    })),
  })

  const inventory = e.insert(e.Inventory, {
    owner: e.select(e.Account, (a) => ({
      filter: e.op(a.id, '=', e.uuid(account.id)),
    })),
  })

  await Promise.all([inventory.run(client), character.run(client)])
}
