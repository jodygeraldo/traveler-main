import * as RemixNode from '@remix-run/node'
import * as Zod from 'zod'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import type * as CharacterTypes from '~/types/character'
import * as Utils from '~/utils'
import * as CharacterUtils from '~/utils/server/character.server'

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const result = Zod.string()
    .transform((str) => Utils.deslugify(str))
    .safeParse(new URL(request.url).searchParams.get('name'))

  if (!result.success) {
    return RemixNode.json({ message: 'Missing name parameter' }, 400)
  }

  const name = result.data
  const validCharacter = CharacterUtils.validateCharacter(name)
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

  return RemixNode.json<CharacterTypes.CharacterProgression>({
    name,
    progression: characterProgression || DEFAULT_PROGRESSION,
  })
}
