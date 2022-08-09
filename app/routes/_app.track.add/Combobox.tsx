import * as HeadlessUIReact from '@headlessui/react'
import clsx from 'clsx'
import * as React from 'react'
import Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as Utils from '~/utils'

interface Props {
  options: string[]
  defaultValue?: string
  fetchProgressionHandler: (option: string) => void
}

export default function Combobox({
  options,
  defaultValue,
  fetchProgressionHandler,
}: Props) {
  const [query, setQuery] = React.useState('')
  const [selectedOption, setSelectedOption] = React.useState(
    defaultValue ? defaultValue : options[0]
  )

  const filteredOptions =
    query === ''
      ? options
      : options.filter((option) =>
          option.toLowerCase().includes(query.toLowerCase())
        )

  const handleFetchProgression = () => fetchProgressionHandler(selectedOption)

  return (
    <HeadlessUIReact.Combobox
      as="div"
      value={selectedOption}
      onChange={setSelectedOption}
      className="px-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6 sm:py-5"
    >
      <div>
        <HeadlessUIReact.Combobox.Label className="block text-sm font-medium text-gray-12 sm:mt-px sm:pt-2">
          Character name
        </HeadlessUIReact.Combobox.Label>
      </div>
      <div className="relative mt-1 sm:col-span-2 sm:mt-0">
        <HeadlessUIReact.Combobox.Input
          className="w-full rounded-md border border-gray-7 bg-gray-2 py-2 pl-11 pr-10 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
          placeholder="Choose a character to track"
          required
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
          // @ts-ignore
          displayValue={(option) => option}
          name="name"
        />

        {selectedOption && (
          <Image
            src={`/character/${Utils.getImageSrc(selectedOption)}.png`}
            alt=""
            width={24}
            height={24}
            className="absolute top-1/2 left-3 h-6 w-6 flex-shrink-0 -translate-y-1/2 rounded-full"
          />
        )}

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
                key={option}
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
                        src={`/character/${Utils.getImageSrc(option)}.png`}
                        alt=""
                        width={24}
                        height={24}
                        className="h-6 w-6 flex-shrink-0 rounded-full"
                      />
                      <span
                        className={clsx(
                          'ml-3 truncate',
                          selected && 'font-semibold'
                        )}
                      >
                        {option}
                      </span>
                    </div>

                    {selected && (
                      <span
                        className={clsx(
                          'absolute inset-y-0 right-0 flex items-center pr-4',
                          active ? 'text-white' : 'text-primary-9'
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
      <div className="mt-4 flex justify-end sm:col-span-3 sm:mt-0 sm:justify-self-end">
        <Button onClick={handleFetchProgression} type="button" variant="info">
          Update progression
        </Button>
      </div>
    </HeadlessUIReact.Combobox>
  )
}
