import * as RemixReact from '@remix-run/react'
import AlchemyTabs from './AlchemyTabs'

export default function AlchemyLayout() {
  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Alchemy
      </h1>

      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <AlchemyTabs />
        <main className="pb-16">
          <RemixReact.Outlet />
        </main>
      </div>
    </main>
  )
}
