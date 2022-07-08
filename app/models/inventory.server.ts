import type * as DB from '~/db.server'
import prisma from '~/db.server'

export async function getInventory({ accountId }: { accountId: string }) {
  return prisma.inventory.findMany({
    where: {
      ownerId: accountId,
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

// interface RequiredItemsParams {
//   baseCommon?: string[]
//   ascensionGem?: string[]
//   localSpecialty?: string
//   ascensionBoss?: string
//   talentCommon?: string[]
//   talentBook?: string[]
//   talentBoss?: string[]
//   special?: string
//   accId: string
// }

// export async function getRequiredItems({
//   baseCommon = [],
//   ascensionGem = [],
//   localSpecialty = '',
//   ascensionBoss = '',
//   talentCommon = [],
//   talentBook = [],
//   talentBoss = [],
//   special = '',
//   accId,
// }: RequiredItemsParams) {
//   const commonSet = e.array_unpack(
//     // there's need to minimum one item in the set
//     e.array(['', ...baseCommon, ...talentCommon])
//   )
//   const ascensionGemSet = e.array_unpack(e.array(['', ...ascensionGem]))
//   const ascensionBossSet = e.str(ascensionBoss)
//   const localSpecialtySet = e.str(localSpecialty)
//   const talentBossSet = e.array_unpack(e.array(['', ...talentBoss]))
//   const specialSet = e.str(special)
//   const talentBookSet = e.array_unpack(e.array(['', ...talentBook]))

//   const inventory = await e
//     .select(e.Inventory, (inventory) => ({
//       common: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, 'in', commonSet),
//       }),
//       ascension_gem: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, 'in', ascensionGemSet),
//       }),
//       ascension_boss: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, '=', ascensionBossSet),
//       }),
//       local_specialty: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, '=', localSpecialtySet),
//       }),
//       talent_book: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, 'in', talentBookSet),
//       }),
//       talent_boss: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, 'in', talentBossSet),
//       }),
//       special: (i) => ({
//         name: true,
//         '@quantity': true,
//         filter: e.op(i.name, '=', specialSet),
//       }),
//       filter: e.op(inventory.owner, '=', UserModel.getAccountById(accId)),
//     }))
//     .run(client)

//   invariant(inventory, "Can't find inventory for this account")
//   return inventory
// }
