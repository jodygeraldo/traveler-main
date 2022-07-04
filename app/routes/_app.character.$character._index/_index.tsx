import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as React from 'react'
import invariant from 'tiny-invariant'
import CharacterCustomFirstCell from '~/components/CharacterCustomFirstCell'
import CharacterCustomTableHeading from '~/components/CharacterCustomTableHeading'
import * as Icon from '~/components/Icon'
import * as ItemTable from '~/components/ItemTable'
import TableCell from '~/components/TableCell'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'

interface LoaderData {
	character: CharacterData.CharacterMinimal
	ascensionMaterial: ReturnType<
		typeof CharacterData.getCharacterRequiredMaterial
	>['ascensionMaterial']
	talentMaterial: ReturnType<
		typeof CharacterData.getCharacterRequiredMaterial
	>['talentMaterial']
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
	const [hideAscension, setHideAscension] = React.useState(false)
	const [hideTalent, setHideTalent] = React.useState(false)

	const ascensionColumns = React.useMemo(
		() => [
			{
				Header: 'Phase',
				accessor: 'phase',
				Cell: ({ value }: { value: { from: number; to: number } }) => (
					<div className="flex items-center gap-1">
						<span className="tabular-nums">{value.from}</span>
						<span className="sr-only">To</span>
						<Icon.Solid name="arrowSmRight" aria-hidden className="h-4 w-4" />
						<span className="tabular-nums">{value.to}</span>
					</div>
				),
			},
			{
				Header: 'Mora',
				accessor: 'mora',
				Cell: ({ value }: { value: number }) => (
					<TableCell quantity={value} text="Mora" />
				),
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

	const talentColumns = React.useMemo(
		() => [
			{
				Header: 'Level',
				accessor: 'level',
				Cell: ({ value }: { value: { from: number; to: number } }) => (
					<div className="flex items-center gap-1">
						<span className="tabular-nums">{value.from}</span>
						<span className="sr-only">To</span>
						<Icon.Solid name="arrowSmRight" aria-hidden className="h-4 w-4" />
						<span className="tabular-nums">{value.to}</span>
					</div>
				),
			},
			{
				Header: 'Mora',
				accessor: 'mora',
				Cell: ({ value }: { value: number }) => (
					<TableCell quantity={value} text="Mora" />
				),
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

	const ascensionData = React.useMemo(
		() => (hideAscension ? [] : [...ascensionMaterial]),
		[hideAscension, ascensionMaterial]
	)

	const talentData = React.useMemo(
		() => (hideTalent ? [] : [...talentMaterial]),
		[hideTalent, talentMaterial]
	)

	const talent = character.talent as [string, string, string] // this should be fine because the only time it is an array is because it's traveler but traveler handled on different page

	return (
		<>
			<ItemTable.Table
				uid="ascension"
				heading="Ascension"
				switchLabel="Hide ascension table"
				switchState={[hideAscension, setHideAscension]}
				columns={ascensionColumns}
				data={ascensionData}
				ascensionPhase={character.progression?.ascension ?? 0}
			/>
			<ItemTable.Table
				uid="normal-talent"
				heading={CharacterCustomTableHeading({
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
					CharacterCustomFirstCell({
						name: character.name,
						weapon: character.weapon,
						talent: 'Normal_Attack',
						talentName: talent[0],
					}),
					CharacterCustomFirstCell({
						name: character.name,
						talent: 'Elemental_Skill',
						talentName: talent[1],
					}),
					CharacterCustomFirstCell({
						name: character.name,
						talent: 'Elemental_Burst',
						talentName: talent[2],
					}),
				]}
			/>
		</>
	)
}
