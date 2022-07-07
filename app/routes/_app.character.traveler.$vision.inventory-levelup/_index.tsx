import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as RemixImage from 'remix-image'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import { Button } from '~/components/Button'
import * as Icon from '~/components/Icon'
import Tooltip from '~/components/Tooltip'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

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

const backgroundImage: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
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
          <Item key={item.name} item={item} />
        ))}
      </ul>

      <InventoryLevelUpForm
        heading="Ascension"
        items={currentMaterial.ascension}
        inventoryItems={inventoryItems}
        level={ascension}
        possibleToLevel={possibleToLevel.ascension ? true : false}
        isAscension={true}
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

function Item({
  item,
  items,
}: {
  item: {
    name: string
    quantity: number
    rarity: 1 | 2 | 3 | 4 | 5
  }
  items?: {
    quantity: number
    name: string
    rarity: 1 | 2 | 3 | 4 | 5
  }[]
}) {
  const correspondingItem = items?.find((i) => i.name === item.name)

  return (
    <li key={item.name}>
      <Tooltip text={item.name}>
        <div
          className={clsx(
            correspondingItem
              ? correspondingItem.quantity >= item.quantity
                ? 'bg-success-3'
                : 'bg-danger-3'
              : 'bg-gray-3',
            'rounded-b-md shadow-sm'
          )}
        >
          <div
            className={clsx(
              backgroundImage[item.rarity],
              'rounded-t-md rounded-br-2xl bg-contain'
            )}
          >
            <RemixImage.Image
              src={`/image/item/${Utils.getImageSrc(item.name)}.png`}
              alt={item.name}
              className="h-16 w-16 rounded-br-2xl"
              responsive={[{ size: { width: 64, height: 64 } }]}
              dprVariants={[1, 2, 3]}
            />
          </div>
          <div className="text-center">
            <span className="sr-only">Quantity {item.quantity}</span>
            <p className="text-sm text-gray-11" aria-hidden>
              {item.quantity}
            </p>
          </div>
        </div>
      </Tooltip>
    </li>
  )
}

function InventoryLevelUpForm({
  heading,
  level,
  items,
  possibleToLevel,
  isAscension,
  unlockable,
  inventoryItems,
}: {
  heading: string
  level: number
  items:
    | {
        name: string
        rarity: 1 | 2 | 3 | 4 | 5
        quantity: number
      }[]
    | undefined
  inventoryItems: {
    name: string
    rarity: 1 | 2 | 3 | 4 | 5
    quantity: number
  }[]
  possibleToLevel: boolean
  isAscension?: boolean
  unlockable?: {
    level: {
      from: number
      to: number
    }
    talent: {
      from: number
      to: number
    }
  }
}) {
  const useTransition = RemixReact.useTransition()
  const busy = useTransition.state === 'submitting'

  if (!items) {
    return null
  }

  return (
    <div>
      <h2 className="inline-flex items-center gap-1 text-xl font-semibold text-gray-12">
        {heading} {level} <span className="sr-only">To</span>
        <Icon.Solid
          name="arrowSmRight"
          aria-hidden
          className="inline h-4 w-4"
        />
        {level + 1}
      </h2>

      <div className="mt-1 flex items-center gap-4 text-gray-11">
        <ul className="flex flex-wrap gap-2">
          {items.map((item) => (
            <Item key={item.name} item={item} items={inventoryItems} />
          ))}
        </ul>
        {isAscension && unlockable ? (
          <div>
            <p className="font-medium">Unlock: </p>
            <ul>
              {unlockable.level.to !== 9999 ? (
                <li className="flex items-center gap-1 text-sm">
                  Level {unlockable.level.from}{' '}
                  <span className="sr-only">To</span>
                  <Icon.Solid
                    name="arrowSmRight"
                    aria-hidden
                    className="inline h-4 w-4"
                  />
                  <span className="text-base font-bold">
                    {unlockable.level.to}
                  </span>
                </li>
              ) : null}
              {!(
                unlockable.talent.to === 9999 || unlockable.talent.to === 1
              ) ? (
                <li className="flex items-center gap-1 text-sm">
                  Level {unlockable.talent.from}{' '}
                  <span className="sr-only">To</span>
                  <Icon.Solid
                    name="arrowSmRight"
                    aria-hidden
                    className="inline h-4 w-4"
                  />
                  <span className="text-base font-bold">
                    {unlockable.talent.to}
                  </span>
                </li>
              ) : null}
            </ul>
          </div>
        ) : null}
        <RemixReact.Form>
          <Button type="submit" disabled={busy || !possibleToLevel}>
            {busy ? 'Leveling up...' : 'Level Up'}
          </Button>
        </RemixReact.Form>
      </div>
    </div>
  )
}
