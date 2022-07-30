// https://epicreact.dev/how-react-uses-closures-to-avoid-bugs/

import * as React from 'react'

export const debounce = (callback: (args: any) => void, delay: number) => {
  let timeoutId: number | null = null
  return (...args: any) => {
    if (timeoutId) {
      window.clearTimeout(timeoutId)
    }
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args)
    }, delay)
  }
}

export default function useDebounce(
  callback: (args: any) => void,
  delay: number
) {
  const callbackRef = React.useRef(callback)
  React.useLayoutEffect(() => {
    callbackRef.current = callback
  })
  return React.useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  )
}
