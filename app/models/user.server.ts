import bcrypt from 'bcryptjs'
import * as DB from '~/db.server'

export async function getUserById(id: string) {
  return await DB.e
    .select(DB.e.User, (user) => ({
      ...DB.e.User['*'],
      accounts: { ...DB.e.Account['*'] },
      filter: DB.e.op(user.id, '=', DB.e.uuid(id)),
    }))
    .run(DB.client)
}

export async function getUserByEmail(email: string) {
  return await DB.e
    .select(DB.e.User, (user) => ({
      ...DB.e.User['*'],
      accounts: { ...DB.e.Account['*'] },
      filter: DB.e.op(user.email, '=', email),
    }))
    .run(DB.client)
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)
  const queryPassword = DB.e.insert(DB.e.Password, {
    hash: hashedPassword,
    user: DB.e.insert(DB.e.User, {
      email,
    }),
  })

  const { user } = await DB.e
    .select(queryPassword, () => ({
      user: true,
    }))
    .run(DB.client)

  const queryAccount = DB.e.insert(DB.e.Account, {
    owner: DB.e.select(DB.e.User, (u) => ({
      filter: DB.e.op(u.id, '=', DB.e.uuid(user.id)),
    })),
  })

  const account = await DB.e
    .select(queryAccount, () => ({
      ...DB.e.Account['*'],
      owner: {
        ...DB.e.User['*'],
      },
    }))
    .run(DB.client)

  const freeCharacters = DB.e.set(
    DB.e.str('Traveler Anemo'),
    DB.e.str('Amber'),
    DB.e.str('Kaeya'),
    DB.e.str('Lisa'),
    DB.e.str('Barbara'),
    DB.e.str('Xiangling'),
    DB.e.str('Noelle')
  )

  const character = DB.e.insert(DB.e.UserCharacter, {
    owner: DB.e.select(DB.e.Account, (a) => ({
      filter: DB.e.op(a.id, '=', DB.e.uuid(account.id)),
    })),
    characters: DB.e.select(DB.e.Character, (c) => ({
      filter: DB.e.op(c.name, 'in', freeCharacters),
    })),
  })

  const inventory = DB.e.insert(DB.e.Inventory, {
    owner: DB.e.select(DB.e.Account, (a) => ({
      filter: DB.e.op(a.id, '=', DB.e.uuid(account.id)),
    })),
  })

  await Promise.all([inventory.run(DB.client), character.run(DB.client)])

  return account
}

export async function deleteUserByEmail(email: string) {
  return DB.e
    .delete(DB.e.User, (user) => ({
      filter: DB.e.op(user.email, '=', email),
    }))
    .run(DB.client)
}

export async function verifyLogin(email: string, password: string) {
  const user = await DB.e
    .select(DB.e.User, (user) => ({
      ...DB.e.User['*'],
      accounts: { id: true, name: true },
      password: {
        ...DB.e.Password['*'],
      },
      filter: DB.e.op(user.email, '=', email),
    }))
    .run(DB.client)

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
  return DB.e.select(DB.e.Account, (acc) => ({
    filter: DB.e.op(acc.id, '=', DB.e.uuid(id)),
  }))
}
