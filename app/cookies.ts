import { createCookie } from '@remix-run/node'
import * as Zod from 'zod'

export const userPrefs = createCookie('user-prefs', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secure: process.env.NODE_ENV === 'production',
})

const DEFAULT_VIEW = 'grid'

export async function getCharacterViewPref(
  request: Request
): Promise<'grid' | 'list'> {
  const cookie = await userPrefs.parse(request.headers.get('Cookie'))
  const result = Zod.object({
    characterView: Zod.enum(['list', 'grid']),
  }).safeParse(cookie)
  if (!result.success) {
    return DEFAULT_VIEW
  }
  return result.data.characterView
}

export async function getUserPrefsCookie(request: Request) {
  const cookie = await userPrefs.parse(request.headers.get('Cookie'))
  return cookie || {}
}
