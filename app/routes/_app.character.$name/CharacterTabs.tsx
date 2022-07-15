import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as Utils from '~/utils'

export default function CharacterTabs() {
  const navigate = RemixReact.useNavigate()

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
      <div className="sm:hidden">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-7 bg-gray-3 text-gray-11 focus:border-gray-8 focus:text-gray-12 focus:ring-gray-8"
          defaultValue={tabs.find((tab) => tab.active)?.name}
          onChange={(e) =>
            navigate(
              `./${e.target.value === tabs[0].name ? '.' : e.target.value}`
            )
          }
        >
          {tabs.map((tab) => (
            <option key={tab.name}>{tab.name}</option>
          ))}
        </select>
      </div>
      <div className="hidden sm:block">
        <div className="border-b border-gray-6">
          <nav className="-mb-px flex" aria-label="Tabs">
            {tabs.map((tab) => (
              <RemixReact.Link
                prefetch="intent"
                key={tab.name}
                to={tab.to}
                className={clsx(
                  tab.active
                    ? 'border-primary-8 text-primary-11'
                    : 'border-transparent text-gray-11 hover:border-gray-7 hover:text-gray-12',
                  'w-1/3 border-b-2 py-2 px-1 text-center text-sm font-medium'
                )}
                aria-current={tab.active ? 'page' : undefined}
              >
                {tab.name}
              </RemixReact.Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
