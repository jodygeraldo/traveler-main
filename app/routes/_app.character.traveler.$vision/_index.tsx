import * as RemixReact from '@remix-run/react'
import * as RemixImage from 'remix-image'
import Tabs from '~/components/Tabs'
import * as Utils from '~/utils'

export default function TravelerVisionLayout() {
  const { vision } = RemixReact.useParams()

  const tabs = [
    { name: 'Required Items', to: '.', active: Utils.useActiveNavigation('.') },
    {
      name: 'Inventory Level Up',
      to: './inventory-levelup',
      active: Utils.useActiveNavigation('./inventory-levelup'),
    },
    {
      name: 'Manual Level Up',
      to: './manual-levelup',
      active: Utils.useActiveNavigation('./manual-levelup'),
    },
  ]

  return (
    <div>
      <div className="flex items-center gap-2">
        <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
          Traveler {Utils.toCapitalized(vision ?? '')}
        </h1>
        <div className="flex items-center gap-1">
          <div className="rounded-full bg-gray-2 p-1">
            <RemixImage.Image
              src="/image/constellation/Aether.png"
              alt=""
              className="h-8 w-8 flex-shrink-0"
              width={32}
              height={32}
              responsive={[{ size: { width: 32, height: 32 } }]}
              dprVariants={[1, 2, 3]}
            />
          </div>
          <div className="rounded-full bg-gray-2 p-1">
            <RemixImage.Image
              src="/image/constellation/Lumine.png"
              alt=""
              className="h-8 w-8 flex-shrink-0"
              width={32}
              height={32}
              responsive={[{ size: { width: 32, height: 32 } }]}
              dprVariants={[1, 2, 3]}
            />
          </div>
        </div>
      </div>

      <div className="mt-6 sm:mt-2 2xl:mt-5">
        <Tabs tabs={tabs} />
        <main className="pb-16">
          <RemixReact.Outlet />
        </main>
      </div>
    </div>
  )
}
