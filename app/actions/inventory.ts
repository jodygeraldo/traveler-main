import type * as RemixNode from '@remix-run/node'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import * as InventoryModel from '~/models/inventory.server'
import * as Session from '~/session.server'

export const action: RemixNode.ActionFunction = async ({ request }) => {
	const accId = await Session.requireAccountId(request)

	const ParamsSchema = Zod.object({
		name: Zod.string(),
		category: Zod.enum([
			'common',
			'ascension_gem',
			'ascension_boss',
			'local_specialty',
			'talent_book',
			'talent_boss',
			'special',
		]),
		quantity: Zod.number().min(0).max(9999),
	})

	const { name, category, quantity } =
		await RemixParamsHelper.getFormDataOrFail(request, ParamsSchema)

	await InventoryModel.upsertItem({
		accId,
		category,
		name,
		quantity,
	})

	return null
}
