import * as DateFns from 'date-fns'
import * as DateFnsTz from 'date-fns-tz'
import * as FarmableData from '~/data/farmable.server'
import type * as DB from '~/db.server'
import type * as CharacterType from '~/types/character'
import * as CharacterUtils from '~/utils/server/character.server'

export function getGenshinDailyReset(server: DB.Server) {
  const jakartaTime = DateFnsTz.zonedTimeToUtc(new Date(), 'Asia/Jakarta')

  const hours: Record<DB.Server, number> = {
    NA: 16,
    EU: 10,
    ASIA: 3,
  }

  const resetTime = DateFnsTz.zonedTimeToUtc(
    DateFns.addDays(
      DateFns.set(new Date(), {
        hours: hours[server],
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
      1
    ),
    'Asia/Jakarta'
  ).getTime()

  const resetIn = resetTime - jakartaTime.getTime()

  return {
    name: server,
    resetIn: resetIn > 86400000 ? resetIn - 86400000 : resetIn,
    rawResetIn: resetIn,
  }
}

export function getFarmable(server: DB.Server) {
  const jakartaTime = DateFnsTz.zonedTimeToUtc(new Date(), 'Asia/Jakarta')

  const resetTime: Record<DB.Server, number> = {
    NA: 16,
    EU: 10,
    ASIA: 3,
  }

  const currentDay =
    jakartaTime.getHours() >= resetTime[server]
      ? jakartaTime.getDay()
      : DateFns.addDays(jakartaTime, -1).getDay()

  return FarmableData.farmable[currentDay]
}

export function getStats(
  characters: ({ name: string } & CharacterType.Progression)[]
) {
  return [
    {
      name: 'Characters Ascension 6',
      value: Math.round(
        characters.reduce((acc, cur) => {
          if (cur.name.includes('Traveler') && cur.ascension === 6)
            return (
              acc +
              1 / characters.filter((c) => c.name.includes('Traveler')).length
            )
          if (cur.ascension === 6) return acc + 1
          return acc
        }, 0)
      ),
    },
    {
      name: 'Characters Level 90',
      value: Math.round(
        characters.reduce((acc, cur) => {
          if (cur.name.includes('Traveler') && cur.level === 90)
            return (
              acc +
              1 / characters.filter((c) => c.name.includes('Traveler')).length
            )
          if (cur.level === 90) return acc + 1
          return acc
        }, 0)
      ),
    },
    {
      name: 'Talents Level 8+',
      value: characters.reduce((acc, cur) => {
        let count = 0
        cur.normalAttack >= 8 && (count += 1)
        cur.elementalSkill >= 8 && (count += 1)
        cur.elementalBurst >= 8 && (count += 1)
        return acc + count
      }, 0),
    },
  ]
}

export function getCharactersTrackMaterials(
  tracks: ({ name: string } & CharacterType.TrackProgression)[]
) {
  type KV = { key: string; value: number }

  const materialArray: KV[][] = []
  tracks.forEach((track) => {
    const name = CharacterUtils.isValidCharacterName(track.name) && track.name
    if (!name) throw new Error('Invalid character name')
    const { name: _, ...t } = track
    const materials = CharacterUtils.getItemsQuantity({ name, ...t })
    if (!Array.isArray(materials)) throw new Error('Invalid materials')
    materialArray.push(materials)
  })

  return CharacterUtils.combineDuplicateKey({
    skipPreprocess: true,
    arr: materialArray.flat(),
  })
}

export function getTopPriorityCharacter(
  tracks: ({
    id: string
    priority: number | null
    name: string
  } & CharacterType.TrackProgression)[]
) {
  if (tracks.length === 0) return null
  const topPriorityTrack = tracks[0]
  const { name, id: _, priority: _2, ...track } = topPriorityTrack

  const progression: {
    label: string
    current: number
    target: number | null
  }[] = []

  const label = {
    level: 'Level',
    ascension: 'Ascension',
    normalAttack: 'Normal Attack',
    elementalSkill: 'Elemental Skill',
    elementalBurst: 'Elemental Burst',
  } as const

  type ProgressionKey = keyof typeof track

  for (const key in track) {
    const typedKey = key as ProgressionKey
    if (track[typedKey].current < (track[typedKey].target || 0)) {
      progression.push({
        label: label[typedKey],
        current: track[typedKey].current,
        target: track[typedKey].target,
      })
    }
  }

  return {
    name,
    progression,
  }
}
