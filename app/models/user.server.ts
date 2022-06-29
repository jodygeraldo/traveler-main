import bcrypt from 'bcryptjs'
import { e, client } from '~/db.server'

export async function getUserById(id: string) {
  return await e
    .select(e.User, (user) => ({
      ...e.User['*'],
      account: { ...e.Account['*'] },
      filter: e.op(user.id, '=', e.uuid(id)),
    }))
    .run(client)
}

export async function getUserByEmail(email: string) {
  return await e
    .select(e.User, (user) => ({
      ...e.User['*'],
      account: { ...e.Account['*'] },
      filter: e.op(user.email, '=', email),
    }))
    .run(client)
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  const freeCharacters = e.set(
    e.str('Traveler Anemo'),
    e.str('Amber'),
    e.str('Kaeya'),
    e.str('Lisa'),
    e.str('Barbara'),
    e.str('Xiangling'),
    e.str('Noelle')
  )

  const user = e.insert(e.User, {
    email,
    account: e.insert(e.Account, {
      name: 'Default',
      characters: e.insert(e.UserCharacter, {
        characters: e.select(e.Character, (c) => ({
          filter: e.op(c.name, 'in', freeCharacters),
        })),
      }),
      inventory: e.insert(e.Inventory, {
        ascension_boss: null,
      }),
    }),
  })

  const pass = e.insert(e.Password, {
    hash: hashedPassword,
    user,
  })
  const created = await e
    .select(pass, () => ({
      id: true,
      user: { ...e.User['*'], account: { ...e.Account['*'] } },
    }))
    .run(client)
  return created.user
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
      account: { ...e.Account['*'] },
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
