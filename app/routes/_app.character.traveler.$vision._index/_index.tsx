import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useMemo, useState } from 'react'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import Icon from '~/components/Icon'
import ItemTable from '~/components/ItemTable'
import TableCell from '~/components/TableCell'
import { getTravelerRequiredMaterial } from '~/data/characters'
import { getUserCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import type { depromisify } from '~/utils'
import { toCapitalized } from '~/utils'

type LoaderData = {
  traveler: depromisify<ReturnType<typeof getUserCharacter>>
  ascensionMaterial: ReturnType<typeof getTravelerRequiredMaterial>['ascensionMaterial']
  talentMaterial: ReturnType<typeof getTravelerRequiredMaterial>['talentMaterial']
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const accId = await requireAccountId(request)
  const { vision } = params
  invariant(vision)

  const visionSchema = z.enum(['Anemo', 'Geo', 'Electro', 'Dendro', 'Hydro', 'Pyro', 'Cryo'])
  const parsedVision = visionSchema.parse(toCapitalized(vision))

  const userCharacter = await getUserCharacter({ name: `Traveler ${parsedVision}`, accId })
  const { ascensionMaterial, talentMaterial } = getTravelerRequiredMaterial({
    vision: parsedVision,
  })

  return json<LoaderData>({ traveler: userCharacter, ascensionMaterial, talentMaterial })
}

export default function TravelerRequiredItemsPage() {
  const { traveler, ascensionMaterial, talentMaterial } = useLoaderData() as LoaderData
  const [ascensionNext, setAscensionNext] = useState(false)
  const [normalTalentNext, setNormalTalentNext] = useState(false)
  const [elementalSkillTalentNext, setelementalSkillTalentNext] = useState(false)
  const [elementalBurstTalentNext, setElementalBurstTalentNext] = useState(false)

  const ascensionColumns = useMemo(
    () => [
      {
        Header: 'Phase',
        accessor: 'phase',
        Cell: ({ value }: { value: { from: number; to: number } }) => (
          <div className="flex items-center gap-1">
            <span className="tabular-nums">{value.from}</span>
            <span className="sr-only">To</span>
            <Icon type="solid" name="arrowSmRight" aria-hidden className="h-4 w-4" />
            <span className="tabular-nums">{value.to}</span>
          </div>
        ),
      },
      {
        Header: 'Mora',
        accessor: 'mora',
        Cell: ({ value }: { value: number }) => <TableCell quantity={value} text="Mora" />,
      },
      {
        Header: 'Common',
        accessor: 'common',
        Cell: ({ value }: { value: { name: string; quantity: number } }) => (
          <TableCell quantity={value.quantity} text={value.name} />
        ),
      },
      {
        Header: 'Gem',
        accessor: 'gem',
        Cell: ({ value }: { value: { name: string; quantity: number } }) => (
          <TableCell quantity={value.quantity} text={value.name} />
        ),
      },
      {
        Header: 'Local Specialty',
        accessor: 'local',
        Cell: ({ value }: { value: { name: string; quantity: number } }) => (
          <TableCell quantity={value.quantity} text={value.name} />
        ),
      },
    ],
    []
  )

  const talentColumns = useMemo(
    () => [
      {
        Header: 'Level',
        accessor: 'level',
        Cell: ({ value }: { value: { from: number; to: number } }) => (
          <div className="flex items-center gap-1">
            <span className="tabular-nums">{value.from}</span>
            <span className="sr-only">To</span>
            <Icon type="solid" name="arrowSmRight" aria-hidden className="h-4 w-4" />
            <span className="tabular-nums">{value.to}</span>
          </div>
        ),
      },
      {
        Header: 'Mora',
        accessor: 'mora',
        Cell: ({ value }: { value: number }) => <TableCell quantity={value} text="Mora" />,
      },
      {
        Header: 'Common',
        accessor: 'common',
        Cell: ({ value }: { value: { name: string; quantity: number } }) => (
          <TableCell quantity={value.quantity} text={value.name} />
        ),
      },
      {
        Header: 'Book',
        accessor: 'book',
        Cell: ({ value }: { value: { name: string; quantity: number } }) => (
          <TableCell quantity={value.quantity} text={value.name} />
        ),
      },
      {
        Header: 'Boss',
        accessor: 'boss',
        Cell: ({ value }: { value?: { name: string; quantity: number } }) => (
          <TableCell quantity={value?.quantity} text={value?.name} />
        ),
      },
      {
        Header: 'Special',
        accessor: 'special',
        Cell: ({ value }: { value?: { name: string; quantity: number } }) => (
          <TableCell quantity={value?.quantity} text={value?.name} />
        ),
      },
    ],
    []
  )

  const ascensionData = useMemo(
    () =>
      ascensionNext
        ? ascensionMaterial.slice(traveler?.['@ascension'] ?? 0)
        : [...ascensionMaterial],
    [ascensionNext, ascensionMaterial, traveler]
  )

  const normalTalentData = useMemo(
    () =>
      normalTalentNext
        ? talentMaterial.normal.slice(
            traveler?.['@normal_attack'] ? traveler['@normal_attack'] - 1 : 0
          )
        : [...talentMaterial.normal],
    [normalTalentNext, talentMaterial.normal, traveler]
  )

  const elementalSkillTalentData = useMemo(
    () =>
      elementalSkillTalentNext
        ? talentMaterial.elemental.slice(
            traveler?.['@elemental_skill'] ? traveler['@elemental_skill'] - 1 : 0
          )
        : [...talentMaterial.elemental],
    [elementalSkillTalentNext, talentMaterial.elemental, traveler]
  )

  const elementalBurstTalentData = useMemo(
    () =>
      elementalBurstTalentNext
        ? talentMaterial.elemental.slice(
            traveler?.['@elemental_burst'] ? traveler['@elemental_burst'] - 1 : 0
          )
        : [...talentMaterial.elemental],
    [elementalBurstTalentNext, talentMaterial.elemental, traveler]
  )

  return (
    <>
      <ItemTable
        uid="ascension"
        heading="Ascension Material"
        switchLabel="Show only for next phase"
        switchState={[ascensionNext, setAscensionNext]}
        columns={ascensionColumns}
        data={ascensionData}
      />
      <ItemTable
        uid="normal-talent"
        heading="Talent Normal Attack Material"
        switchLabel="Show only for next level"
        switchState={[normalTalentNext, setNormalTalentNext]}
        columns={talentColumns}
        data={normalTalentData}
      />
      <ItemTable
        uid="elemental-skill-talent"
        heading="Talent Elemental Skill Material"
        switchLabel="Show only for next level"
        switchState={[elementalSkillTalentNext, setelementalSkillTalentNext]}
        columns={talentColumns}
        data={elementalSkillTalentData}
      />
      <ItemTable
        uid="elemental-burst-talent"
        heading="Talent Elemental Burst Material"
        switchLabel="Show only for next level"
        switchState={[elementalBurstTalentNext, setElementalBurstTalentNext]}
        columns={talentColumns}
        data={elementalBurstTalentData}
      />
    </>
  )
}
