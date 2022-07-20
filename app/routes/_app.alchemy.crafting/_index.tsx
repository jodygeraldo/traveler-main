import type * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'

export const meta: RemixNode.MetaFunction = () => ({
  title: `Alchemy - Traveler Main`,
  description: `Alchemy page is to help you craft or convert items like in game`,
})

export default function CraftingLayout() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Alchemy Crafting
      </h1>

      <div className="mt-8 lg:col-span-10 lg:mt-0">
        <RemixReact.Outlet />
      </div>
    </div>
  )
}
