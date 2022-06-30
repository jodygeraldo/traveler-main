import type { ActionFunction } from '@remix-run/node'
import { getFormDataOrFail } from 'remix-params-helper'
import { z } from 'zod'
import { upsertItem } from '~/models/inventory.server'
import { requireAccountId } from '~/session.server'

export const action: ActionFunction = async ({ request }) => {
  const accId = await requireAccountId(request)

  const ParamsSchema = z.object({
    name: z.string(),
    category: z.enum([
      'common',
      'ascension_gem',
      'ascension_boss',
      'local_specialty',
      'talent_book',
      'talent_boss',
      'special',
    ]),
    quantity: z.number().min(0).max(9999),
  })

  const { name, category, quantity } = await getFormDataOrFail(request, ParamsSchema)
  console.log(name, category, quantity)

  await upsertItem({
    accId,
    category,
    name,
    quantity,
  })

  return null
}
