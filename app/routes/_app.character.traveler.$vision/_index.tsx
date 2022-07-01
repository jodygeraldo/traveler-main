import { Outlet, useParams } from '@remix-run/react'
import Tabs from '~/components/Tabs'
import { toCapitalized, useActiveNavigation } from '~/utils'

export default function TravelerVisionLayout() {
  const { vision } = useParams()

  const tabs = [
    { name: 'Required Items', to: '.', active: useActiveNavigation('.') },
    {
      name: 'Inventory Level Up',
      to: './inventory-levelup',
      active: useActiveNavigation('./inventory-levelup'),
    },
    {
      name: 'Manual Level Up',
      to: './manual-levelup',
      active: useActiveNavigation('./manual-levelup'),
    },
  ]

  return (
    <div>
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Traveler {toCapitalized(vision ?? '')}
      </h1>

      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <Tabs tabs={tabs} />
        <main className="pb-16">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
