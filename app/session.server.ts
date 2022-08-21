import * as RemixNode from '@remix-run/node'
import dotenv from 'dotenv'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as DB from '~/db.server'
import * as UserModel from '~/models/user.server'

dotenv.config()
invariant(process.env.SESSION_SECRET, 'SESSION_SECRET must be set')

export const sessionStorage = RemixNode.createCookieSessionStorage({
  cookie: {
    name: '__session',
    httpOnly: true,
    maxAge: 0,
    path: '/',
    sameSite: 'lax',
    secrets: [process.env.SESSION_SECRET],
    secure: process.env.NODE_ENV === 'production',
  },
})

const USER_SESSION_KEY = 'userId'
const USER_ROLE_KEY = 'role'
const ACCOUNT_SESSION_KEY = 'accountId'

export async function getSession(request: Request) {
  const cookie = request.headers.get('Cookie')
  return sessionStorage.getSession(cookie)
}

export async function getUserId(request: Request): Promise<string | undefined> {
  const session = await getSession(request)
  const userId = session.get(USER_SESSION_KEY)
  return userId
}

export async function getUserRole(
  request: Request
): Promise<DB.Role | undefined> {
  const session = await getSession(request)
  const userRole = session.get(USER_ROLE_KEY)
  return Zod.nativeEnum(DB.Role).optional().parse(userRole)
}

export async function getAccountId(
  request: Request
): Promise<string | undefined> {
  const session = await getSession(request)
  const accountId = session.get(ACCOUNT_SESSION_KEY)
  return accountId
}

export async function getUser(request: Request): Promise<{
  id: string
  email: string
  role: DB.Role
  accounts: {
    id: string
    name: string
    server: DB.Server
  }[]
} | null> {
  const userId = await getUserId(request)
  if (userId === undefined) return null

  const user = await UserModel.getUserById(userId)
  if (user) return user

  throw await logout(request)
}

export async function requireUserId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
): Promise<string> {
  const userId = await getUserId(request)
  if (!userId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw RemixNode.redirect(`/login?${searchParams}`)
  }
  return userId
}

export async function requireUserRole(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
): Promise<DB.Role> {
  const userId = await requireUserId(request)
  const userRole = await getUserRole(request)
  if (!userRole && userId) {
    const session = await getSession(request)
    session.set(USER_ROLE_KEY, 'USER')
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw RemixNode.redirect(`/login?${searchParams}`, {
      headers: {
        'Set-Cookie': await sessionStorage.commitSession(session),
      },
    })
  }

  if (!userRole) {
    const session = await getSession(request)
    session.set(USER_ROLE_KEY, 'USER')
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw RemixNode.redirect(`/login?${searchParams}`)
  }

  return userRole
}

export async function requireAccountId(
  request: Request,
  redirectTo: string = new URL(request.url).pathname
): Promise<string> {
  const accountId = await getAccountId(request)
  if (!accountId) {
    const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
    throw RemixNode.redirect(`/login?${searchParams}`)
  }
  return accountId
}

export async function requireUser(request: Request): Promise<{
  id: string
  email: string
  role: DB.Role
  accounts: {
    id: string
    name: string
    server: DB.Server
  }[]
}> {
  const userId = await requireUserId(request)

  const user = await UserModel.getUserById(userId)
  if (user) return user

  throw await logout(request)
}

export async function createUserSession({
  request,
  userId,
  accountId,
  role,
  remember,
  redirectTo,
}: {
  request: Request
  userId: string
  accountId: string
  role: DB.Role
  remember: boolean
  redirectTo: string
}): Promise<Response> {
  const session = await getSession(request)
  session.set(USER_SESSION_KEY, userId)
  session.set(USER_ROLE_KEY, role)
  session.set(ACCOUNT_SESSION_KEY, accountId)
  return RemixNode.redirect(redirectTo, {
    headers: {
      'Set-Cookie': await sessionStorage.commitSession(session, {
        // 3 months
        maxAge: remember ? 60 * 60 * 24 * 30 * 3 : undefined,
      }),
    },
  })
}

export async function logout(request: Request): Promise<Response> {
  const session = await getSession(request)
  return RemixNode.redirect('/', {
    headers: {
      'Set-Cookie': await sessionStorage.destroySession(session),
    },
  })
}
