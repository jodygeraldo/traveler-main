import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'

interface Props {
  navigation: {
    name: string
    to: string
    sub?: {
      name: string
      to: string
    }[]
  }[]
}

export default function Sidebar({ navigation }: Props) {
  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((nav) => (
        <React.Fragment key={nav.name}>
          {!nav.sub ? (
            <RemixReact.NavLink
              prefetch="intent"
              to={nav.to}
              className={({ isActive }) =>
                clsx(
                  isActive
                    ? 'bg-gray-3 text-gray-12'
                    : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
                  'flex items-center rounded-md px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
                )
              }
            >
              <span className="truncate">{nav.name}</span>
            </RemixReact.NavLink>
          ) : (
            <RemixReact.NavLink
              prefetch="intent"
              key={nav.name}
              to={nav.to}
              className={({ isActive }) =>
                clsx(
                  isActive ? 'text-gray-12' : 'text-gray-11',
                  'pointer-events-none flex items-center rounded-md px-2 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
                )
              }
            >
              <span className="truncate">{nav.name}</span>
            </RemixReact.NavLink>
          )}
          {nav.sub &&
            nav.sub.map((subNav) => (
              <RemixReact.NavLink
                prefetch="intent"
                key={`${nav.name}-${subNav.name}`}
                to={subNav.to}
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? 'bg-gray-3 text-gray-12'
                      : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
                    'flex items-center rounded-md py-2 pl-6 pr-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
                  )
                }
              >
                <span className="truncate">{subNav.name}</span>
              </RemixReact.NavLink>
            ))}
        </React.Fragment>
      ))}
    </nav>
  )
}
