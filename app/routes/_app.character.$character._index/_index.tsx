import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as ReactTable from '@tanstack/react-table'
import * as React from 'react'
import invariant from 'tiny-invariant'
import CharacterCustomFirstCell from '~/components/CharacterCustomFirstCell'
import CharacterCustomTableHeading from '~/components/CharacterCustomTableHeading'
import * as ItemTable from '~/components/ItemTable'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Column from './column'

interface LoaderData {
  character: CharacterData.CharacterMinimal
  ascensionMaterial: CharacterData.CharacterAscension[]
  talentMaterial: CharacterData.CharacterTalent[]
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
  const accId = await Session.requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const userCharacter = await CharacterModel.getUserCharacter({
    name: characterName,
    accId,
  })
  const character = CharacterData.getCharacter({
    name: characterName,
    characterData: userCharacter,
  })
  if (!character) {
    throw RemixNode.json(`Character ${characterName} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  const { ascensionMaterial, talentMaterial } =
    CharacterData.getCharacterRequiredMaterial({
      name: characterName,
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

  const ascensionTable = ReactTable.useReactTable({
    data: ascensionMaterial,
    // @ts-ignore - this is a valid column definition
    columns: Column.ascension,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  const talentTable = ReactTable.useReactTable({
    data: talentMaterial,
    columns: Column.talent,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  const talent = character.talent as [string, string, string] // this should be fine because the only time it is an array is because it's traveler but traveler handled on different page

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
        heading={CharacterCustomTableHeading({
          talentName: talent,
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
          talent: ['Normal_Attack', 'Elemental_Skill', 'Elemental_Burst'],
          talentName: talent,
        })}
      />
    </>
  )
}
