import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Notification from '~/components/Notification'
import * as CharacterData from '~/data/characters'
import * as ItemData from '~/data/items'
import * as DB from '~/db.server'
import * as CharacterModel from '~/models/character.server'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'
import InventoryLevelUpForm from './InventoryLevelUpForm'
import ItemWithImage from './ItemWithImage'

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
