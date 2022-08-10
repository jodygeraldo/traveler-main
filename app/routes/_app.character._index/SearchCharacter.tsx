import * as RemixReact from '@remix-run/react'
import * as Icon from '~/components/Icon'
import useDebounce from '~/hooks/useDebounce'

export default function SearchCharacter() {
  const [searchParams, setSearchParams] = RemixReact.useSearchParams()

  function handleSearchChange(q: string) {
    const newSearchParams = new URLSearchParams(searchParams)
    if (newSearchParams.has('q') && q === '') {
      newSearchParams.delete('q')
    } else {
      newSearchParams.set('q', q)
    }

    setSearchParams(newSearchParams)
  }

  const debouncedSearchChangeHandler = useDebounce(handleSearchChange, 200)

  return (
    <>
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className="relative rounded-md shadow-sm">
        <div
          className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
          aria-hidden="true"
        >
          <Icon.Solid
            name="search"
            className="mr-3 h-4 w-4 text-gray-8"
            aria-hidden="true"
          />
        </div>
        <input
          type="text"
          id="search"
          defaultValue={searchParams.get('q') || ''}
          onChange={(e) => debouncedSearchChangeHandler(e.target.value)}
          className="block w-full rounded-md border-gray-7 bg-gray-3 pl-9 focus:border-primary-9 focus:outline-none focus:ring-primary-9 disabled:bg-gray-6 sm:text-sm"
          placeholder="Search for a character"
        />
      </div>
    </>
  )
}
