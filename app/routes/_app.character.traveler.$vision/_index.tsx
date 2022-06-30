import { Outlet } from '@remix-run/react'
import Tabs from '~/components/Tabs'
import { useActiveNavigation } from '~/utils'

export default function TravelerVisionLayout() {
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
      <Tabs tabs={tabs} />
      <main className="mt-8 pb-16">
        <Outlet />
      </main>
    </div>
  )
}
