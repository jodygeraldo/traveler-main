import * as RadixSeparator from '@radix-ui/react-separator'
import clsx from 'clsx'
import * as React from 'react'
import Image from '~/components/Image'
import Tooltip from '~/components/Tooltip'
import { getImageSrc } from '~/utils'

type Props = {
  todayFarmable: {
    character: {
      itemGroup: string
      upgradeable: string[]
    }[]
    weapon: {
      itemGroup: string
      items: string[]
      upgradeable: string[]
    }[]
  }
}

export default function Farmable({ todayFarmable }: Props) {
  const [tabs, setTabs] = React.useState([
    {
      name: 'Character',
      isActive: true,
      farmableAccessor: 'character' as const,
    },
    {
      name: 'Weapon',
      isActive: false,
      farmableAccessor: 'weapon' as const,
    },
  ])
  const [selectedTabAccessor, setSelectedTabAccessor] = React.useState(
    tabs[0].farmableAccessor
  )

  function handleTabChange(newTabName: string) {
    setTabs(
      tabs.map((tab) => ({
        ...tab,
        isActive: tab.name === newTabName,
      }))
    )
    setSelectedTabAccessor(
      tabs.find((tab) => tab.name === newTabName)!.farmableAccessor
    )
  }

  return (
    <section aria-labelledby="farmable-title" className="rounded-lg bg-gray-2">
      <h2 className="p-6 font-medium text-gray-12" id="farmable-title">
        Daily Farmable
      </h2>

      <div>
        <div className="px-4 sm:hidden sm:px-6 lg:px-8">
          <label htmlFor="tabs" className="sr-only">
            Select a tab
          </label>
          <select
            onChange={(e) => handleTabChange(e.target.value)}
            id="tabs"
            name="tabs"
            className="block w-full rounded-md border-gray-7 bg-gray-3 focus:border-primary-8 focus:ring-primary-8"
            value={tabs.find((tab) => tab.isActive)?.name}
          >
            {tabs.map((tab) => (
              <option key={tab.name}>{tab.name}</option>
            ))}
          </select>
        </div>
        <div className="hidden sm:block">
          <div
            className="relative z-0 flex divide-x divide-gray-6 rounded-t-lg shadow"
            aria-label="Tabs"
          >
            {tabs.map((tab) => (
              <button
                key={tab.name}
                onClick={() => handleTabChange(tab.name)}
                className={clsx(
                  tab.isActive
                    ? 'bg-gray-5 text-gray-12'
                    : 'bg-gray-3 text-gray-11 hover:bg-gray-4 hover:text-gray-10',
                  'group relative min-w-0 flex-1 overflow-hidden py-4 px-4 text-center text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-primary-8'
                )}
              >
                {tab.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="rounded-b-lg p-6">
        {todayFarmable[selectedTabAccessor].length > 0 ? (
          todayFarmable[selectedTabAccessor].map((farmable, idx) => (
            <React.Fragment key={farmable.itemGroup}>
              <div>
                <div className="items-center gap-2 sm:flex">
                  {'items' in farmable ? (
                    <WeaponItemsFrame items={farmable.items} />
                  ) : (
                    <CharacterItemsFrame groupName={farmable.itemGroup} />
                  )}
                  <span className="mt-1 text-sm font-medium text-gray-12 sm:mt-0">
                    {farmable.itemGroup}
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {farmable.upgradeable.map((character) => (
                    <UpgradeableFrame
                      key={`${farmable.itemGroup}-${character}`}
                      name={character}
                      type={selectedTabAccessor}
                    />
                  ))}
                </div>
              </div>

              {idx !== todayFarmable[selectedTabAccessor].length - 1 && (
                <RadixSeparator.Root className="my-4 h-px w-auto bg-gray-6" />
              )}
            </React.Fragment>
          ))
        ) : (
          <p className="text-center text-sm text-gray-11">
            You can farm everything on monday!
          </p>
        )}
      </div>
    </section>
  )
}

function CharacterItemsFrame({ groupName }: { groupName: string }) {
  const items = [
    {
      name: `Teachings of ${groupName}`,
      src: `/item/teachings_of_${getImageSrc(groupName)}.png`,
    },
    {
      name: `Guide to ${groupName}`,
      src: `/item/guide_to_${getImageSrc(groupName)}.png`,
    },
    {
      name: `Philosophies of ${groupName}`,
      src: `/item/philosophies_of_${getImageSrc(groupName)}.png`,
    },
  ]

  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <Tooltip key={item.name} text={item.name}>
          <div className="rounded-md bg-gray-3 p-2">
            <Image
              src={item.src}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

function WeaponItemsFrame({ items }: { items: string[] }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      {items.map((item) => (
        <Tooltip key={item} text={item}>
          <div className="rounded-md bg-gray-3 p-2">
            <Image
              src={`/item/${getImageSrc(item)}.png`}
              alt=""
              width={40}
              height={40}
              className="h-10 w-10"
            />
          </div>
        </Tooltip>
      ))}
    </div>
  )
}

function UpgradeableFrame({
  name,
  type,
}: {
  name: string
  type: 'character' | 'weapon'
}) {
  return (
    <Tooltip text={name}>
      <div className="rounded-md bg-gray-3 p-2">
        <Image
          src={`/${type}/${getImageSrc(name)}.png`}
          alt={name}
          width={40}
          height={40}
          className="h-10 w-10"
        />
      </div>
    </Tooltip>
  )
}
