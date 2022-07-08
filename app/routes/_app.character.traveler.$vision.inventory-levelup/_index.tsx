import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import InventoryLevelUpForm from '~/components/InventoryLevelUpForm'
import ItemWithImage from '~/components/Item'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export { action } from '~/actions/inventory-levelup'

interface LoaderData {
  data: ReturnType<typeof CharacterData.getCharacterInventoryLevelUpData>
}

export const loader: RemixNode.LoaderFunction = async ({ params, request }) => {
  const accId = await Session.requireAccountId(request)
  const { vision } = params
  invariant(vision)

  const characterName = Zod.enum(CharacterData.validTraveler).safeParse(
    Utils.toCapitalized(`Traveler ${vision}`)
  )
  if (!characterName.success) {
    throw RemixNode.json(
      { name: characterName },
      { status: 404, statusText: 'Page Not Found' }
    )
  }

  const material = CharacterData.getItemsToRetrieve({
    name: characterName.data,
  })
  if (!material) {
    throw RemixNode.json(
      { name: characterName },
      { status: 404, statusText: 'Page Not Found' }
    )
  }

  const [userCharacter, characterRequiredItems] = await Promise.all([
    CharacterModel.getUserCharacter({
      name: characterName.data,
      accId,
    }),
    InventoryModel.getRequiredItems({
      ...material.ascension,
      ...material.talent,
      accId,
    }),
  ])

  const data = CharacterData.getCharacterInventoryLevelUpData({
    name: characterName.data,
    characterData: userCharacter,
    material,
    requiredItems: characterRequiredItems,
  })

  return RemixNode.json<LoaderData>({ data })
}

export default function TravelerInventoryLevelupPage() {
  const { data } = RemixReact.useLoaderData() as LoaderData

  if (!data) {
    return (
      <div className="mt-8 text-center">
        <p className="text-lg font-medium leading-6 text-gray-12">
          Your character is already on max level
        </p>
      </div>
    )
  }

  const {
    characterLevel,
    ascension,
    talent,
    currentMaterial,
    items: inventoryItems,
    possibleToLevel,
    unlockable,
  } = data

  return (
    <div className="mt-8 space-y-8">
      <ul className="flex flex-wrap gap-2">
        {inventoryItems.map((item) => (
          <ItemWithImage key={item.name} item={item} />
        ))}
      </ul>

      <InventoryLevelUpForm
        heading="Ascension"
        items={currentMaterial.ascension}
        inventoryItems={inventoryItems}
        level={ascension}
        possibleToLevel={possibleToLevel.ascension ? true : false}
        isAscension={true}
        characterLevel={characterLevel}
        unlockable={unlockable}
      />

      <InventoryLevelUpForm
        heading="Talent Normal Attack"
        items={currentMaterial.talent.normal}
        inventoryItems={inventoryItems}
        level={talent.normalAttack}
        possibleToLevel={possibleToLevel.talent.normal ? true : false}
      />

      <InventoryLevelUpForm
        heading="Talent Elemental Skill"
        items={currentMaterial.talent.elementalSkill}
        inventoryItems={inventoryItems}
        level={talent.elementalSkill}
        possibleToLevel={possibleToLevel.talent.elementalSkill ? true : false}
      />

      <InventoryLevelUpForm
        heading="Talent Elemental Burst"
        items={currentMaterial.talent.elementalBurst}
        inventoryItems={inventoryItems}
        level={talent.elementalBurst}
        possibleToLevel={possibleToLevel.talent.elementalBurst ? true : false}
      />
    </div>
  )
}
