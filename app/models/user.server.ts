import bcrypt from 'bcryptjs'
import prisma from '~/db.server'

export async function getUserById(id: string) {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      email: true,
      accounts: {
        select: {
          id: true,
          name: true,
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
      accounts: {
        select: {
          id: true,
        },
      },
      password: true,
    }
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
