// https://epicreact.dev/how-react-uses-closures-to-avoid-bugs/

import * as React from 'react'

function debounce(fn: (...args: any[]) => void, delay: number) {
  let timer: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}

export default function useDebounce(
  callback: (...args: any[]) => void,
  delay: number
) {
  const callbackRef = React.useRef(callback)
  React.useEffect(() => {
    callbackRef.current = callback
  })
  return React.useMemo(
    () => debounce((...args) => callbackRef.current(...args), delay),
    [delay]
  )
}
