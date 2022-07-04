import type { ErrorBoundaryComponent, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import type { ShouldReloadFunction } from '@remix-run/react'
import { useCatch, useLoaderData } from '@remix-run/react'
import type { Inventory } from 'dbschema/edgeql-js'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import ItemList from '~/components/ItemList'
import { getItems } from '~/data/items'
import { getInventoryCategory } from '~/models/inventory.server'
import { requireAccountId } from '~/session.server'
import { toCapitalized, toSnakeCase } from '~/utils'

export { action } from '~/actions/inventory'

type LoaderData = {
	items: ReturnType<typeof getItems>
	category: keyof Inventory
}
export const loader: LoaderFunction = async ({ params, request }) => {
	const { category: categoryParams } = params
	invariant(categoryParams, 'category is required')
	const ParamsSchema = z.enum([
		'common',
		'ascension_gem',
		'ascension_boss',
		'local_specialty',
		'talent_book',
		'talent_boss',
		'special',
	])

	const parsedCategory = ParamsSchema.safeParse(toSnakeCase(categoryParams))
	if (!parsedCategory.success) {
		throw json(
			{ category: categoryParams },
			{ status: 404, statusText: 'Page Not Found' }
		)
	}

	const accId = await requireAccountId(request)
	const inventory = await getInventoryCategory({
		category: parsedCategory.data,
		accId,
	})
	const items = getItems({ category: parsedCategory.data, items: inventory })

	return json<LoaderData>({ items, category: parsedCategory.data })
}

export default function InventoryCategoryPage() {
	const { items, category } = useLoaderData<LoaderData>()

	return (
		<div className="space-y-12">
			<h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
				Inventory
			</h1>

			<div>
				<h2 className="text-lg font-medium leading-6 text-gray-12">
					{toCapitalized(category)}
				</h2>
				<ItemList items={items} category={category} />
			</div>
		</div>
	)
}

export const unstable_shouldReload: ShouldReloadFunction = ({ submission }) => {
	return !!submission && submission.method !== 'POST'
}

export function CatchBoundary() {
	const caught = useCatch()

	return (
		<div>
			<h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
				ERROR {caught.status} - {caught.statusText}
			</h1>

			<p className="mt-1 font-medium leading-6 text-gray-11">
				Category: {caught.data.category} not found
			</p>
		</div>
	)
}

export const ErrorBoundary: ErrorBoundaryComponent = ({ error }) => {
	return (
		<div>
			<h1 className="text-2xl font-bold leading-7 text-gray-12 sm:truncate sm:text-3xl">
				INTERNAL SERVER ERROR
			</h1>

			<p className="mt-1 font-medium leading-6 text-gray-11">{error.message}</p>
		</div>
	)
}
