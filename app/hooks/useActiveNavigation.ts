import { useLocation, useResolvedPath } from '@remix-run/react'

export function useActiveNavigation(to: string) {
  const { pathname } = useLocation()
  return useResolvedPath(to).pathname === pathname
}
