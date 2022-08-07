import * as Redis from 'redis'
import invariant from 'tiny-invariant'

import type * as Zod from 'zod'

invariant(process.env.REDIS_URL, 'REDIS_URL must be set')

let client: Redis.RedisClientType

declare global {
  var __redis__: Redis.RedisClientType
}

if (process.env.NODE_ENV === 'production') {
  client = Redis.createClient({ url: process.env.REDIS_URL })
} else {
  if (!global.__redis__) {
    global.__redis__ = Redis.createClient({ url: process.env.REDIS_URL })
    client = global.__redis__
  }
  client = global.__redis__
}

export async function get(key: string) {
  try {
    await client.connect()
    const cache = await client.get(key)
    await client.disconnect()
    if (!cache) return

    return JSON.parse(cache)
  } catch (error) {
    console.error(`Redis Error .get: ${error}`)
  }
}

export async function set(key: string, value: any) {
  try {
    await client.connect()
    await client.set(key, JSON.stringify(value))
    await client.disconnect()
  } catch (error) {
    console.error(`Redis Error .set: ${error}`)
  }
}

export async function del(key: string | string[]) {
  try {
    await client.connect()
    await client.del(key)
    await client.disconnect()
  } catch (error) {
    console.error(`Redis Error .del: ${error}`)
  }
}

export async function getSafe<T extends Zod.ZodTypeAny>({
  key,
  schema,
}: {
  key: string
  schema: T
}) {
  type SchemaType = Zod.infer<T>
  const value = await get(key)

  const result = schema.safeParse(value)
  if (!result.success) return
  return result.data as SchemaType
}
