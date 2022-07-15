import type * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import Sidebar from './Sidebar'

export const meta: RemixNode.MetaFunction = () => ({
  title: `Inventory - Traveler Main`,
  description: `Inventory system to help you track what you need farm to max out everything`,
})

export default function InventoryLayout() {
  return (
    <div className="py-10">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
        <div className="col-span-12 lg:col-span-2">
          <nav aria-label="Sidebar" className="sticky top-6">
            <Sidebar />
          </nav>
        </div>
        <main className="mt-8 lg:col-span-10 lg:mt-0">
          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
