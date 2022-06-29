import invariant from 'tiny-invariant'
import type { Inventory, $infer } from '~/db.server'
import { e, client } from '~/db.server'
import { Account } from './user.server'

const query = e.select(e.Inventory, () => ({
  ascension_gem: { name: true, '@quantity': true },
  ascension_boss: { name: true, '@quantity': true },
  local_specialty: { name: true, '@quantity': true },
  common: { name: true, '@quantity': true },
  talent_book: { name: true, '@quantity': true },
  talent_boss: { name: true, '@quantity': true },
  special: { name: true, '@quantity': true },
}))
export type InventoryInfer = $infer<typeof query>[0]

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
      filter: e.op(inventory.owner, '=', Account(accId)),
    }))
    .run(client)

  return inventory[0]
}

export async function getInventoryCategory({
  category,
  accId,
}: {
  category: keyof Inventory
  accId: string
}) {
  const inventory = await e
    .select(e.Inventory, (inventory) => ({
      [category]: { name: true, '@quantity': true },
      filter: e.op(inventory.owner, '=', Account(accId)),
    }))
    .run(client)

  invariant(inventory)
  return inventory[0][category] as { name: string; '@quantity': number }[]
}

export async function upsertItem({
  name,
  category,
  quantity,
  accId,
}: {
  name: string
  category: keyof Inventory
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
      filter: e.op(inventory.owner, '=', Account(accId)),
      set: {
        [category]: { '+=': itemToUpsert },
      },
    }))
    .run(client)
}

function getSelector(category: keyof Inventory) {
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
