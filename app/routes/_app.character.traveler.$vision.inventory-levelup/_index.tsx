import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

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

  
  CharacterData.getCurrentRequiredItems({
    name: characterName.data,
    characterData: userCharacter,
    material,
    requiredItems: characterRequiredItems,
  })


  return RemixNode.json({
    userCharacter,
    requiredItems: characterRequiredItems,
  })
}

export default function TravelerInventoryLevelupPage() {
  const data = RemixReact.useLoaderData()

  return (
    <div>
      <h1 className="mt-8">This is From Inventory Level Up Page</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}
