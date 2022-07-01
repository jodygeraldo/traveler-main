import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useMemo, useState } from 'react'
import invariant from 'tiny-invariant'
import Icon from '~/components/Icon'
import ItemTable from '~/components/ItemTable'
import TableCell from '~/components/TableCell'
import type { CharacterMinimal } from '~/data/characters'
import { getCharacter, getCharacterRequiredMaterial } from '~/data/characters'
import { getUserCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'

type LoaderData = {
  character: CharacterMinimal
  ascensionMaterial: ReturnType<typeof getCharacterRequiredMaterial>['ascensionMaterial']
  talentMaterial: ReturnType<typeof getCharacterRequiredMaterial>['talentMaterial']
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const accId = await requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const userCharacter = await getUserCharacter({ name: characterName, accId })
  const character = getCharacter({ name: characterName, characterData: userCharacter })
  if (!character) {
    throw json(`Character ${characterName} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  const { ascensionMaterial, talentMaterial } = getCharacterRequiredMaterial({
    name: characterName,
  })

  return json<LoaderData>({ character, ascensionMaterial, talentMaterial })
}

export default function CharacterPage() {
  const { character, ascensionMaterial, talentMaterial } = useLoaderData() as LoaderData
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
      {
        Header: 'Boss',
        accessor: 'boss',
        Cell: ({ value }: { value?: { name: string; quantity: number } }) => (
            <TableCell quantity={value?.quantity} text={value?.name} />
          ),
      }
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
        ? ascensionMaterial.slice(character.progression?.ascension ?? 0)
        : [...ascensionMaterial],
    [ascensionNext, ascensionMaterial, character]
  )

  const normalTalentData = useMemo(
    () =>
      normalTalentNext
        ? talentMaterial.slice(
            character.progression?.normalAttack ? character.progression.normalAttack - 1 : 0
          )
        : [...talentMaterial],
    [normalTalentNext, talentMaterial, character.progression]
  )

  const elementalSkillTalentData = useMemo(
    () =>
      normalTalentNext
        ? talentMaterial.slice(
            character.progression?.elementalSkill ? character.progression.elementalSkill - 1 : 0
          )
        : [...talentMaterial],
    [normalTalentNext, talentMaterial, character.progression]
  )

  const elementalBurstTalentData = useMemo(
    () =>
      normalTalentNext
        ? talentMaterial.slice(
            character.progression?.elementalBurst ? character.progression.elementalBurst - 1 : 0
          )
        : [...talentMaterial],
    [normalTalentNext, talentMaterial, character.progression]
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
