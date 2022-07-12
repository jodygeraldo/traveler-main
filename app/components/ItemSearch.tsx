import * as React from 'react'
import { IconSolid } from './Icon'

interface Props {
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ItemSearch = React.forwardRef<HTMLInputElement, Props>(
  ({ changeHandler }, ref) => {
    return (
      <>
        <label htmlFor="search" className="sr-only">
          Search
        </label>
        <div className="relative mt-1 rounded-md shadow-sm">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
            aria-hidden="true"
          >
            <IconSolid
              name="search"
              className="mr-3 h-4 w-4 text-gray-8"
              aria-hidden="true"
            />
          </div>
          <input
            ref={ref}
            type="text"
            name="search"
            id="search"
            onChange={changeHandler}
            className="block w-full rounded-md border-gray-7 bg-gray-3 pl-9 focus:border-primary-9 focus:outline-none focus:ring-primary-9 sm:text-sm"
            placeholder="Search"
          />
        </div>
      </>
    )
  }
)
ItemSearch.displayName = 'ItemSearch'

export default ItemSearch
