import * as RemixReact from '@remix-run/react'
import Sidebar from '~/components/Sidebar'

const navigation = [
  {
    name: 'Crafting',
    to: './crafting',
    sub: [
      {
        name: 'All',
        to: './crafting/all',
      },
      {
        name: 'Enhancement',
        to: './crafting/enhancement',
      },
      {
        name: 'Ascension',
        to: './crafting/ascension',
      },
      {
        name: 'Talent',
        to: './crafting/talent',
      },
    ],
  },
  {
    name: 'Converting',
    to: './converting',
    sub: [
      {
        name: 'All',
        to: './converting/all',
      },
      {
        name: 'Ascension Gem',
        to: './converting/ascension-gem',
      },
      {
        name: 'Talent Boss',
        to: './converting/talent-boss',
      },
    ],
  },
]

export default function AlchemyLayout() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-12 lg:col-span-2">
          <div className="sticky top-6">
            <Sidebar navigation={navigation} />
          </div>
        </div>
        <main className="mt-8 lg:col-span-10 lg:mt-0">
          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
