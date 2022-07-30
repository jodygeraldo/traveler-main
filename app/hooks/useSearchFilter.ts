import * as React from 'react'
import useDebounce from './useDebounce'

/**
 *
 * @param {array} items - Array of item to filter.
 * @param {string} searchBy - Keyof the item to filter.
 * @param {number} delay - Time to wait before filtering.
 * @throws Will throw an error if the items[searchBy] not returning string.
 * @returns items
 */
export default function useSearchFilter<T, U extends keyof T>({
  items,
  searchBy,
  delay = 200,
}: {
  items: T[]
  searchBy: U
  delay?: number
}) {
  if (items.length > 0 && typeof items[0][searchBy] !== 'string') {
    throw new Error(`items[${searchBy.toString()}] not returning string.`)
  }

  const [searchItems, setSearchItems] = React.useState<T[]>([])
  const [showSearch, setShowSearch] = React.useState(false)

  function changeHandler(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.target.value === '') return setShowSearch(false)
    const newSearchItems = items.filter((item) => {
      // I'm not good with typescript, any help would be great here.
      // basically, I want to make sure that the return type of T[U] is a string
      const searchValue = item[searchBy] as unknown
      return (searchValue as string)
        .toLowerCase()
        .includes(e.target.value.toLowerCase())
    })
    setSearchItems(newSearchItems)
    setShowSearch(true)
  }

  const debouncedChangeHandler = useDebounce(changeHandler, delay)

  return {
    searchItems,
    showSearch,
    changeHandler: debouncedChangeHandler,
  }
}
