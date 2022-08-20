import Redis from 'ioredis'
import invariant from 'tiny-invariant'
import type * as Zod from 'zod'

invariant(process.env.REDIS_URL, 'REDIS_URL must be set')

const redis = new Redis(process.env.REDIS_URL)

redis.on('error', (err) => console.log('Redis client error', err))

export async function get(key: string) {
  const cache = await redis.get(key)
  if (cache) {
    return JSON.parse(cache)
  }
  return null
}

export async function set(key: string, value: any) {
  await redis
    .set(key, JSON.stringify(value))
    .catch((error) => console.error(`Redis Error .set: ${error}`))
}

export async function del(keys: string | string[]) {
  await redis
    .del(typeof keys === 'string' ? [keys] : keys)
    .catch((error) => console.error(`Redis Error .del: ${error}`))
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
