import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { getCoreRowModel, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import ItemTable from '~/components/ItemTable'
import { getTravelerRequiredMaterial } from '~/data/characters'
import { getUserCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import { toCapitalized } from '~/utils'
import { ascensionColumns } from './ascension'

type depromisify<T> = T extends Promise<infer U> ? U : T
type LoaderData = {
  traveler: depromisify<ReturnType<typeof getUserCharacter>>
  ascensionMaterial: ReturnType<typeof getTravelerRequiredMaterial>['ascensionMaterial']
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const accId = await requireAccountId(request)
  const { vision } = params
  invariant(vision)

  const visionSchema = z.enum(['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro', 'Cryo'])
  const parsedVision = visionSchema.parse(toCapitalized(vision))

  const userCharacter = await getUserCharacter({ name: `Traveler ${parsedVision}`, accId })
  const { ascensionMaterial } = getTravelerRequiredMaterial({ vision: parsedVision })

  return json<LoaderData>({ traveler: userCharacter, ascensionMaterial })
}

export default function TravelerRequiredItemsPage() {
  const { traveler, ascensionMaterial } = useLoaderData() as LoaderData
  const [ascensionNext, setAscensionNext] = useState(false)

  const ascensionTable = useReactTable({
    data: ascensionNext
      ? ascensionMaterial.slice(traveler?.['@ascension'] ?? 0)
      : [...ascensionMaterial],
    columns: ascensionColumns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <ItemTable
      heading="Ascension Material"
      switchLabel="Show only for next phase"
      switchState={[ascensionNext, setAscensionNext]}
      table={ascensionTable}
    />
  )
}
