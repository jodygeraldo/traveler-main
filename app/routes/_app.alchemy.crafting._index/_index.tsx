import * as RemixNode from '@remix-run/node'

export function loader() {
  return RemixNode.redirect('/alchemy/crafting/all')
}
