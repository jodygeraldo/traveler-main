import * as RemixReact from '@remix-run/react'
import Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import type * as ItemData from '~/data/items'
import ItemWithImage from './ItemWithImage'

interface Props {
  heading: string
  progressionLevel: number
  materials:
    | Pick<ItemData.ItemWithQuantity, 'name' | 'quantity' | 'type' | 'rarity'>[]
    | undefined
  inventoryItems: Pick<
    ItemData.ItemWithQuantity,
    'name' | 'quantity' | 'type' | 'rarity'
  >[]
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

export default function InventoryLevelUpForm({
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
