import * as RemixNode from '@remix-run/node'
import * as Zod from 'zod'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as UtilsServer from '~/utils/index.server'

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = Zod.string()
    .transform((str) => Utils.deslugify(str))
    .safeParse(new URL(request.url).searchParams.get('name'))

  if (!result.success) {
    return RemixNode.json({ message: 'Missing name parameter' }, 400)
  }

  const name = result.data
  const validCharacter = UtilsServer.Character.validateCharacter(name)
  if (!validCharacter) {
    throw RemixNode.json(
      { message: `Character ${name} not found` },
      {
        status: 404,
        statusText: 'Character Not Found',
      }
    )
  }

  const DEFAULT_PROGRESSION = {
    level: 1,
    ascension: 0,
    normalAttack: 1,
    elementalSkill: 1,
    elementalBurst: 1,
  }

  const characterProgression = await CharacterModel.getUserCharacter({
    name,
    accountId,
  })

  return RemixNode.json({
    characterProgression: characterProgression || DEFAULT_PROGRESSION,
  })
}
