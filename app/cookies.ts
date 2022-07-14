import { createCookie } from '@remix-run/node'; // or "@remix-run/cloudflare"
import invariant from 'tiny-invariant';
import * as Zod from 'zod';

invariant(
  process.env.USER_PREF_COOKIE_SECRET,
  'USER_PREF_COOKIE_SECRET is not set'
)

export const userPrefs = createCookie('user-prefs', {
  httpOnly: true,
  path: '/',
  sameSite: 'lax',
  secrets: [process.env.USER_PREF_COOKIE_SECRET],
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
