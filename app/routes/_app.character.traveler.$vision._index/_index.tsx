import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as ReactTable from '@tanstack/react-table'
import * as React from 'react'
import * as RemixImage from 'remix-image'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import CharacterCustomFirstCell from '~/components/CharacterCustomFirstCell'
import CharacterCustomTableHeading from '~/components/CharacterCustomTableHeading'
import * as ItemTable from '~/components/ItemTable'
import Tooltip from '~/components/Tooltip'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as Column from './column'

interface LoaderData {
  traveler: CharacterData.CharacterMinimal
  vision: string
  ascensionMaterial: CharacterData.CharacterAscension[]
  talentMaterial: {
    normal: CharacterData.CharacterTalent[]
    elemental: CharacterData.CharacterTalent[]
  }
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
  const accId = await Session.requireAccountId(request)
  const { vision } = params
  invariant(vision)

  const visionSchema = Zod.enum([
    'Anemo',
    'Geo',
    'Electro',
    'Dendro',
    'Hydro',
    'Pyro',
    'Cryo',
  ])
  const parsedVision = visionSchema.safeParse(Utils.toCapitalized(vision))

  if (!parsedVision.success) {
    throw RemixNode.json(`Traveler ${parsedVision} not found`, {
      status: 404,
      statusText: 'Page Not Found',
    })
  }

  const userCharacter = await CharacterModel.getUserCharacter({
    name: `Traveler ${parsedVision.data}`,
    accId,
  })
  const traveler = CharacterData.getCharacter({
    name: 'Traveler',
    characterData: userCharacter,
  })
  invariant(traveler)
  const { ascensionMaterial, talentMaterial } =
    CharacterData.getRequiredMaterial({
      name: `Traveler ${parsedVision.data}`,
    })
  // traveler always return talentMaterial as object
  invariant(!Array.isArray(talentMaterial))

  return RemixNode.json<LoaderData>({
    traveler,
    vision: parsedVision.data,
    ascensionMaterial,
    talentMaterial,
  })
}

export default function TravelerRequiredItemsPage() {
  const { traveler, vision, ascensionMaterial, talentMaterial } =
    RemixReact.useLoaderData() as LoaderData
  const [hideAscension, setHideAscension] = React.useState(
    traveler.progression?.ascension === 6
  )
  const [hideNormalTalent, setHideNormalTalent] = React.useState(false)
  const [hideElementalTalent, setHideElementalTalent] = React.useState(false)

  const ascensionTable = ReactTable.useReactTable({
    data: ascensionMaterial,
    columns: Column.ascension,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  const talentNormalTable = ReactTable.useReactTable({
    data: talentMaterial.normal,
    columns: Column.talent,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  const talentElementalTable = ReactTable.useReactTable({
    data: talentMaterial.elemental,
    columns: Column.talent,
    getCoreRowModel: ReactTable.getCoreRowModel(),
  })

  const talent = traveler.talent as {
    [key: string]: {
      normalAttack: string
      elementalSkill: string
      elementalBurst: string
    }
  }

  return (
    <>
      <ItemTable.ItemTable
        heading="Ascension"
        switchLabel="Hide ascension table"
        switchState={[hideAscension, setHideAscension]}
        table={ascensionTable}
        ascensionPhase={traveler.progression?.ascension ?? 0}
      />
      {vision === 'Geo' ? (
        <>
          <ItemTable.ItemTableElementalTraveler
            heading={CustomTableHeading({
              talentName: talent[vision].normalAttack,
              name: `Traveler ${vision}`,
              talent: 'normal',
            })}
            switchLabel="Hide normal talent table"
            switchState={[hideNormalTalent, setHideNormalTalent]}
            table={talentNormalTable}
            talentLevel={traveler.progression?.normalAttack ?? 1}
          />
          <ItemTable.ItemTableElementalTraveler
            heading={CustomTableHeading({
              talentName: [
                talent[vision].elementalSkill,
                talent[vision].elementalBurst,
              ],
              name: `Traveler ${vision}`,
              talent: 'elemental',
            })}
            switchLabel="Hide elemental talent table"
            switchState={[hideElementalTalent, setHideElementalTalent]}
            table={talentElementalTable}
            talentLevel={[
              traveler.progression?.elementalSkill ?? 1,
              traveler.progression?.elementalBurst ?? 1,
            ]}
            customAddionalFirstCellElement={CharacterCustomFirstCell({
              name: `${traveler.name} ${vision}`,
              talent: ['Elemental_Skill', 'Elemental_Burst'],
              talentName: [
                talent[vision].elementalSkill,
                talent[vision].elementalBurst,
              ],
            })}
          />
        </>
      ) : (
        <ItemTable.ItemTable
          heading={CharacterCustomTableHeading({
            talentName: [
              talent[vision].normalAttack,
              talent[vision].elementalSkill,
              talent[vision].elementalBurst,
            ],
            name: `${traveler.name} ${vision}`,
            weapon: traveler.weapon,
          })}
          switchLabel="Hide talent table"
          switchState={[hideNormalTalent, setHideNormalTalent]}
          table={talentNormalTable}
          talentLevel={[
            traveler.progression?.normalAttack ?? 1,
            traveler.progression?.elementalSkill ?? 1,
            traveler.progression?.elementalBurst ?? 1,
          ]}
          customAddionalFirstCellElement={CharacterCustomFirstCell({
            name: `${traveler.name} ${vision}`,
            talent: ['Normal_Attack', 'Elemental_Skill', 'Elemental_Burst'],
            weapon: traveler.weapon,
            talentName: [
              talent[vision].normalAttack,
              talent[vision].elementalSkill,
              talent[vision].elementalBurst,
            ],
          })}
        />
      )}
    </>
  )
}

function CustomTableHeading({
  talentName,
  name,
  talent,
}:
  | {
      talentName: [string, string]
      name: string
      talent: 'elemental'
    }
  | {
      talentName: string
      name: string
      talent: 'normal'
    }) {
  const elemental = ['Elemental_Skill', 'Elemental_Burst'] as const
  return (
    <>
      {talent === 'normal' ? 'Normal Attack' : 'Elemental'} Talent
      <span className="ml-2 inline-flex flex-shrink-0 gap-1 rounded-full bg-gray-2 p-1">
        {talent === 'elemental' ? (
          elemental.map((t, i) => (
            <Tooltip key={talentName[i]} text={talentName[i]}>
              <RemixImage.Image
                src={`/image/talent/${t}_${Utils.getImageSrc(name)}.png`}
                alt=""
                className="h-8 w-8 flex-shrink-0"
                width={32}
                height={32}
                responsive={[{ size: { width: 32, height: 32 } }]}
                dprVariants={[1, 2, 3]}
              />
            </Tooltip>
          ))
        ) : (
          <Tooltip text={talentName}>
            <RemixImage.Image
              src={`/image/talent/Normal_Attack_Sword.png`}
              alt=""
              className="h-8 w-8 flex-shrink-0"
              width={32}
              height={32}
              responsive={[{ size: { width: 32, height: 32 } }]}
              dprVariants={[1, 2, 3]}
            />
          </Tooltip>
        )}
      </span>
    </>
  )
}
