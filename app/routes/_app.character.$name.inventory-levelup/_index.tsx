import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import Notification from '~/components/Notification'
import Tooltip from '~/components/Tooltip'
import * as CharacterData from '~/data/characters'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import * as CharacterModel from '~/models/character.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export const meta: RemixNode.MetaFunction = ({ params }) => ({
  title: `${params.name} Inventory Level Up - Traveler Main`,
  description: `Help you set ${params.name} progression with inventory system integration`,
})

const ParamsSchema = Zod.object({
  intent: Zod.enum(['level', 'requiredLevel']),
  characterLevel: Zod.number().min(1).max(90).optional(),
  kind: Zod.enum([
    'Ascension',
    'Talent Normal Attack',
    'Talent Elemental Skill',
    'Talent Elemental Burst',
  ]).optional(),
  materials: Zod.string().optional(),
})

interface ActionData {
  success: boolean
}

export async function action({ params, request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)
  const { name } = params
  invariant(name)

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { intent, characterLevel, kind } = result.data

  if (intent === 'requiredLevel') {
    await CharacterModel.upsertCharacter({
      name,
      progression: { level: characterLevel ?? 1 },
      accountId,
    })
  }

  if (intent === 'level') {
    invariant(kind)
    const MaterialSchema = Zod.array(
      Zod.object({
        name: Zod.string(),
        quantity: Zod.number(),
        rarity: Zod.number(),
        type: Zod.nativeEnum(DB.ItemType),
      })
    )

    const materials = MaterialSchema.parse(
      JSON.parse(result.data.materials ?? '')
    )
    await CharacterModel.updateCharacterByInventory({
      name,
      kind,
      level: characterLevel,
      materials,
      accountId,
    })
  }

  return RemixNode.json<ActionData>({ success: true })
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)
  const { name } = params
  invariant(name)

  const fullItemNames = CharacterData.getItemsToRetrieve(name)

  const [userCharacter, userItems] = await Promise.all([
    CharacterModel.getUserCharacter({ name, accountId }),
    InventoryModel.getRequiredItems({ itemNames: fullItemNames, accountId }),
  ])

  const fullItems = ItemData.getItemsByNames({
    names: fullItemNames,
    userItems,
  })
  const unlock = CharacterData.getUnlock(userCharacter?.ascension ?? 0)

  const data = CharacterData.getCharacterInventoryLevelUpData({
    name,
    progression: userCharacter,
    itemNames: fullItemNames,
    userItems: fullItems,
  })

  const ascend = CharacterData.checkAscend({
    ascension: userCharacter?.ascension,
    level: userCharacter?.level,
  })

  return RemixNode.json({
    progression: userCharacter,
    unlock,
    data,
    ascend,
  })
}

export default function TravelerInventoryLevelupPage() {
  const { progression, unlock, data, ascend } =
    RemixReact.useLoaderData<typeof loader>()
  const actionData = RemixReact.useActionData<ActionData>()

  const { items, material, possibleToLevel } = data

  const useTransition = RemixReact.useTransition()
  const busy = useTransition.state === 'submitting'

  const location = RemixReact.useLocation()

  if (items.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-lg font-medium leading-6 text-gray-12">
          Your character is already on max level
        </p>
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-8">
      <ul className="flex flex-wrap gap-2">
        {items.map((item) => (
          <ItemWithImage key={item.name} item={item} />
        ))}
      </ul>

      {ascend.isAbleToAscend ? (
        <InventoryLevelUpForm
          heading="Ascension"
          materials={material.ascension}
          inventoryItems={items}
          progressionLevel={progression?.ascension ?? 0}
          possibleToLevel={possibleToLevel.ascension ? true : false}
          isAscension={true}
          characterLevel={progression?.level ?? 1}
          unlockable={unlock}
          busy={busy}
        />
      ) : (
        <div>
          <h2 className="inline-flex items-center gap-1 text-xl font-semibold text-gray-12">
            Ascension {progression?.ascension ?? 0}{' '}
            <span className="sr-only">To</span>
            <Icon.Solid
              name="arrowSmRight"
              aria-hidden
              className="inline h-4 w-4"
            />
            {progression?.ascension ?? 0 + 1}
          </h2>

          <p className="mt-1 text-gray-11">
            Required character to{' '}
            <span className="bold">{ascend.requiredLevel}</span>.
          </p>

          <RemixReact.Form method="post" replace={true}>
            <input
              type="hidden"
              name="characterLevel"
              value={ascend.requiredLevel}
            />
            <Button
              name="intent"
              value="requiredLevel"
              type="submit"
              disabled={busy || !possibleToLevel}
              className="mt-1"
            >
              {busy ? 'Progressing...' : 'Level up to required level'}
            </Button>
          </RemixReact.Form>
        </div>
      )}

      <InventoryLevelUpForm
        heading="Talent Normal Attack"
        materials={material.talent.normal}
        inventoryItems={items}
        progressionLevel={progression?.normalAttack ?? 1}
        possibleToLevel={possibleToLevel.normalAttack ? true : false}
        busy={busy}
      />

      <InventoryLevelUpForm
        heading="Talent Elemental Skill"
        materials={material.talent.elementalSkill}
        inventoryItems={items}
        progressionLevel={progression?.elementalSkill ?? 1}
        possibleToLevel={possibleToLevel.elementalSkill ? true : false}
        busy={busy}
      />

      <InventoryLevelUpForm
        heading="Talent Elemental Burst"
        materials={material.talent.elementalBurst}
        inventoryItems={items}
        progressionLevel={progression?.elementalBurst ?? 1}
        possibleToLevel={possibleToLevel.elementalBurst ? true : false}
        busy={busy}
      />

      <Notification key={location.key} success={actionData?.success} />
    </div>
  )
}

const backgroundImage: Record<1 | 2 | 3 | 4 | 5, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

function ItemWithImage({
  item,
  items,
}: {
  item: ItemData.ItemWithQuantity
  items?: ItemData.ItemWithQuantity[]
}) {
  const correspondingItem = items?.find((i) => i.name === item.name)
  const correspondingItemQuantity =
    (correspondingItem && correspondingItem.quantity) ?? 0
  const itemQuantity = item.quantity ?? 0

  return (
    <li key={item.name}>
      <Tooltip text={item.name}>
        <div
          className={clsx(
            correspondingItem
              ? correspondingItemQuantity >= itemQuantity
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
            <Image
              src={`/item/${Utils.getImageSrc(item.name)}.png`}
              alt={item.name}
              className="h-16 w-16 rounded-br-2xl"
              width={64}
              height={64}
            />
          </div>
          <div className="text-center">
            <span className="sr-only">Quantity {item.quantity}</span>
            <p className="text-sm text-gray-11" aria-hidden>
              {item.quantity ?? 0}
            </p>
          </div>
        </div>
      </Tooltip>
    </li>
  )
}

interface Props {
  heading: string
  progressionLevel: number
  materials: ItemData.ItemWithQuantity[] | undefined
  inventoryItems: ItemData.ItemWithQuantity[]
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
  busy: boolean
}

function InventoryLevelUpForm({
  heading,
  progressionLevel,
  characterLevel,
  materials,
  inventoryItems,
  isAscension,
  unlockable,
  busy,
  possibleToLevel,
}: Props) {
  if (!materials) {
    return null
  }

  return (
    <div>
      <h2 className="inline-flex items-center gap-1 text-xl font-semibold text-gray-12">
        {heading} {progressionLevel} <span className="sr-only">To</span>
        <Icon.Solid
          name="arrowSmRight"
          aria-hidden
          className="inline h-4 w-4"
        />
        {progressionLevel + 1}
      </h2>

      <div className="mt-1 items-center gap-4 space-y-2 text-gray-11 sm:flex sm:space-y-0">
        <ul className="flex flex-wrap gap-2">
          {materials.map((material) => (
            <ItemWithImage
              key={material.name}
              item={material}
              items={inventoryItems}
            />
          ))}
        </ul>
        {isAscension && unlockable ? (
          <div>
            <p className="font-medium">Unlock: </p>
            <ul>
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

              {unlockable.talent.to !== 1 ? (
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
        <RemixReact.Form method="post" replace={true}>
          <input type="hidden" name="kind" value={heading} />
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
                  name="intent"
                  value="level"
                  type="submit"
                  disabled={busy || !possibleToLevel}
                  className="min-w-fit"
                >
                  {busy ? 'Ascending...' : 'Ascend'}
                </Button>
              </div>
            </>
          ) : (
            <Button
              name="intent"
              value="level"
              type="submit"
              disabled={busy || !possibleToLevel}
            >
              {busy ? 'progressing...' : 'Level up'}
            </Button>
          )}
          <input
            type="hidden"
            name="materials"
            value={JSON.stringify(materials)}
          />
        </RemixReact.Form>
      </div>
    </div>
  )
}
