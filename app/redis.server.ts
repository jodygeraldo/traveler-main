import * as Redis from 'redis'
import invariant from 'tiny-invariant'
import type * as Zod from 'zod'

invariant(process.env.REDIS_URL, 'REDIS_URL must be set')

const client = Redis.createClient({ url: process.env.REDIS_URL })

client.on("error", (err) => console.log("Redis client error", err));

export async function get(key: string) {
  try {
    await client.connect()
    const cache = await client.get(key)
    if (!cache) return

    return JSON.parse(cache)
  } catch (error) {
    console.error(`Redis Error .get: ${error}`)
  } finally {
    await client.quit()
  }
}

export async function set(key: string, value: any) {
  try {
    await client.connect()
    await client.set(key, JSON.stringify(value))
  } catch (error) {
    console.error(`Redis Error .set: ${error}`)
  } finally {
    await client.quit()
  }
}

export async function del(key: string | string[]) {
  try {
    await client.connect()
    await client.del(key)
  } catch (error) {
    console.error(`Redis Error .del: ${error}`)
  } finally {
    await client.quit()
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
