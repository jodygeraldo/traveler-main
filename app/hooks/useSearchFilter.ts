import * as React from 'react'

/**
 *
 * @param {array} items - Array of item to filter.
 * @param {string} searchBy - Keyof the item to filter.
 * @param {number} debounceTime - Time to wait before filtering.
 * @throws Will throw an error if the items[searchBy] not returning string.
 * @returns items
 */
export default function useSearchFilter<T, U extends keyof T>({
  items,
  searchBy,
  debounceTime = 200,
}: {
  items: T[]
  searchBy: U
  debounceTime?: number
}) {
  const [searchItems, setSearchItems] = React.useState<T[]>([])
  const [showSearch, setShowSearch] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timeout>()

  const changeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      const timer = setTimeout(() => {
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
      }, debounceTime)
      timerRef.current = timer
    },
    [debounceTime, items, searchBy]
  )

  return {
    searchItems,
    showSearch,
    changeHandler,
  }
}
