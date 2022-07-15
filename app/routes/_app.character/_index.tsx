import * as RemixReact from '@remix-run/react'

export default function CharacterLayout() {
  return (
    <main className="mx-auto max-w-3xl py-10 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
      <RemixReact.Outlet />
    </main>
  )
}
