import bcrypt from 'bcryptjs'
import e, * as DB from '~/db.server'

const client = DB.client

export async function getUserById(id: string) {
  return await e
    .select(e.User, (user) => ({
      ...e.User['*'],
      accounts: { ...e.Account['*'] },
      filter: e.op(user.id, '=', e.uuid(id)),
    }))
    .run(client)
}

export async function getUserByEmail(email: string) {
  return await e
    .select(e.User, (user) => ({
      ...e.User['*'],
      accounts: { ...e.Account['*'] },
      filter: e.op(user.email, '=', email),
    }))
    .run(client)
}

export async function createUser(email: string, password: string) {
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

  const queryAccount = e.insert(e.Account, {
    owner: e.select(e.User, (u) => ({
      filter: e.op(u.id, '=', e.uuid(user.id)),
    })),
  })

  const account = await e
    .select(queryAccount, () => ({
      ...e.Account['*'],
      owner: {
        ...e.User['*'],
      },
    }))
    .run(client)

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

  return account
}

export async function deleteUserByEmail(email: string) {
  return e
    .delete(e.User, (user) => ({
      filter: e.op(user.email, '=', email),
    }))
    .run(client)
}

export async function verifyLogin(email: string, password: string) {
  const user = await e
    .select(e.User, (user) => ({
      ...e.User['*'],
      accounts: { id: true, name: true },
      password: {
        ...e.Password['*'],
      },
      filter: e.op(user.email, '=', email),
    }))
    .run(client)

  if (!user?.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, user.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = user
  return userWithoutPassword
}

export function Account(id: string) {
  return e.select(e.Account, (acc) => ({
    filter: e.op(acc.id, '=', e.uuid(id)),
  }))
}
