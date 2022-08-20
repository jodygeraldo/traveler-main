import * as RadixSelect from '@radix-ui/react-select'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Icon from '~/components/Icon'

export default function StatusSelect() {
  const [searchParams, setSearchParams] = RemixReact.useSearchParams()

  function handleStatusChange(status: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    if (status === 'ALL') {
      newSearchParams.delete('status')
    } else {
      newSearchParams.set('status', status)
    }
    setSearchParams(newSearchParams)
  }

  return (
    <RadixSelect.Root
      name="server"
      defaultValue={searchParams.get('status') || 'ALL'}
      onValueChange={handleStatusChange}
    >
      <RadixSelect.Trigger
        data-testid="server-select"
        className="flex items-center gap-4 rounded-md bg-gray-3 px-4 py-2 hover:bg-gray-4 focus:outline-none focus:ring-2 focus:ring-primary-8"
      >
        <RadixSelect.Value />
        <RadixSelect.Icon asChild>
          <Icon.Solid name="chevronDown" className="h-5 w-5 text-gray-11" />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>

      <RadixSelect.Portal>
        <RadixSelect.Content className="mx-2 mt-2 min-w-fit rounded-md bg-gray-4 p-1 shadow-lg ring-1 ring-overlay-black-1 focus:outline-none">
          <RadixSelect.ScrollUpButton />
          <RadixSelect.Viewport>
            <SelectItem value="ALL">All</SelectItem>
            <SelectItem value="PUBLISHED">Published</SelectItem>
            <SelectItem value="DRAFT">Draft</SelectItem>
            <SelectItem value="PENDING">Pending</SelectItem>
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
        'group flex w-full items-center justify-between rounded-md py-2 px-4',
        'text-left text-sm text-gray-11',
        'radix-disabled:text-gray-8',
        'radix-highlighted:bg-gray-5 radix-highlighted:text-gray-12 radix-highlighted:outline-none radix-state-open:text-gray-12'
      )}
      data-testid={`status-option-${value}`}
    >
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator>
        <Icon.Solid
          name="check"
          className="h-5 w-5 text-gray-11 group-radix-highlighted:text-gray-12"
        />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  )
}
