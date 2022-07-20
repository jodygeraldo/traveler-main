import type * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import Sidebar from '~/components/Sidebar'

export const meta: RemixNode.MetaFunction = () => ({
  title: `Inventory - Traveler Main`,
  description: `Inventory system to help you track what you need farm to max out everything`,
})

export default function InventoryLayout() {
  const navigation = [
    { name: 'All', to: './all' },
    {
      name: 'Common',
      to: './common',
    },
    {
      name: 'Ascension Gem',
      to: './ascension-gem',
    },
    {
      name: 'Ascension Boss',
      to: './ascension-boss',
    },
    {
      name: 'Local Specialty',
      to: './local-specialty',
    },
    {
      name: 'Talent Book',
      to: './talent-book',
    },
    {
      name: 'Talent Boss',
      to: './talent-boss',
    },
    {
      name: 'Special',
      to: './special',
    },
  ]

  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-12 lg:col-span-2">
          <nav aria-label="Sidebar" className="sticky top-6">
            <Sidebar navigation={navigation} />
          </nav>
        </div>
        <main className="mt-8 lg:col-span-10 lg:mt-0">
          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
