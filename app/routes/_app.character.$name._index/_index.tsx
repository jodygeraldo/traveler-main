import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as ReactTable from '@tanstack/react-table'
import * as React from 'react'
import invariant from 'tiny-invariant'
import CharacterCustomFirstCell from '~/components/CharacterCustomFirstCell'
import * as CustomHeading from '~/components/CustomTableHeading'
import * as ItemTable from '~/components/ItemTable'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Column from './column'

interface LoaderData {
  character: CharacterData.Character
  ascensionMaterial: CharacterData.CharacterAscension[]
  talentMaterial:
    | CharacterData.CharacterTalent[]
    | {
        normal: CharacterData.CharacterTalent[]
        elemental: CharacterData.CharacterTalent[]
      }
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
  const accountId = await Session.requireAccountId(request)
  const { name } = params
  invariant(name)

  const userCharacter = await CharacterModel.getUserCharacter({
    name,
    accountId,
  })
  const character = CharacterData.getCharacter({
    name,
    progression: userCharacter,
  })

  const { ascensionMaterial, talentMaterial } =
    CharacterData.getRequiredMaterial({
      name,
    })

  return RemixNode.json<LoaderData>({
    character,
    ascensionMaterial,
    talentMaterial,
  })
}

export default function CharacterPage() {
  const { character, ascensionMaterial, talentMaterial } =
    RemixReact.useLoaderData() as LoaderData
  const [hideAscension, setHideAscension] = React.useState(
    character.progression?.ascension === 6
  )
  const [hideTalent, setHideTalent] = React.useState(false)
  const [hideElementalTalent, setHideElementalTalent] = React.useState(false)

  const ascensionTable = ReactTable.useReactTable({
    data: ascensionMaterial,
    columns: Column.ascension,
    getCoreRowModel: ReactTable.getCoreRowModel(),
    state: {
      columnVisibility: {
        boss: !character.name.includes('Traveler'),
      },
    },
  })

  const talentTable = ReactTable.useReactTable({
    data: Array.isArray(talentMaterial)
      ? talentMaterial
      : talentMaterial.normal,
    columns: Column.talent,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  const talentElementalTable = ReactTable.useReactTable({
    data: Array.isArray(talentMaterial) ? [] : talentMaterial.elemental,
    columns: Column.talent,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  if (Array.isArray(talentMaterial)) {
    return (
      <>
        <ItemTable.Table
          heading="Ascension"
          switchLabel="Hide ascension table"
          switchState={[hideAscension, setHideAscension]}
          table={ascensionTable}
          ascensionPhase={character.progression?.ascension ?? 0}
        />
        <ItemTable.Table
          heading={CustomHeading.Character({
            talentName: character.talent,
            name: character.name,
            weapon: character.weapon,
          })}
          switchLabel="Hide talent table"
          switchState={[hideTalent, setHideTalent]}
          table={talentTable}
          talentLevel={[
            character.progression?.normalAttack ?? 1,
            character.progression?.elementalSkill ?? 1,
            character.progression?.elementalBurst ?? 1,
          ]}
          customAddionalFirstCellElement={CharacterCustomFirstCell({
            name: character.name,
            weapon: character.weapon,
            talent: ['normal_attack', 'elemental_skill', 'elemental_burst'],
            talentName: character.talent,
          })}
        />
      </>
    )
  }

  return (
    <>
      <ItemTable.ItemTable
        heading="Ascension"
        switchLabel="Hide ascension table"
        switchState={[hideAscension, setHideAscension]}
        table={ascensionTable}
        ascensionPhase={character.progression?.ascension ?? 0}
      />

      <ItemTable.ItemTableElementalTraveler
        heading={CustomHeading.TravelerGeo({
          talentName: character.talent[0],
          name: character.name,
          talent: 'normal',
        })}
        switchLabel="Hide normal talent table"
        switchState={[hideTalent, setHideTalent]}
        table={talentTable}
        talentLevel={character.progression?.normalAttack ?? 1}
      />
      <ItemTable.ItemTableElementalTraveler
        heading={CustomHeading.TravelerGeo({
          talentName: [character.talent[1], character.talent[2]],
          name: character.name,
          talent: 'elemental',
        })}
        switchLabel="Hide elemental talent table"
        switchState={[hideElementalTalent, setHideElementalTalent]}
        table={talentElementalTable}
        talentLevel={[
          character.progression?.elementalSkill ?? 1,
          character.progression?.elementalBurst ?? 1,
        ]}
        customAddionalFirstCellElement={CharacterCustomFirstCell({
          name: character.name,
          talent: ['elemental_skill', 'elemental_burst'],
          talentName: [character.talent[1], character.talent[2]],
        })}
      />
    </>
  )
}
