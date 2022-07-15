import * as React from 'react'

export default function useSearchFilter<T, U extends keyof T>({
  items,
  searchBy,
  debounceTime = 200,
}: {
  items: T[]
  searchBy: U
  debounceTime?: number
}): {
  searchItems: T[]
  showSearch: boolean
  changeHandler: (event: React.ChangeEvent<HTMLInputElement>) => void
} {
  const [searchItems, setSearchItems] = React.useState<T[]>([])
  const [showSearch, setShowSearch] = React.useState(false)
  const timerRef = React.useRef<NodeJS.Timeout>()

  const changeHandler = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (timerRef.current) clearTimeout(timerRef.current)
      const timer = setTimeout(() => {
        if (e.target.value === '') return setShowSearch(false)
        const newSearchItems = items.filter((character) =>
          // I'm not good with typescript, any help would be great here.
          // basically, I want to make sure that the return type of T[U] is a string
          character[searchBy]
            // @ts-ignore
            .toLowerCase()
            .includes(e.target.value.toLowerCase())
        )
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
