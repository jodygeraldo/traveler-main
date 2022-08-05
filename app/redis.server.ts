import * as Redis from 'redis'
import invariant from 'tiny-invariant'

import type * as Zod from 'zod'

invariant(process.env.REDIS_URL, 'REDIS_URL must be set')

declare global {
  var __redis__: Redis.RedisClientType
}

async function getClient() {
  let client = global.__redis__
  if (!client) {
    client = Redis.createClient({ url: process.env.REDIS_URL })
    global.__redis__ = client
  }

  client.on('error', (err) => console.log('Redis Client Error', err))

  return client
}

export async function get(key: string) {
  const client = await getClient()

  try {
    return JSON.parse((await client.get(key)) ?? '')
  } catch (error) {
    console.error(`Redis Error .get: ${error}`)
  }
}

export async function set(key: string, value: any) {
  const client = await getClient()

  try {
    await client.set(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Redis Error .set: ${error}`)
  }
}

export async function del(key: string) {
  const client = await getClient()

  try {
    return client.del(key)
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
  if (!result.success) return undefined
  return result.data as SchemaType
}
