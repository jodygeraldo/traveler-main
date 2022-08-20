import * as React from 'react'

type Props = {
  title: string
  children?: React.ReactNode
}

export default function PageHeading({ title, children }: Props) {
  return (
    <div className="min-h-[4.5rem] border-b border-gray-6 px-4 py-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:bg-gray-2 lg:px-8">
      <div className="min-w-0 flex-1">
        <h1 className="text-lg font-medium leading-6 text-gray-12 sm:truncate">
          {title}
        </h1>
      </div>
      {children && <div className="mt-4 sm:mt-0 sm:ml-4">{children}</div>}
    </div>
  )
}
