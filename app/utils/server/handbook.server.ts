import * as DateFns from 'date-fns'
import * as DateFnsTz from 'date-fns-tz'
import * as FarmableData from '~/data/farmable.server'
import type * as DB from '~/db.server'
import type * as CharacterType from '~/types/character'

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
