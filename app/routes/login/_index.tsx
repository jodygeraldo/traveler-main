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
  title: 'Login - Traveler Main',
})

const ParamsSchema = Zod.object({
  email: Zod.string().email(),
  password: Zod.string()
    .min(8, { message: 'Password must be at least 8 characters' })
    .max(16, {
      message: 'Password must be at most 16 characters',
    }),
  redirectTo: Zod.string(),
  remember: Zod.string().optional(),
})

interface ActionData {
  ok: boolean
  errors?: {
    email?: string
    password?: string
  }
}

export async function action({ request }: RemixNode.ActionArgs) {
  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    return RemixNode.json<ActionData>(
      { ok: false, errors: result.errors },
      { status: 400 }
    )
  }

  const { email, password, redirectTo, remember } = result.data

  const user = await UserModel.verifyLogin(email, password)

  if (!user) {
    return RemixNode.json<ActionData>(
      { ok: false, errors: { email: 'Invalid email or password' } },
      { status: 400 }
    )
  }

  return Session.createUserSession({
    request,
    userId: user.id,
    accountId: user.accounts[0].id,
    remember: remember === 'on' ? true : false,
    redirectTo,
  })
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const userId = await Session.getUserId(request)
  if (userId) return RemixNode.redirect('/')
  return RemixNode.json({ ok: true })
}

export default function LoginPage() {
  const [searchParams] = RemixReact.useSearchParams()
  const redirectTo = searchParams.get('redirectTo') || '/character'
  const actionData = RemixReact.useActionData<ActionData>()
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
            Sign in to your account
          </h2>
          <p className="mt-2 text-center text-sm text-gray-11">
            Or{' '}
            <RemixReact.Link
              to="/join"
              className="font-medium text-primary-9 hover:text-primary-10"
            >
              create new account
            </RemixReact.Link>
          </p>
        </div>
        <RemixReact.Form method="post" className="mt-8 space-y-6">
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
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
                autoComplete="current-password"
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-7 bg-gray-3 px-3 py-2 text-gray-12 placeholder-gray-8 focus:z-10 focus:border-primary-8 focus:outline-none focus:ring-primary-8 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
                aria-invalid={actionData?.errors?.password ? true : undefined}
                aria-describedby="password-error"
                {...inputProps('password')}
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

          <div className="flex items-center justify-between">
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

            <div className="text-sm">
              <RemixReact.Link
                to="#"
                // className="font-medium text-primary-9 hover:text-primary-10"
                className="pointer-events-none font-medium text-gray-6/50"
              >
                Forgot your password?
              </RemixReact.Link>
            </div>
          </div>

          <input type="hidden" name="redirectTo" value={redirectTo} />

          <Button
            id="signin"
            type="submit"
            className="flex w-full justify-center"
          >
            Sign in
          </Button>
        </RemixReact.Form>
      </div>
    </div>
  )
}
