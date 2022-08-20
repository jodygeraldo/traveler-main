import bcrypt from 'bcryptjs'
import type * as DB from '~/db.server'
import prisma from '~/db.server'

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      role: true,
      accounts: {
        select: {
          id: true,
          name: true,
          server: true,
        },
      },
    },
  })
}

export function getAccountById(id: string) {
  return prisma.account.findUnique({
    where: { id },
  })
}

export async function getUserByEmail(email: string) {
  return prisma.user.findUnique({
    where: { email },
  })
}

export async function createUser(email: string, password: string) {
  const hashedPassword = await bcrypt.hash(password, 10)

  return prisma.user.create({
    data: {
      email,
      password: {
        create: {
          hash: hashedPassword,
        },
      },
      accounts: {
        create: {
          default: true,
          name: 'Account 1',
        },
      },
    },
    select: {
      id: true,
      role: true,
      accounts: {
        take: 1,
        where: {
          default: true,
        },
        select: {
          id: true,
        },
      },
    },
  })
}

export async function deleteUserByEmail(email: string) {
  return prisma.user.delete({
    where: { email },
  })
}

export async function verifyLogin(email: string, password: string) {
  const userWithPassword = await prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      role: true,
      accounts: {
        select: {
          id: true,
        },
      },
      password: true,
    },
  })

  if (!userWithPassword?.password) {
    return null
  }

  const isValid = await bcrypt.compare(password, userWithPassword.password.hash)

  if (!isValid) {
    return null
  }

  const { password: _password, ...userWithoutPassword } = userWithPassword

  return userWithoutPassword
}

export async function updateAccountServer({
  server,
  accountId,
}: {
  server: DB.Server
  accountId: string
}) {
  return prisma.account.update({
    where: { id: accountId },
    data: { server },
  })
}
