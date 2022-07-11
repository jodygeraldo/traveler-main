import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import Button from '~/components/Button'
import Logo from '~/components/Logo'
import * as UserModel from '~/models/user.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Sign up - Traveler Main',
})

export const loader: RemixNode.LoaderFunction = async ({ request }) => {
  const userId = await Session.getUserId(request)
  if (userId) return RemixNode.redirect('/')
  return RemixNode.json({})
}

interface ActionData {
  errors: {
    email?: string
    password?: string
  }
}

export const action: RemixNode.ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const email = formData.get('email')
  const password = formData.get('password')
  const redirectTo = Utils.safeRedirect(formData.get('redirectTo'), '/')

  if (!Utils.validateEmail(email)) {
    return RemixNode.json<ActionData>(
      { errors: { email: 'Email is invalid' } },
      { status: 400 }
    )
  }

  if (typeof password !== 'string') {
    return RemixNode.json<ActionData>(
      { errors: { password: 'Password is required' } },
      { status: 400 }
    )
  }

  if (password.length < 8) {
    return RemixNode.json<ActionData>(
      { errors: { password: 'Password is too short' } },
      { status: 400 }
    )
  }

  const existingUser = await UserModel.getUserByEmail(email)
  if (existingUser) {
    return RemixNode.json<ActionData>(
      { errors: { email: 'A user already exists with this email' } },
      { status: 400 }
    )
  }

  const user = await UserModel.createUser(email, password)

  return Session.createUserSession({
    request,
    userId: user.id,
    accountId: user.accounts[0].id,
    remember: false,
    redirectTo,
  })
}

export default function Join() {
  const [searchParams] = RemixReact.useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? undefined
  const actionData = RemixReact.useActionData() as ActionData
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)

  React.useEffect(() => {
    if (actionData?.errors?.email) {
      emailRef.current?.focus()
    } else if (actionData?.errors?.password) {
      passwordRef.current?.focus()
    }
  }, [actionData])

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <Logo className="mx-auto h-12 w-auto" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-12">
            Sign up new account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-11">
            Or{' '}
            <RemixReact.Link
              to="/login"
              className="font-medium text-primary-9 hover:text-primary-10"
            >
              login with existing account
            </RemixReact.Link>
          </p>
        </div>
        <RemixReact.Form method="post" className="mt-8 space-y-6">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="Email address"
                ref={emailRef}
                autoFocus={true}
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Password
              </label>
              <input
                id="confirm-password"
                name="confirm-password"
                type="password"
                autoComplete="new-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="confirm password"
              />
            </div>
          </div>

          <div className="flex items-center">
            <input
              id="remember"
              name="remember"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-7 bg-gray-3 text-primary-9 focus:outline-none focus:outline-offset-0 focus:outline-gray-1 focus:ring-primary-8"
            />
            <label
              htmlFor="remember"
              className="ml-2 block text-sm text-gray-12"
            >
              Remember me
            </label>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button type="submit" className="flex w-full justify-center">
            Sign up
          </Button>
        </RemixReact.Form>
      </div>
    </div>
  )
}
