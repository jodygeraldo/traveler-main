import { useLocation, useMatches, useResolvedPath } from '@remix-run/react'
import { useMemo } from 'react'

import type { User } from './db.server'

export type depromisify<T> = T extends Promise<infer U> ? U : T

const DEFAULT_REDIRECT = '/'

/**
 * This should be used any time the redirect path is user-provided
 * (Like the query string on our login/signup pages). This avoids
 * open-redirect vulnerabilities.
 * @param {string} to The redirect destination
 * @param {string} defaultRedirect The redirect to use if the to is unsafe.
 */
export function safeRedirect(
  to: FormDataEntryValue | string | null | undefined,
  defaultRedirect: string = DEFAULT_REDIRECT
) {
  if (!to || typeof to !== 'string') {
    return defaultRedirect
  }

  if (!to.startsWith('/') || to.startsWith('//')) {
    return defaultRedirect
  }

  return to
}

/**
 * This base hook is used in other hooks to quickly search for specific data
 * across all loader data using useMatches.
 * @param {string} id The route id
 * @returns {JSON|undefined} The router data or undefined if not found
 */
export function useMatchesData(id: string): Record<string, unknown> | undefined {
  const matchingRoutes = useMatches()
  const route = useMemo(() => matchingRoutes.find((route) => route.id === id), [matchingRoutes, id])
  return route?.data
}

function isUser(user: any): user is User {
  return user && typeof user === 'object' && typeof user.email === 'string'
}

export function useOptionalUser(): User | undefined {
  const data = useMatchesData('root')
  if (!data || !isUser(data.user)) {
    return undefined
  }
  return data.user
}

export function useUser(): User {
  const maybeUser = useOptionalUser()
  if (!maybeUser) {
    throw new Error(
      'No user found in root loader, but user is required by useUser. If user is optional, try useOptionalUser instead.'
    )
  }
  return maybeUser
}

export function useActiveNavigation(to: string): boolean {
  const { pathname } = useLocation()
  return useResolvedPath(to).pathname === pathname
}

export function validateEmail(email: unknown): email is string {
  return typeof email === 'string' && email.length > 3 && email.includes('@')
}

export function getImageSrc(str: string): string {
  return str.replace(/ /g, '_').toLowerCase()
}

export function toSnakeCase(str: string): string {
  return str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)!
    .map((x) => x.toLowerCase())
    .join('_')
}

export function toCapitalized(str: string): string {
  return str.replace(/_/g, ' ').replace(/\b\w/g, (x) => x.toUpperCase())
}

export function splitPerCapitalCase(str: string): string {
  return str.split(/(?=[A-Z])/g).join(' ')
}
