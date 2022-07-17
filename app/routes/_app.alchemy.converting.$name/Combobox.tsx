import * as HeadlessUIReact from '@headlessui/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import type * as ItemData from '~/data/items'
import * as Utils from '~/utils'

interface Props {
  options: {
    name: ItemData.ItemWithQuantity['name']
    rarity: ItemData.ItemWithQuantity['rarity']
    quantity: {
      owned: number
      required: number
    }
  }[]
}

export default function Combobox({ options }: Props) {
  const [query, setQuery] = React.useState('')
  const [selectedOption, setSelectedOption] = React.useState()

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) => {
          return option.name.toLowerCase().includes(query.toLowerCase())
        })

  return (
    <HeadlessUIReact.Combobox
      as="div"
      value={selectedOption}
      onChange={setSelectedOption}
    >
      <HeadlessUIReact.Combobox.Label className="sr-only">
        Convert with
      </HeadlessUIReact.Combobox.Label>
      <div className="relative">
        <HeadlessUIReact.Combobox.Input
          className="w-full rounded-md border border-gray-6 bg-gray-2 py-2 pl-3 pr-10 shadow-sm focus:border-primary-8 focus:outline-none focus:ring-1 focus:ring-primary-8 sm:text-sm"
          placeholder="Item to use"
          onChange={(event) => setQuery(event.target.value)}
          //   @ts-ignore
          displayValue={(person) => person?.name}
        />
        <HeadlessUIReact.Combobox.Button className="absolute inset-y-0 right-0 flex items-center rounded-r-md px-2 focus:outline-none">
          <Icon.Solid
            name="selector"
            className="h-5 w-5 text-gray-10"
            aria-hidden="true"
          />
        </HeadlessUIReact.Combobox.Button>

        {filteredOptions.length > 0 && (
          <HeadlessUIReact.Combobox.Options className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-gray-2 py-1 text-base shadow-lg ring-1 ring-gray-12 ring-opacity-5 focus:outline-none sm:text-sm">
            {filteredOptions.map((option) => (
              <HeadlessUIReact.Combobox.Option
                key={option.name}
                value={option}
                className={({ active }) =>
                  clsx(
                    'relative cursor-default select-none py-2 pl-3 pr-9',
                    active ? 'bg-primary-9 text-white' : 'text-gray-11'
                  )
                }
              >
                {({ active, selected }) => (
                  <>
                    <div className="flex items-center">
                      <Image
                        src={`/item/${Utils.getImageSrc(option.name)}.png`}
                        alt=""
                        width={32}
                        height={32}
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={clsx(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {option.name}
                      </span>
                      <span
                        className={clsx(
                          'ml-2 text-gray-11',
                          active ? 'text-white' : 'text-gray-11'
                        )}
                      >
                        @{option.quantity.owned}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-gray-12' : 'text-primary-9'
                        )}
                      >
                        <Icon.Solid
                          name="check"
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </span>
                    )}
                  </>
                )}
              </HeadlessUIReact.Combobox.Option>
            ))}
          </HeadlessUIReact.Combobox.Options>
        )}
      </div>
    </HeadlessUIReact.Combobox>
  )
}
