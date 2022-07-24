import * as React from 'react'
import Search from '~/components/Search'

interface Props {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
  children: React.ReactNode
}

export default function Container({ changeHandler, children }: Props) {
  return (
    <div className="space-y-12">
      <div className="sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
          Inventory
        </h1>

        <div className="mt-2 sm:mt-0">
          <Search changeHandler={changeHandler} />
        </div>
      </div>

      {children}
    </div>
  )
}
