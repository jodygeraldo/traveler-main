import * as DateFns from 'date-fns'
import * as DateFnsTz from 'date-fns-tz'
import type * as DB from '~/db.server'

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

  let resetIn = resetTime - jakartaTime.getTime()
  if (resetIn > 86400000) resetIn -= 86400000

  return { name: server, resetIn }
}
