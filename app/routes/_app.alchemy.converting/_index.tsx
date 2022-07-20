import type * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import Sidebar from '~/components/Sidebar'

export const meta: RemixNode.MetaFunction = () => ({
  title: `Alchemy - Traveler Main`,
  description: `Alchemy page is to help you craft or convert items like in game`,
})

const navigation = [
  { name: 'All', to: './all' },
  { name: 'Ascension Gem', to: './ascension-gem' },
  { name: 'Talent Boss', to: './talent-boss' },
]

export default function ConvertingLayout() {
  return (
    <div className="py-8">
      <div className="mx-auto max-w-3xl lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8">
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
