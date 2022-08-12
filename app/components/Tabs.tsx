import * as RemixReact from '@remix-run/react';
import clsx from 'clsx';

type Props = {
  tabs: { name: string; to: string }[]
}

const tabSize: Record<number, string> = {
  '2': 'w-1/2',
  '3': 'w-1/3:',
  '4': 'w-1/4',
  '5': 'w-1/5',
}

export function TabsMain({ tabs }: Props) {
  const navigate = RemixReact.useNavigate()
  const { pathname } = RemixReact.useLocation()

  return (
    <div>
      <div className="px-4 sm:hidden sm:px-6 lg:px-8">
        <label htmlFor="tabs" className="sr-only">
          Select a tab
        </label>
        <select
          onChange={(e) =>
            navigate(
              tabs.find(({ name }) => name === e.target.value)?.to ?? tabs[0].to
            )
          }
          id="tabs"
          name="tabs"
          className="block w-full rounded-md border-gray-7 bg-gray-3 focus:border-primary-8 focus:ring-primary-8"
          defaultValue={
            tabs.find((tab) => tab.to === pathname)?.name ?? tabs[0].name
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
                key={tab.name}
                to={tab.to}
                prefetch="intent"
                className={({ isActive }) =>
                  clsx(
                    tabSize[tabs.length],
                    isActive
                      ? 'border-primary-11 text-primary-12'
                      : 'border-transparent text-gray-11 hover:border-gray-8 hover:text-gray-12',
                    'border-b-2 py-4 px-1 text-center text-sm font-medium'
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

export const Main = TabsMain
