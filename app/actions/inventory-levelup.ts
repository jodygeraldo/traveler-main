import * as RemixNode from '@remix-run/node'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

const ParamsSchema = Zod.object({
  characterLevel: Zod.number().min(1).max(90).optional(),
  level: Zod.number().min(0).max(10),
  kind: Zod.enum([
    'Ascension',
    'Talent Normal Attack',
    'Talent Elemental Skill',
    'Talent Elemental Burst',
  ]),
  items: Zod.string(),
})

export const action: RemixNode.ActionFunction = async ({ params, request }) => {
  const accId = await Session.requireAccountId(request)
  const { vision, character } = params
  let characterName = ''

  if (vision) {
    characterName = Zod.enum(CharacterData.validTraveler).parse(
      Utils.toCapitalized(`Traveler ${vision}`)
    )
  } else {
    invariant(character)
    const validCharacter = CharacterData.validateCharacter(character)
    if (!validCharacter) {
      throw RemixNode.json(
        { name: character },
        { status: 404, statusText: 'Page Not Found' }
      )
    }
    characterName = character
  }

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    throw new Error('Invalid data')
  }

  const { level, kind, characterLevel = 1 } = result.data

  const itemsSchema = Zod.array(
    Zod.object({
      name: Zod.string(),
      quantity: Zod.number(),
      rarity: Zod.number(),
    })
  )

  const items = itemsSchema.parse(JSON.parse(result.data.items))

  const AscensionItemType = {
    0: 'common',
    1: 'ascension_gem',
    2: 'local_specialty',
    3: 'ascension_boss',
  } as const

  const TalentItemType = {
    0: 'common',
    1: 'talent_book',
    2: 'talent_boss',
    3: 'special',
  } as const

  let ascensionItems = [] as CharacterModel.AscensionItem[]
  let talentItems = [] as CharacterModel.TalentItem[]

  if (kind === 'Ascension') {
    ascensionItems = items.map((item, idx) => {
      const idxTyped = Zod.number().min(0).max(3).parse(idx) as 0 | 1 | 2 | 3

      return {
        name: item.name,
        quantity: item.quantity,
        type: AscensionItemType[idxTyped],
      }
    })
  }

  if (kind !== 'Ascension') {
    talentItems = items.map((item, idx) => {
      const idxTyped = Zod.number().min(0).max(3).parse(idx) as 0 | 1 | 2 | 3

      return {
        name: item.name,
        quantity: item.quantity,
        type: TalentItemType[idxTyped],
      }
    })
  }

  await CharacterModel.upsertTravelerInventoryLevelUp({
    kind,
    name: characterName,
    level: level + 1,
    characterLevel,
    accId: accId,
    // @ts-ignore
    data: {
      ascension: kind === 'Ascension',
      items: kind === 'Ascension' ? ascensionItems : talentItems,
    },
  })

  return null
}
