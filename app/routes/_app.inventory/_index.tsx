import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Utils from '~/utils'

export default function InventoryLayout() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-12 lg:col-span-2">
          <nav aria-label="Sidebar" className="sticky top-6">
            <Sidebar />
          </nav>
        </div>
        <main className="mt-8 lg:mt-0 lg:col-span-10">
          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  const navigation = [
    { name: 'All', to: '.', active: Utils.useActiveNavigation('.') },
    {
      name: 'Common',
      to: './common',
      active: Utils.useActiveNavigation('./common'),
    },
    {
      name: 'Ascension Gem',
      to: './ascension-gem',
      active: Utils.useActiveNavigation('./ascension-gem'),
    },
    {
      name: 'Ascension Boss',
      to: './ascension-boss',
      active: Utils.useActiveNavigation('./ascension-boss'),
    },
    {
      name: 'Local Specialty',
      to: './local-specialty',
      active: Utils.useActiveNavigation('./local-specialty'),
    },
    {
      name: 'Talent Book',
      to: './talent-book',
      active: Utils.useActiveNavigation('./talent-book'),
    },
    {
      name: 'Talent Boss',
      to: './talent-boss',
      active: Utils.useActiveNavigation('./talent-boss'),
    },
    {
      name: 'Special',
      to: './special',
      active: Utils.useActiveNavigation('./special'),
    },
  ]

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <RemixReact.Link
          prefetch="intent"
          key={item.name}
          to={item.to}
          className={clsx(
            item.active
              ? 'bg-gray-3 text-gray-12'
              : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
            'flex items-center rounded-md px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
          )}
          aria-current={item.active ? 'page' : undefined}
        >
          <span className="truncate">{item.name}</span>
        </RemixReact.Link>
      ))}
    </nav>
  )
}
