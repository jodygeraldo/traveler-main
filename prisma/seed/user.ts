import type * as Prisma from '@prisma/client'
import bcrypt from 'bcryptjs'

export async function seed(prisma: Prisma.PrismaClient) {
  const email = 'jody@test.com'

  // cleanup
  await prisma.user
    .delete({
      where: { email },
    })
    .catch(() => {}) // ignore if user doesn't exist

  const hashedPassword = await bcrypt.hash('test1234', 10)

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
  })
}
