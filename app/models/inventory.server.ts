import invariant from 'tiny-invariant'
import e, * as DB from '~/db.server'
import type * as Utils from '~/utils'
import * as UserModel from './user.server'

const client = DB.client

export type InventoryInfer = Utils.depromisify<ReturnType<typeof getInventory>>
export type InventoryCategoryInfer = Utils.depromisify<
  ReturnType<typeof getInventoryCategory>
>
export type RequiredItemsInfer = Utils.depromisify<
  ReturnType<typeof getRequiredItems>
>

export async function getInventory({ accId }: { accId: string }) {
  const inventory = await e
    .select(e.Inventory, (inventory) => ({
      ascension_gem: { name: true, '@quantity': true },
      ascension_boss: { name: true, '@quantity': true },
      local_specialty: { name: true, '@quantity': true },
      common: { name: true, '@quantity': true },
      talent_book: { name: true, '@quantity': true },
      talent_boss: { name: true, '@quantity': true },
      special: { name: true, '@quantity': true },
      filter: e.op(inventory.owner, '=', UserModel.Account(accId)),
    }))
    .run(client)

  return inventory
}

export async function getInventoryCategory({
  category,
  accId,
}: {
  category: keyof DB.Type.Inventory
  accId: string
}) {
  const inventory = await e
    .select(e.Inventory, (inventory) => ({
      [category]: { name: true, '@quantity': true },
      filter: e.op(inventory.owner, '=', UserModel.Account(accId)),
    }))
    .run(client)

  invariant(inventory, "Can't find inventory for this account")
  return inventory[category] as { name: string; '@quantity': number }[]
}

export async function upsertItem({
  name,
  category,
  quantity,
  accId,
}: {
  name: string
  category: keyof DB.Type.Inventory
  quantity: number
  accId: string
}) {
  const selector = getSelector(category)
  invariant(selector, "Can't find selector for category: " + category)

  const itemToUpsert = e.select(selector, (i) => ({
    '@quantity': e.int16(quantity),
    filter: e.op(i.name, '=', name),
  }))

  await e
    .update(e.Inventory, (inventory) => ({
      filter: e.op(inventory.owner, '=', UserModel.Account(accId)),
      set: {
        [category]: { '+=': itemToUpsert },
      },
    }))
    .run(client)
}

function getSelector(category: keyof DB.Type.Inventory) {
  switch (category) {
    case 'ascension_boss':
      return e.AscensionBossMaterial
    case 'ascension_gem':
      return e.AscensionGem
    case 'common':
      return e.CommonMaterial
    case 'local_specialty':
      return e.LocalSpecialty
    case 'talent_book':
      return e.TalentBook
    case 'talent_boss':
      return e.TalentBossMaterial
    case 'special':
      return e.SpecialItem
    default:
      invariant(false, 'Unknown category: ' + category)
  }
}

interface RequiredItemsParams {
  baseCommon?: string[]
  ascensionGem?: string[]
  localSpecialty?: string
  ascensionBoss?: string
  talentCommon?: string[]
  talentBook?: string[]
  talentBoss?: string[]
  special?: string
  accId: string
}

export async function getRequiredItems({
  baseCommon = [],
  ascensionGem = [],
  localSpecialty = '',
  ascensionBoss = '',
  talentCommon = [],
  talentBook = [],
  talentBoss = [],
  special = '',
  accId,
}: RequiredItemsParams) {
  const commonSet = e.array_unpack(
    // there's need to minimum one item in the set
    e.array(['', ...baseCommon, ...talentCommon])
  )
  const ascensionGemSet = e.array_unpack(e.array(['', ...ascensionGem]))
  const ascensionBossSet = e.str(ascensionBoss)
  const localSpecialtySet = e.str(localSpecialty)
  const talentBossSet = e.array_unpack(e.array(['', ...talentBoss]))
  const specialSet = e.str(special)
  const talentBookSet = e.array_unpack(e.array(['', ...talentBook]))

  const inventory = await e
    .select(e.Inventory, (inventory) => ({
      common: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, 'in', commonSet),
      }),
      ascension_gem: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, 'in', ascensionGemSet),
      }),
      ascension_boss: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, '=', ascensionBossSet),
      }),
      local_specialty: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, '=', localSpecialtySet),
      }),
      talent_book: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, 'in', talentBookSet),
      }),
      talent_boss: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, 'in', talentBossSet),
      }),
      special: (i) => ({
        name: true,
        '@quantity': true,
        filter: e.op(i.name, '=', specialSet),
      }),
      filter: e.op(inventory.owner, '=', UserModel.Account(accId)),
    }))
    .run(client)

  invariant(inventory, "Can't find inventory for this account")
  return inventory
}
