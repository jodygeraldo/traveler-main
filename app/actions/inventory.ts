import type { ActionFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import invariant from 'tiny-invariant'
import { upsertItem } from '~/models/inventory.server'
import { requireAccountId } from '~/session.server'

export const action: ActionFunction = async ({ request }) => {
  const accId = await requireAccountId(request)

  const formData = await request.formData()
  const name = formData.get('name')
  const category = formData.get('category')
  const quantity = formData.get('quantity')
  invariant(typeof name === 'string', 'name is required')
  invariant(typeof category === 'string', 'category is required')
  invariant(typeof quantity === 'string', 'quantity is required')

  if (
    category !== 'common' &&
    category !== 'ascension_gem' &&
    category !== 'ascension_boss' &&
    category !== 'local_specialty' &&
    category !== 'talent_book' &&
    category !== 'talent_boss' &&
    category !== 'special'
  ) {
    throw json({ category }, { status: 404 })
  }

  await upsertItem({
    accId,
    category,
    name,
    quantity: +quantity,
  })

  return null
}
