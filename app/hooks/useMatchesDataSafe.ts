import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import type * as Zod from 'zod'

export default function useMatchesDataSafe<
  T extends Zod.ZodType<any, any, any>
>({ id, schema }: { id: string; schema: T }) {
  type SchemaType = Zod.infer<T>
  const matchingRoutes = RemixReact.useMatches()
  const route = React.useMemo(
    () => matchingRoutes.find((route) => route.id === id),
    [matchingRoutes, id]
  )

  const result = schema.safeParse(route?.data)
  if (!result.success) return undefined

  return result?.data as SchemaType
}
