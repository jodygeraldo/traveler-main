import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RPH from 'remix-params-helper'
import * as Zod from 'zod'
import * as Button from '~/components/Button'
import PageHeading from '~/components/PageHeading'
import * as ResourceModel from '~/models/resource.server'
import * as Session from '~/session.server'
import ResourceCard from './ResourceCard'
import StatusSelect from './StatusSelect'

const FormDataSchema = Zod.object({
  id: Zod.string(),
  intent: Zod.enum(['setToPublished', 'delete']),
})

export async function action({ request }: RemixNode.ActionArgs) {
  const userRole = await Session.requireUserRole(request)
  if (userRole === 'USER') {
    return RemixNode.redirect('/resources')
  }

  const { id, intent } = await RPH.getFormDataOrFail(request, FormDataSchema)

  if (intent === 'setToPublished') {
    await ResourceModel.updateResourceStatus({ id, status: 'PUBLISHED' })
    return RemixNode.json(null)
  }

  await ResourceModel.deleteResource(id)
  return RemixNode.json(null)
}

export async function loader({ request }: RemixNode.LoaderArgs) {
  const { status } = RPH.getSearchParamsOrFail(
    request,
    Zod.object({
      status: Zod.enum(['PUBLISHED', 'DRAFT', 'PENDING']).optional(),
    })
  )
  const userRole = await Session.requireUserRole(request)

  return RemixNode.json({
    resources: await ResourceModel.getResources(
      userRole === 'USER' ? 'PUBLISHED' : status
    ),
    userRole,
  })
}

export default function ResourcePage() {
  const { resources, userRole } = RemixReact.useLoaderData<typeof loader>()
  const [searchParams] = RemixReact.useSearchParams()

  return (
    <>
      <PageHeading title="Resource">
        <div className="flex items-center gap-4">
          {userRole === 'ADMIN' && <StatusSelect />}
          <Button.Link
            to={`request?${searchParams.toString()}`}
            styles="button"
          >
            Submit resource
          </Button.Link>
        </div>
      </PageHeading>

      <div className="my-6 grid grid-cols-1 gap-x-4 gap-y-8 px-4 sm:px-6 md:grid-cols-2 lg:px-8 2xl:grid-cols-3">
        {resources.map((resource) => (
          <ResourceCard
            key={resource.title}
            {...resource}
            userRole={userRole}
          />
        ))}
      </div>

      <RemixReact.Outlet />
    </>
  )
}
