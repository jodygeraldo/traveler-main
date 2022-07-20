import * as RemixNode from '@remix-run/node'
import * as Zod from 'zod'

export function loader({ params }: RemixNode.LoaderArgs) {
  const name = Zod.string().parse(params.name)
  return RemixNode.redirect(`/character/${name}/required-items`)
}
