import * as RemixReact from '@remix-run/react'

export default function ConvertingLayout() {
  return (
    <div className="space-y-12">
      <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
        Alchemy Converting
      </h1>

      <div className="mt-8 lg:col-span-10 lg:mt-0">
        <RemixReact.Outlet />
      </div>
    </div>
  )
}
