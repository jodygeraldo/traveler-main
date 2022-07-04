import invariant from 'tiny-invariant'
import * as DB from '~/db.server'
import * as UserModel from './user.server'

const query = DB.e.select(DB.e.Inventory, (i) => ({
  ascension_gem: { name: true, '@quantity': true },
  ascension_boss: { name: true, '@quantity': true },
  local_specialty: { name: true, '@quantity': true },
  common: { name: true, '@quantity': true },
  talent_book: { name: true, '@quantity': true },
  talent_boss: { name: true, '@quantity': true },
  special: { name: true, '@quantity': true },
  filter: DB.e.op(i.owner, '=', UserModel.Account('uuid')),
}))
export type InventoryInfer = DB.$infer<typeof query>

export async function getInventory({ accId }: { accId: string }) {
  const inventory = await DB.e
    .select(DB.e.Inventory, (inventory) => ({
      ascension_gem: { name: true, '@quantity': true },
      ascension_boss: { name: true, '@quantity': true },
      local_specialty: { name: true, '@quantity': true },
      common: { name: true, '@quantity': true },
      talent_book: { name: true, '@quantity': true },
      talent_boss: { name: true, '@quantity': true },
      special: { name: true, '@quantity': true },
      filter: DB.e.op(inventory.owner, '=', UserModel.Account(accId)),
    }))
    .run(DB.client)

  return inventory
}

export async function getInventoryCategory({
  category,
  accId,
}: {
  category: keyof DB.Inventory
  accId: string
}) {
  const inventory = await DB.e
    .select(DB.e.Inventory, (inventory) => ({
      [category]: { name: true, '@quantity': true },
      filter: DB.e.op(inventory.owner, '=', UserModel.Account(accId)),
    }))
    .run(DB.client)

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
  category: keyof DB.Inventory
  quantity: number
  accId: string
}) {
  const selector = getSelector(category)
  invariant(selector, "Can't find selector for category: " + category)

  const itemToUpsert = DB.e.select(selector, (i) => ({
    '@quantity': DB.e.int16(quantity),
    filter: DB.e.op(i.name, '=', name),
  }))

  await DB.e
    .update(DB.e.Inventory, (inventory) => ({
      filter: DB.e.op(inventory.owner, '=', UserModel.Account(accId)),
      set: {
        [category]: { '+=': itemToUpsert },
      },
    }))
    .run(DB.client)
}

function getSelector(category: keyof DB.Inventory) {
  switch (category) {
    case 'ascension_boss':
      return DB.e.AscensionBossMaterial
    case 'ascension_gem':
      return DB.e.AscensionGem
    case 'common':
      return DB.e.CommonMaterial
    case 'local_specialty':
      return DB.e.LocalSpecialty
    case 'talent_book':
      return DB.e.TalentBook
    case 'talent_boss':
      return DB.e.TalentBossMaterial
    case 'special':
      return DB.e.SpecialItem
    default:
      invariant(false, 'Unknown category: ' + category)
  }
}
