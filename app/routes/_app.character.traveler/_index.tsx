import { Link, Outlet } from '@remix-run/react'
import clsx from 'clsx'
import Image, { MimeType } from 'remix-image'
import { useActiveNavigation } from '~/utils'

export default function TravelerLayout() {
  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-12 lg:gap-8 lg:px-8">
      <div className="hidden lg:col-span-2 lg:block">
        <nav aria-label="Sidebar" className="sticky top-6">
          <Sidebar />
        </nav>
      </div>
      <main className="lg:col-span-10">
        <Outlet />
      </main>
    </div>
  )
}

function Sidebar() {
  const navigation = [
    { name: 'Anemo', to: './anemo', active: useActiveNavigation('./anemo') },
    { name: 'Geo', to: './geo', active: useActiveNavigation('./geo') },
    { name: 'Electro', to: './electro', active: useActiveNavigation('./electro') },
  ]

  return (
    <nav className="space-y-1" aria-label="Sidebar">
      {navigation.map((item) => (
        <Link
          prefetch="intent"
          key={item.name}
          to={item.to}
          className={clsx(
            item.active
              ? 'bg-gray-3 text-gray-12'
              : 'text-gray-11 hover:bg-gray-2 hover:text-gray-12',
            'flex items-center justify-between rounded-md px-3 py-2 text-sm font-medium'
          )}
          aria-current={item.active ? 'page' : undefined}
        >
          <span className="truncate">{item.name}</span>
          <Image
            src={`/image/element/${item.name}.png`}
            alt=""
            className="h-4 w-4"
            aria-hidden
            responsive={[{ size: { width: 16, height: 16 } }]}
            options={{ contentType: MimeType.WEBP }}
            dprVariants={[1, 2, 3]}
          />
        </Link>
      ))}
    </nav>
  )
}
