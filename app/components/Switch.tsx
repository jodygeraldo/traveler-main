import * as HeadlessUIReact from '@headlessui/react'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'

interface Props {
  label: String
  name: string
}

export default function Switch({ label, name }: Props) {
  const [searchParams, setSearchParams] = RemixReact.useSearchParams()
  const enabled = searchParams.get(name) === 'true'

  function handleChange(state: boolean) {
    searchParams.set(name, state ? 'true' : 'false')
    setSearchParams(searchParams)
  }

  return (
    <HeadlessUIReact.Switch.Group as="div" className="flex items-center">
      <HeadlessUIReact.Switch.Label as="span" className="mr-3">
        <span className="text-sm font-medium text-gray-12">{label}</span>
      </HeadlessUIReact.Switch.Label>
      <HeadlessUIReact.Switch
        checked={enabled}
        onChange={handleChange}
        className={clsx(
          enabled ? 'bg-primary-9' : 'bg-gray-6',
          'relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-primary-7 focus:ring-offset-2 focus:ring-offset-gray-1'
        )}
      >
        <span
          aria-hidden="true"
          className={clsx(
            enabled ? 'translate-x-5' : 'translate-x-0',
            'pointer-events-none inline-block h-5 w-5 transform rounded-full bg-gray-12 shadow ring-0 transition duration-200 ease-in-out'
          )}
        />
      </HeadlessUIReact.Switch>
    </HeadlessUIReact.Switch.Group>
  )
}
