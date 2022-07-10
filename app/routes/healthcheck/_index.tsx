import type * as RemixNode from '@remix-run/node'
import prisma from '~/db.server'

export const loader: RemixNode.LoaderFunction = async ({ request }) => {
  try {
    await prisma.user.count()
    return new Response('OK')
  } catch (error: unknown) {
    console.log('healthcheck ❌', { error })
    return new Response('ERROR', { status: 500 })
  }
}
