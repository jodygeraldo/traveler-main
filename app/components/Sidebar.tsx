import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'

interface Props {
  navigation: {
    name: string
    to: string
  }[]
}

export default function Sidebar({ navigation }: Props) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <RemixReact.NavLink
          prefetch="intent"
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            clsx(
              isActive
                ? 'bg-gray-3 text-gray-12'
                : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
              'flex items-center rounded-md px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
            )
          }
        >
          <span className="truncate">{item.name}</span>
        </RemixReact.NavLink>
      ))}
    </nav>
  )
}
