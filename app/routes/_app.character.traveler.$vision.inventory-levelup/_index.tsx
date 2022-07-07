import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as RemixImage from 'remix-image'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import { z } from 'zod'
import { Button } from '~/components/Button'
import * as Icon from '~/components/Icon'
import Tooltip from '~/components/Tooltip'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

const ParamsSchema = Zod.object({
  characterLevel: Zod.number().min(1).max(90).optional(),
  level: Zod.number().min(0).max(10),
  kind: z.enum([
    'Ascension',
    'Talent Normal Attack',
    'Talent Elemental Skill',
    'Talent Elemental Burst',
  ]),
  items: Zod.string(),
})

export const action: RemixNode.ActionFunction = async ({ params, request }) => {
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

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { level, kind, characterLevel = 1 } = result.data

  const itemsSchema = Zod.array(
    Zod.object({
      name: Zod.string(),
      quantity: Zod.number(),
      rarity: Zod.number(),
    })
  )

  const items = itemsSchema.parse(JSON.parse(result.data.items))

  const AscensionItemType = {
    0: 'common',
    1: 'ascension_gem',
    2: 'local_specialty',
    3: 'ascension_boss',
  } as const

  const TalentItemType = {
    0: 'common',
    1: 'talent_book',
    2: 'talent_boss',
    3: 'special',
  } as const

  let ascensionItems = [] as CharacterModel.AscensionItem[]
  let talentItems = [] as CharacterModel.TalentItem[]

  if (kind === 'Ascension') {
    ascensionItems = items.map((item, idx) => {
      const idxTyped = Zod.number().min(0).max(3).parse(idx) as 0 | 1 | 2 | 3

      return {
        name: item.name,
        quantity: item.quantity,
        type: AscensionItemType[idxTyped],
      }
    })
  }

  if (kind !== 'Ascension') {
    talentItems = items.map((item, idx) => {
      const idxTyped = Zod.number().min(0).max(3).parse(idx) as 0 | 1 | 2 | 3

      return {
        name: item.name,
        quantity: item.quantity,
        type: TalentItemType[idxTyped],
      }
    })
  }

  await CharacterModel.upsertTravelerInventoryLevelUp({
    kind,
    name: characterName.data,
    level: level + 1,
    characterLevel,
    accId: accId,
    // @ts-ignore
    data: {
      ascension: kind === 'Ascension',
      items: kind === 'Ascension' ? ascensionItems : talentItems,
    },
  })

  return null
}

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
  characterLevel,
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
  characterLevel?: number
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

      <div className="mt-1 items-center gap-4 space-y-2 text-gray-11 sm:flex sm:space-y-0">
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
        <RemixReact.Form method="post">
          {isAscension && characterLevel ? (
            <>
              <label
                htmlFor="character-level"
                className="block text-sm font-medium text-gray-12"
              >
                Level <span className="text-sm text-gray-11">*</span>
              </label>
              <div className="mt-1 flex gap-2">
                <input
                  id="character-level"
                  type="number"
                  name="characterLevel"
                  className="block w-full rounded-md border-gray-7 bg-gray-3 p-2 shadow-sm focus:border-primary-8 focus:ring-gray-8 sm:text-sm"
                  defaultValue={characterLevel}
                  min={1}
                  max={90}
                />
                <Button
                  name="kind"
                  value={heading}
                  type="submit"
                  disabled={busy || !possibleToLevel}
                  className="min-w-fit"
                >
                  {busy ? 'Leveling up...' : 'Level Up'}
                </Button>
              </div>
            </>
          ) : (
            <Button
              name="kind"
              value={heading}
              type="submit"
              disabled={busy || !possibleToLevel}
            >
              {busy ? 'Leveling up...' : 'Level Up'}
            </Button>
          )}
          <input type="hidden" name="level" value={level} />
          <input type="hidden" name="items" value={JSON.stringify(items)} />
        </RemixReact.Form>
      </div>
    </div>
  )
}
