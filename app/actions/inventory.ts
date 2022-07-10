import type * as RemixNode from '@remix-run/node'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'

export const action: RemixNode.ActionFunction = async ({ request }) => {
  const accountId = await Session.requireAccountId(request)

  const ParamsSchema = Zod.object({
    name: Zod.string(),
    quantity: Zod.number().min(0).max(9999),
  })

  const { name, quantity } = await RemixParamsHelper.getFormDataOrFail(
    request,
    ParamsSchema
  )

  await InventoryModel.upsertInventoryItem({
    accountId,
    name,
    quantity,
  })

  return null
}
