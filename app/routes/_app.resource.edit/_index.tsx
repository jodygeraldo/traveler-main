import * as RadixDialog from '@radix-ui/react-dialog'
import * as RemixReact from '@remix-run/react'
import * as RemixNode from '@remix-run/server-runtime'
import clsx from 'clsx'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import * as React from 'react'
import * as RPH from 'remix-params-helper'
import * as Zod from 'zod'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import * as DB from '~/db.server'
import * as ResourceModel from '~/models/resource.server'
import * as Session from '~/session.server'
import ResourceField from './ResourceField'

const FormDataSchema = Zod.object({
  id: Zod.string(),
  title: Zod.string(),
  description: Zod.string(),
  url: Zod.string(),
  status: Zod.nativeEnum(DB.ResourceStatus).optional(),
  searchParams: Zod.string(),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const userRole = await Session.requireUserRole(request)

  if (userRole === 'USER') {
    throw RemixNode.json('Unauthorized', { status: 401 })
  }

  const result = await RPH.getFormData(request, FormDataSchema)
  if (!result.success) {
    return RemixNode.json({ errors: result.errors }, { status: 400 })
  }

  const { searchParams, id, status, ...data } = result.data

  await ResourceModel.updateResource({
    id,
    data: {
      ...data,
      status,
    },
  })

  const searchParamsStatus = new URLSearchParams()
  if (searchParams !== '') searchParamsStatus.set('status', searchParams)

  return RemixNode.redirect(`/resource?${searchParamsStatus.toString()}`)
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const userRole = await Session.requireUserRole(request)

  if (userRole === 'USER') {
    throw RemixNode.json('Unauthorized', { status: 401 })
  }

  const { id } = RPH.getSearchParamsOrFail(
    request,
    Zod.object({
      id: Zod.string(),
    })
  )

  const resource = await ResourceModel.getResource(id)

  return RemixNode.json({ resource })
}

const contentVariants: Variants = {
  hidden: { scale: 0, transition: { ease: 'easeInOut', duration: 0.2 } },
  show: { scale: 1, transition: { ease: 'easeInOut', duration: 0.2 } },
}

const overlayVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

export default function ResourceEditPage() {
  const { resource } = RemixReact.useLoaderData<typeof loader>()

  const [open, setOpen] = React.useState(true)
  const fetcher = RemixReact.useFetcher()
  const busy = fetcher.state === 'submitting'
  const navigate = RemixReact.useNavigate()
  const [searchParams] = RemixReact.useSearchParams()

  const id = searchParams.get('id') ?? ''
  const status = searchParams.get('status') ?? ''

  const searchParamsStatus = new URLSearchParams()
  if (status !== '') searchParamsStatus.set('status', status)

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <AnimatePresence
        onExitComplete={() =>
          navigate(`/resource?${searchParamsStatus.toString()}`)
        }
      >
        {open && (
          <RadixDialog.Portal forceMount>
            <div className="relative z-30">
              <RadixDialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-overlay-black-12"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                />
              </RadixDialog.Overlay>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <RadixDialog.Content asChild>
                    <motion.div
                      className="relative w-full transform rounded-lg bg-gray-2 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6"
                      variants={contentVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
                      <RadixDialog.Close
                        aria-label="Close"
                        className="absolute top-4 right-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-7"
                      >
                        <Icon.Solid name="x" className="h-4 w-4 text-gray-11" />
                      </RadixDialog.Close>

                      <fetcher.Form
                        action="?index"
                        method="post"
                        replace={true}
                        className="w-full"
                      >
                        <RadixDialog.Title className="text-lg font-medium leading-6 text-gray-12">
                          Submit a Resource Request
                        </RadixDialog.Title>
                        <div className="space-y-4 py-4">
                          <input type="hidden" name="id" value={id} />
                          <input
                            type="hidden"
                            name="searchParams"
                            value={status}
                          />
                          <ResourceField
                            name="title"
                            label="Title"
                            defaultValue={resource.title}
                            error={fetcher.data?.errors?.title}
                          />
                          <ResourceField
                            type="select"
                            name="status"
                            label="Status"
                            defaultValue={resource.status}
                            error={fetcher.data?.errors?.status}
                          />
                          <ResourceField
                            type="textarea"
                            name="description"
                            label="Description"
                            defaultValue={resource.description}
                            error={fetcher.data?.errors?.description}
                          />
                          <ResourceField
                            type="url"
                            name="url"
                            label="Link"
                            defaultValue={resource.url}
                            error={fetcher.data?.errors?.url}
                          />
                        </div>
                        <div className="flex justify-end">
                          <Button.Base
                            type="submit"
                            variant="secondary"
                            className={clsx(busy && 'cursor-progress')}
                          >
                            {busy ? 'Submitting request...' : 'Submit request'}
                          </Button.Base>
                        </div>
                      </fetcher.Form>
                    </motion.div>
                  </RadixDialog.Content>
                </div>
              </div>
            </div>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  )
}
