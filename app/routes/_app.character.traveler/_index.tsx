import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as RemixImage from 'remix-image'

export default function TravelerLayout() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div className="hidden lg:col-span-2 lg:block">
        <nav aria-label="Sidebar" className="sticky top-6">
          <Sidebar />
        </nav>
      </div>
      <main className="lg:col-span-10">
        <RemixReact.Outlet />
      </main>
    </div>
  )
}

function Sidebar() {
  const navigation = [
    { name: 'Anemo', to: './anemo' },
    { name: 'Geo', to: './geo' },
    { name: 'Electro', to: './electro' },
  ]

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <RemixReact.NavLink
          prefetch="intent"
          key={item.name}
          to={item.to}
          className={({ isActive }) =>
            clsx(
              isActive
                ? 'bg-gray-3 text-gray-12'
                : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
              'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium focus:z-10 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-gray-7'
            )
          }
        >
          <span className="truncate">{item.name}</span>
          <RemixImage.Image
            src={`/image/element/${item.name}.png`}
            alt=""
            className="h-4 w-4"
            aria-hidden
            responsive={[{ size: { width: 16, height: 16 } }]}
            dprVariants={[1, 2, 3]}
          />
        </RemixReact.NavLink>
      ))}
    </nav>
  )
}
