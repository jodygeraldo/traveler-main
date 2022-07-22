import type * as DB from '~/db.server'
import prisma from '~/db.server'

export async function getInventory({ accountId }: { accountId: string }) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
    },
    select: {
      name: true,
      quantity: true,
    },
  })
}

export async function getInventoryByType({
  type,
  accountId,
}: {
  type: DB.ItemType | DB.ItemType[]
  accountId: string
}) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
      item: {
        type: {
          in: Array.isArray(type) ? type : [type],
        },
      },
    },
    select: {
      name: true,
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
          name,
        },
      })
    }
  })
}

export async function getRequiredItems({
  names,
  accountId,
}: {
  names: string[]
  accountId: string
}) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
      name: { in: names },
    },
    select: {
      name: true,
      quantity: true,
    },
  })
}

export async function convertItem({
  name,
  converter,
  accountId,
}: {
  name: string
  converter: {
    special: {
      name: string
      quantity: number
    }
    item: {
      name: string
      quantity: number
    }
  }
  accountId: string
}) {
  return await prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findMany({
      where: {
        ownerId: accountId,
        name: {
          in: [converter.special.name, converter.item.name],
        },
      },
    })

    if (inventory.length !== 2) {
      return {
        message: 'Missing converter items',
      }
    }

    const special = inventory.find((i) => i.name === converter.special.name)!
    const item = inventory.find((i) => i.name === converter.item.name)!

    if (special.quantity < converter.special.quantity) {
      return {
        message: `Not enough ${converter.special.name}, required ${converter.special.quantity} but have ${special.quantity}`,
      }
    }

    if (item.quantity < converter.item.quantity) {
      return {
        message: `Not enough ${converter.item.name}, required ${converter.item.quantity} but have ${item.quantity}`,
      }
    }

    const convertedItem = await tx.inventory.findFirst({
      where: {
        ownerId: accountId,
        name,
      },
    })

    await tx.inventory.upsert({
      where: {
        id: convertedItem?.id ?? '',
      },
      create: {
        name,
        ownerId: accountId,
        quantity: converter.item.quantity,
      },
      update: {
        quantity: {
          increment: converter.item.quantity,
        },
      },
    })

<<<<<<< HEAD
    await tx.inventory.update({
      where: { id: special.id },
      data: {
        quantity: {
          decrement: converter.special.quantity,
=======
    if (converter.item.quantity === converter.special.quantity) {
      await tx.inventory.updateMany({
        where: {
          ownerId: accountId,
          name: {
            in: [converter.special.name, converter.item.name],
          },
        },
        data: {
          quantity: {
            decrement: converter.item.quantity,
          },
        },
      })
    } else {
      await tx.inventory.update({
        where: { id: special.id },
        data: {
          quantity: {
            decrement: converter.special.quantity,
          },
>>>>>>> 0aab238 (refactor: structure and types (#59))
        },
      },
    })

    await tx.inventory.update({
      where: { id: item.id },
      data: {
        quantity: {
          decrement: converter.item.quantity,
        },
      },
    })
  })
}
export async function craftItem({
  name,
  quantity,
  crafterName,
  crafterQuantity,
  bonusType,
  bonusQuantity,
  accountId,
}: {
  name: string
  quantity: number
  crafterName: string
  crafterQuantity: number
  bonusType?: 'Refund' | 'Bonus'
  bonusQuantity: number
  accountId: string
}) {
  return await prisma.$transaction(async (tx) => {
    const inventory = await tx.inventory.findFirst({
      where: {
        ownerId: accountId,
        name: crafterName,
      },
    })

    if (!inventory) {
      return {
        message: 'Missing crafter',
      }
    }

    if (inventory.quantity < crafterQuantity) {
      return {
        message: `Not enough ${crafterName}, required ${crafterQuantity} but have ${inventory.quantity}`,
      }
    }

    const convertedItem = await tx.inventory.findFirst({
      where: {
        ownerId: accountId,
        name,
      },
    })

    let updatedQuantity =
      bonusType === 'Bonus' ? quantity + bonusQuantity : quantity

    await tx.inventory.upsert({
      where: {
        id: convertedItem?.id ?? '',
      },
      create: {
        name: name,
        ownerId: accountId,
        quantity: updatedQuantity,
      },
      update: {
        quantity: {
          increment: updatedQuantity,
        },
      },
    })

    updatedQuantity =
      bonusType === 'Refund' ? crafterQuantity - bonusQuantity : crafterQuantity

    await tx.inventory.update({
      where: { id: inventory.id },
      data: {
        quantity: {
          decrement: updatedQuantity,
        },
      },
    })
  })
}
