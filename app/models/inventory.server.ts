import type * as DB from '~/db.server'
import prisma from '~/db.server'

export async function getInventory({ accountId }: { accountId: string }) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
    },
    select: {
      itemName: true,
      quantity: true,
    },
  })
}

export async function getInventoryByType({
  type,
  accountId,
}: {
  type: DB.ItemType
  accountId: string
}) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
      item: { type },
    },
    select: {
      itemName: true,
      quantity: true,
    },
  })
}

export async function upsertInventoryItem({
  name,
  quantity,
  accountId,
}: {
  name: string
  quantity: number
  accountId: string
}) {
  await prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findFirst({
      where: {
        ownerId: accountId,
        item: { name },
      },
    })

    if (inventory) {
      await tx.inventory.update({
        where: { id: inventory.id },
        data: { quantity },
      })
    } else {
      await tx.inventory.create({
        data: {
          ownerId: accountId,
          quantity,
          itemName: name,
        },
      })
    }
  })
}

export async function getRequiredItems({
  itemNames,
  accountId,
}: {
  itemNames: string[]
  accountId: string
}) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
      itemName: { in: itemNames },
    },
    select: {
      itemName: true,
      quantity: true,
    },
  })
}
