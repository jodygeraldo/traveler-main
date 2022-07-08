import * as RemixReact from '@remix-run/react'
import * as Icon from '~/components/Icon'
import Button from './Button'
import ItemWithImage from './Item'

interface Props {
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
}

export default function InventoryLevelUpForm({
  heading,
  level,
  items,
  possibleToLevel,
  isAscension,
  characterLevel,
  unlockable,
  inventoryItems,
}: Props) {
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
            <ItemWithImage key={item.name} item={item} items={inventoryItems} />
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
