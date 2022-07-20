import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'

export default function AlchemyTabs() {
  const navigate = RemixReact.useNavigate()
  const resolvedPathname = RemixReact.useResolvedPath('./crafting').pathname
  const { pathname } = RemixReact.useLocation()

  const tabs = [
    { name: 'Crafting', to: './crafting' },
    {
      name: 'Converting',
      to: './converting',
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
          defaultValue={
            resolvedPathname === pathname ? 'Crafting' : 'Converting'
          }
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
              <RemixReact.NavLink
                prefetch="intent"
                key={tab.name}
                to={tab.to}
                className={({ isActive }) =>
                  clsx(
                    isActive
                      ? 'border-primary-8 text-primary-11'
                      : 'border-transparent text-gray-11 hover:border-gray-7 hover:text-gray-12',
                    'w-1/2 border-b-2 py-2 px-1 text-center text-sm font-medium'
                  )
                }
              >
                {tab.name}
              </RemixReact.NavLink>
            ))}
          </nav>
        </div>
      </div>
    </div>
  )
}
