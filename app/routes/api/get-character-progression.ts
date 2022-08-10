import * as RemixNode from '@remix-run/node'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import type * as CharacterTypes from '~/types/character'
import * as CharacterUtils from '~/utils/server/character.server'

export async function loader({ request }: RemixNode.LoaderArgs) {
  const accountId = await Session.requireAccountId(request)

  const name = CharacterUtils.parseCharacterNameOrThrow({
    name: new URL(request.url).searchParams.get('name') ?? '',
    doDesglugify: true,
  })

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

  return RemixNode.json<CharacterTypes.CharacterNameWithProgression>({
    name,
    progression: characterProgression || DEFAULT_PROGRESSION,
  })
}
