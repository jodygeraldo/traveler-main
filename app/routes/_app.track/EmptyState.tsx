import * as RemixReact from '@remix-run/react'
import * as Icon from '~/components/Icon'

export default function EmptyState() {
  return (
    <RemixReact.Link
      data-testid="empty-state"
      to="./add"
      className="relative block w-full rounded-lg border-2 border-dashed border-gray-7 p-12 text-center hover:border-primary-8 focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2 focus:ring-offset-gray-1"
    >
      <Icon.Outline
        name="bookmark"
        className="mx-auto h-12 w-12 text-gray-8"
        aria-hidden
      />
      <span className="mt-2 block text-sm font-medium text-gray-12">
        Track a character
      </span>
    </RemixReact.Link>
  )
}
