import * as RemixNode from '@remix-run/node'
import * as Session from '~/session.server'

export const action: RemixNode.ActionFunction = async ({ request }) => {
  return Session.logout(request)
}

export const loader: RemixNode.LoaderFunction = async () => {
  return RemixNode.redirect('/')
}
