import * as RadixSelect from '@radix-ui/react-select'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Icon from '~/components/Icon'
import useDailyCountdown from '~/hooks/useDailyCountdown'

export default function ServerSelect({
  server,
}: {
  server: {
    name: string
    resetIn: number
  }
}) {
  const submit = RemixReact.useSubmit()
  const { hours, minutes, seconds } = useDailyCountdown(server.resetIn)

  return (
    <RadixSelect.Root
      name="server"
      onValueChange={(value) =>
        submit({ server: value }, { method: 'post', replace: true })
      }
    >
      <RadixSelect.Trigger className="flex items-center gap-4 rounded-md bg-gray-3 px-4 py-2 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-8">
        <RadixSelect.Value asChild>
          <div className="text-sm text-gray-11">
            <span className="font-medium text-gray-12">{server.name} </span>
            <span>
              reset in {hours}:{minutes}:{seconds}
            </span>
          </div>
        </RadixSelect.Value>
        <RadixSelect.Icon asChild>
          <Icon.Solid name="chevronDown" className="h-5 w-5 text-gray-11" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="mx-2 mt-2 w-60 rounded-md bg-gray-4 p-1 shadow-lg ring-1 ring-overlay-black-1 focus:outline-none">
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport>
            <SelectItem value="NA">America</SelectItem>
            <SelectItem value="EU">Europe</SelectItem>
            <SelectItem value="ASIA">Asia</SelectItem>
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton />
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  )
}

function SelectItem({
  value,
  children,
}: {
  value: string
  children: React.ReactNode
}) {
  return (
    <RadixSelect.Item
      value={value}
      className={clsx(
        'w-full rounded-md py-2 px-4',
        'text-left text-sm text-gray-11',
        'radix-disabled:text-gray-8',
        'radix-highlighted:bg-gray-5 radix-highlighted:text-gray-12 radix-highlighted:outline-none radix-state-open:text-gray-12'
      )}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator />
    </RadixSelect.Item>
  )
}
