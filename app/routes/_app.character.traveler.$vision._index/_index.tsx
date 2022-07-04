import type { LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useMemo, useState } from 'react'
import Image, { MimeType } from 'remix-image'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import CharacterCustomFirstCell from '~/components/CharacterCustomFirstCell'
import CharacterCustomTableHeading from '~/components/CharacterCustomTableHeading'
import Icon from '~/components/Icon'
import { ItemTable, ItemTableElementalTraveler } from '~/components/ItemTable'
import TableCell from '~/components/TableCell'
import Tooltip from '~/components/Tooltip'
import type { CharacterMinimal } from '~/data/characters'
import { getCharacter, getTravelerRequiredMaterial } from '~/data/characters'
import { getUserCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import { getImageSrc, toCapitalized } from '~/utils'

type LoaderData = {
	traveler: CharacterMinimal
	vision: string
	ascensionMaterial: ReturnType<
		typeof getTravelerRequiredMaterial
	>['ascensionMaterial']
	talentMaterial: ReturnType<
		typeof getTravelerRequiredMaterial
	>['talentMaterial']
}

export const loader: LoaderFunction = async ({ request, params }) => {
	const accId = await requireAccountId(request)
	const { vision } = params
	invariant(vision)

	const visionSchema = z.enum([
		'Anemo',
		'Geo',
		'Electro',
		'Dendro',
		'Hydro',
		'Pyro',
		'Cryo',
	])
	const parsedVision = visionSchema.safeParse(toCapitalized(vision))

	if (!parsedVision.success) {
		throw json(`Traveler ${parsedVision} not found`, {
			status: 404,
			statusText: 'Page Not Found',
		})
	}

	const userCharacter = await getUserCharacter({
		name: `Traveler ${parsedVision.data}`,
		accId,
	})
	const traveler = getCharacter({
		name: 'Traveler',
		characterData: userCharacter,
	})
	invariant(traveler)
	const { ascensionMaterial, talentMaterial } = getTravelerRequiredMaterial({
		vision: parsedVision.data,
	})

	console.log(traveler.progression)

	return json<LoaderData>({
		traveler,
		vision: parsedVision.data,
		ascensionMaterial,
		talentMaterial,
	})
}

export default function TravelerRequiredItemsPage() {
	const { traveler, vision, ascensionMaterial, talentMaterial } =
		useLoaderData() as LoaderData
	const [hideAscension, setHideAscension] = useState(false)
	const [hideNormalTalent, setHideNormalTalent] = useState(false)
	const [hideElementalTalent, setHideElementalTalent] = useState(false)

	const ascensionColumns = useMemo(
		() => [
			{
				Header: 'Phase',
				accessor: 'phase',
				Cell: ({ value }: { value: { from: number; to: number } }) => (
					<div className="flex items-center gap-1">
						<span className="tabular-nums">{value.from}</span>
						<span className="sr-only">To</span>
						<Icon
							type="solid"
							name="arrowSmRight"
							aria-hidden
							className="h-4 w-4"
						/>
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
						<Icon
							type="solid"
							name="arrowSmRight"
							aria-hidden
							className="h-4 w-4"
						/>
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

	const ascensionData = useMemo(
		() => (hideAscension ? [] : [...ascensionMaterial]),
		[hideAscension, ascensionMaterial]
	)

	const normalTalentData = useMemo(
		() => (hideNormalTalent ? [] : [...talentMaterial.normal]),
		[hideNormalTalent, talentMaterial.normal]
	)

	const elementalSkillTalentData = useMemo(
		() => (hideElementalTalent ? [] : [...talentMaterial.elemental]),
		[hideElementalTalent, talentMaterial.elemental]
	)

	const talent = traveler.talent as {
		[key: string]: {
			normalAttack: string
			elementalSkill: string
			elementalBurst: string
		}
	}

	return (
		<>
			<ItemTable
				uid="ascension"
				heading="Ascension"
				switchLabel="Hide ascension table"
				switchState={[hideAscension, setHideAscension]}
				columns={ascensionColumns}
				data={ascensionData}
				ascensionPhase={traveler.progression?.ascension ?? 0}
			/>
			{vision === 'Geo' ? (
				<>
					<ItemTableElementalTraveler
						uid="normal-talent"
						heading={CustomTableHeading({
							talentName: talent[vision].normalAttack,
							name: `Traveler ${vision}`,
							talent: 'normal',
						})}
						switchLabel="Hide normal talent table"
						switchState={[hideNormalTalent, setHideNormalTalent]}
						columns={talentColumns}
						data={normalTalentData}
						talentLevel={traveler.progression?.normalAttack ?? 1}
					/>
					<ItemTableElementalTraveler
						uid="elemental-talent"
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
						columns={talentColumns}
						data={elementalSkillTalentData}
						talentLevel={[
							traveler.progression?.elementalSkill ?? 1,
							traveler.progression?.elementalBurst ?? 1,
						]}
						customAddionalFirstCellElement={[
							CharacterCustomFirstCell({
								name: `${traveler.name} ${vision}`,
								weapon: traveler.weapon,
								talent: 'Elemental_Skill',
								talentName: talent[vision].elementalSkill,
							}),
							CharacterCustomFirstCell({
								name: `${traveler.name} ${vision}`,
								weapon: traveler.weapon,
								talent: 'Elemental_Burst',
								talentName: talent[vision].elementalBurst,
							}),
						]}
					/>
				</>
			) : (
				<ItemTable
					uid="normal-talent"
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
					columns={talentColumns}
					data={normalTalentData}
					talentLevel={[
						traveler.progression?.normalAttack ?? 1,
						traveler.progression?.elementalSkill ?? 1,
						traveler.progression?.elementalBurst ?? 1,
					]}
					customAddionalFirstCellElement={[
						CharacterCustomFirstCell({
							name: `${traveler.name} ${vision}`,
							weapon: traveler.weapon,
							talent: 'Normal_Attack',
							talentName: talent[vision].normalAttack,
						}),
						CharacterCustomFirstCell({
							name: `${traveler.name} ${vision}`,
							weapon: traveler.weapon,
							talent: 'Elemental_Skill',
							talentName: talent[vision].elementalSkill,
						}),
						CharacterCustomFirstCell({
							name: `${traveler.name} ${vision}`,
							weapon: traveler.weapon,
							talent: 'Elemental_Burst',
							talentName: talent[vision].elementalBurst,
						}),
					]}
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
							<Image
								src={`/image/talent/${t}_${getImageSrc(name)}.png`}
								alt=""
								className="h-8 w-8 flex-shrink-0"
								responsive={[{ size: { width: 32, height: 32 } }]}
								options={{ contentType: MimeType.WEBP }}
								dprVariants={[1, 2, 3]}
							/>
						</Tooltip>
					))
				) : (
					<Tooltip text={talentName}>
						<Image
							src={`/image/talent/Normal_Attack_Sword.png`}
							alt=""
							className="h-8 w-8 flex-shrink-0"
							responsive={[{ size: { width: 32, height: 32 } }]}
							options={{ contentType: MimeType.WEBP }}
							dprVariants={[1, 2, 3]}
						/>
					</Tooltip>
				)}
			</span>
		</>
	)
}
