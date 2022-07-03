import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useMemo, useState } from 'react'
import Image, { MimeType } from 'remix-image'
import invariant from 'tiny-invariant'
import Icon from '~/components/Icon'
import ItemTable from '~/components/ItemTable'
import TableCell from '~/components/TableCell'
import Tooltip from '~/components/Tooltip'
import type { CharacterMinimal } from '~/data/characters'
import { getCharacter, getCharacterRequiredMaterial } from '~/data/characters'
import { getUserCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import { getImageSrc } from '~/utils'

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
  const [hideAscension, setHideAscension] = useState(false)
  const [hideTalent, setHideTalent] = useState(false)

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
    () => (hideAscension ? [] : [...ascensionMaterial]),
    [hideAscension, ascensionMaterial]
  )

  const talentData = useMemo(
    () => (hideTalent ? [] : [...talentMaterial]),
    [hideTalent, talentMaterial]
  )

  const talent = character.talent as [string, string, string] // this should be fine because the only time it is an array is because it's traveler but traveler handled on different page

  return (
    <>
      <ItemTable
        uid="ascension"
        heading="Ascension"
        switchLabel="Hide ascension table"
        switchState={[hideAscension, setHideAscension]}
        columns={ascensionColumns}
        data={ascensionData}
        ascensionPhase={character.progression?.ascension ?? 0}
      />
      <ItemTable
        uid="normal-talent"
        heading={CustomTableHeading({
          talentName: talent,
          name: character.name,
          weapon: character.weapon,
        })}
        switchLabel="Hide talent table"
        switchState={[hideTalent, setHideTalent]}
        columns={talentColumns}
        data={talentData}
        talentLevel={[
          character.progression?.normalAttack ?? 1,
          character.progression?.elementalSkill ?? 1,
          character.progression?.elementalBurst ?? 1,
        ]}
        customAddionalFirstCellElement={[
          CustomFirstCell({
            name: character.name,
            weapon: character.weapon,
            talent: 'Normal_Attack',
            talentName: talent[0],
          }),
          CustomFirstCell({
            name: character.name,
            weapon: character.weapon,
            talent: 'Elemental_Skill',
            talentName: talent[1],
          }),
          CustomFirstCell({
            name: character.name,
            weapon: character.weapon,
            talent: 'Elemental_Burst',
            talentName: talent[2],
          }),
        ]}
      />
    </>
  )
}

function CustomTableHeading({
  talentName,
  name,
  weapon,
}: {
  talentName: string[]
  name: string
  weapon: string
}) {
  const talent = ['Normal_Attack', 'Elemental_Skill', 'Elemental_Burst'] as const
  return (
    <>
      Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent.map((t, i) => (
          <Tooltip key={talentName[i]} text={talentName[i]}>
            <Image
              src={`/image/talent/${t}_${t === 'Normal_Attack' ? weapon : getImageSrc(name)}.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0"
              responsive={[{ size: { width: 32, height: 32 } }]}
              options={{ contentType: MimeType.WEBP }}
              dprVariants={[1, 2, 3]}
            />
          </Tooltip>
        ))}
      </span>
    </>
  )
}

function CustomFirstCell({
  talentName,
  name,
  weapon,
  talent,
}: {
  talentName: string
  name: string
  weapon?: string
  talent: 'Normal_Attack' | 'Elemental_Skill' | 'Elemental_Burst'
}) {
  return (
    <Tooltip key={talentName} text={talentName}>
      <Image
        src={`/image/talent/${talent}_${
          talent === 'Normal_Attack' ? weapon : getImageSrc(name)
        }.png`}
        alt=""
        className="h-6 w-6 flex-shrink-0"
        responsive={[{ size: { width: 24, height: 24 } }]}
        options={{ contentType: MimeType.WEBP }}
        dprVariants={[1, 2, 3]}
      />
    </Tooltip>
  )
}
