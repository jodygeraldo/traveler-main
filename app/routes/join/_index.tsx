import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import Button from '~/components/Button'
import Logo from '~/components/Logo'
import * as UserModel from '~/models/user.server'
import * as Session from '~/session.server'

export const meta: RemixNode.MetaFunction = () => ({
  title: 'Sign up - Traveler Main',
})

const ParamsSchema = Zod.object({
  email: Zod.string().email(),
  password: Zod.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, {
      message: 'Password must be at most 16 characters',
    }),
  confirmPassword: Zod.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, {
      message: 'Password must be at most 16 characters',
    }),
  redirectTo: Zod.string(),
  remember: Zod.string().optional(),
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
  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    return RemixNode.json<ActionData>(
      { errors: result.errors },
      { status: 400 }
    )
  }

  const { email, password, confirmPassword, redirectTo, remember } = result.data

  if (password !== confirmPassword) {
    return RemixNode.json<ActionData>(
      { errors: { password: 'Passwords do not match' } },
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
    remember: remember === 'on' ? true : false,
    redirectTo,
  })
}

export default function Join() {
  const [searchParams] = RemixReact.useSearchParams()
  const redirectTo = searchParams.get('redirectTo') ?? '/character'
  const actionData = RemixReact.useActionData() as ActionData
  const emailRef = React.useRef<HTMLInputElement>(null)
  const passwordRef = React.useRef<HTMLInputElement>(null)
  const inputProps = RemixParamsHelper.useFormInputProps(ParamsSchema)

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
                autoComplete="email"
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="Email address"
                ref={emailRef}
                autoFocus={true}
                aria-invalid={actionData?.errors?.email ? true : undefined}
                aria-describedby="email-error"
                {...inputProps('email')}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                autoComplete="new-password"
                className="relative block w-full appearance-none rounded-none border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                {...inputProps('password')}
                type="password"
              />
            </div>
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Password
              </label>
              <input
                id="confirm-password"
                autoComplete="new-password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="confirm password"
                {...inputProps('confirmPassword')}
                type="password"
              />
            </div>

            {actionData?.errors && (
              <div className="mt-1">
                {actionData?.errors?.email && (
                  <div className="text-danger-11" id="email-error">
                    {actionData.errors.email}
                  </div>
                )}
                {actionData?.errors?.password && (
                  <div className="text-danger-11" id="password-error">
                    {actionData.errors.password}
                  </div>
                )}
              </div>
            )}
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
