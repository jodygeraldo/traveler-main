import { Link, Outlet } from '@remix-run/react'
import clsx from 'clsx'
import { useActiveNavigation } from '~/hooks/useActiveNavigation'

export default function InventoryLayout() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="hidden lg:col-span-2 lg:block">
          <nav aria-label="Sidebar" className="sticky top-6">
            <Sidebar />
          </nav>
        </div>
        <main className="lg:col-span-10">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

function Sidebar() {
  const navigation = [
    { name: 'All', to: '.', active: useActiveNavigation('.') },
    { name: 'Common', to: './common', active: useActiveNavigation('./common') },
    {
      name: 'Ascension Gem',
      to: './ascension-gem',
      active: useActiveNavigation('./ascension-gem'),
    },
    {
      name: 'Ascension Boss',
      to: './ascension-boss',
      active: useActiveNavigation('./ascension-boss'),
    },
    {
      name: 'Local Specialty',
      to: './local-specialty',
      active: useActiveNavigation('./local-specialty'),
    },
    {
      name: 'Talent Book',
      to: './talent-book',
      active: useActiveNavigation('./talent-book'),
    },
    {
      name: 'Talent Boss',
      to: './talent-boss',
      active: useActiveNavigation('./talent-boss'),
    },
    {
      name: 'Special',
      to: './special',
      active: useActiveNavigation('./special'),
    },
  ]

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <Link
          prefetch="intent"
          key={item.name}
          to={item.to}
          className={clsx(
            item.active
              ? 'bg-gray-3 text-gray-12'
              : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
            'flex items-center rounded-md px-3 py-2 text-sm font-medium'
          )}
          aria-current={item.active ? 'page' : undefined}
        >
          <span className="truncate">{item.name}</span>
        </Link>
      ))}
    </nav>
  )
}
