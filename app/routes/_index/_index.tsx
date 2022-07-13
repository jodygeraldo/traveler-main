import * as RemixReact from '@remix-run/react'
import Button, * as Buttons from '~/components/Button'
import Image from '~/components/Image'
import Logo from '~/components/Logo'
import * as Utils from '~/utils'

export default function Index() {
  const user = Utils.useOptionalUser()

  return (
    <main className="min-h-screen">
      <div className="pb-8 sm:pb-12 lg:pb-12">
        <div className="overflow-hidden pt-8 sm:pt-12 lg:relative lg:py-48">
          <div className="mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-2 lg:gap-24 lg:px-8">
            <div>
              <div>
                <Logo className="h-11 w-auto" />
              </div>
              <div className="mt-20">
                <div className="mt-6 sm:max-w-xl">
                  <h1 className="text-4xl font-extrabold tracking-tight text-gray-12 sm:text-5xl">
                    Companion For Genshin Impact Nerds
                  </h1>
                  <p className="mt-6 text-xl text-gray-11">
                    helping you to track your characters progression to the max.
                  </p>
                </div>

                <div className="mt-6 sm:flex sm:items-center sm:gap-4">
                  {user ? (
                    <div>
                      <RemixReact.Link to="/character" className="block w-full">
                        <Button className="mt-4 flex w-full justify-center sm:mt-0">
                          Go to app
                        </Button>
                      </RemixReact.Link>
                    </div>
                  ) : (
                    <>
                      <Buttons.Link
                        to="/join"
                        className="flex w-full justify-center"
                      >
                        Create new account
                      </Buttons.Link>
                      <RemixReact.Link to="/login" className="block w-full">
                        <Button className="mt-4 flex w-full justify-center sm:mt-0">
                          Sign in
                        </Button>
                      </RemixReact.Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sm:mx-auto sm:max-w-3xl sm:px-6">
            <div className="py-12 sm:relative sm:mt-12 sm:py-16 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
              <div className="hidden sm:block">
                <div className="absolute inset-y-0 left-1/2 w-screen rounded-l-3xl bg-gray-2 lg:left-80 lg:right-0 lg:w-full" />
                <svg
                  className="absolute top-8 right-1/2 -mr-3 lg:left-0 lg:m-0"
                  width={404}
                  height={392}
                  fill="none"
                  viewBox="0 0 404 392"
                >
                  <defs>
                    <pattern
                      id="837c3e70-6c3a-44e6-8854-cc48c737b659"
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits="userSpaceOnUse"
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className="text-gray-6"
                        fill="currentColor"
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={392}
                    fill="url(#837c3e70-6c3a-44e6-8854-cc48c737b659)"
                  />
                </svg>
              </div>
              <div className="relative -mr-40 pl-4 sm:mx-auto sm:max-w-3xl sm:px-0 lg:h-full lg:max-w-none lg:pl-12">
                <Image
                  className="w-full rounded-md shadow-xl ring-1 ring-black ring-opacity-5 lg:h-full lg:w-auto lg:max-w-none"
                  src='/app-character.png'
                  width={1280}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
