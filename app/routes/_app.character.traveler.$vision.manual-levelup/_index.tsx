import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import ManualLevelForm from '~/components/ManualLevelForm'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'

const ParamsSchema = Zod.object({
	level: Zod.number().min(1).max(90),
	ascension: Zod.number().min(0).max(6),
	normalAttack: Zod.number().min(1).max(10),
	elementalSkill: Zod.number().min(1).max(10),
	elementalBurst: Zod.number().min(1).max(10),
	travelersData: Zod.string(),
})

interface ActionData {
	success: boolean
	errors?: { [key: string]: string }
}

export const action: RemixNode.ActionFunction = async ({ request, params }) => {
	const accId = await Session.requireAccountId(request)
	const { vision } = params
	invariant(vision)

	const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
	if (!result.success) {
		return RemixNode.json<ActionData>(
			{ success: result.success, errors: result.errors },
			{ status: 400 }
		)
	}

	const { travelersData, ...progression } = result.data
	const errors = CharacterData.validateAscensionRequirement(progression)
	if (errors) {
		console.log(errors)
		return RemixNode.json<ActionData>(
			{ success: false, errors },
			{ status: 400 }
		)
	}

	const characterSchema = Zod.enum([
		'Traveler Anemo',
		'Traveler Geo',
		'Traveler Electro',
		// 'Traveler Dendro',
		// 'Traveler Hydro',
		// 'Traveler Pyro',
		// 'Traveler Cryo',
	])
	const travelersDataSchema = Zod.array(
		Zod.object({
			name: Zod.string(),
			level: Zod.number(),
			ascension: Zod.number(),
			normalAttack: Zod.number(),
			elementalSkill: Zod.number(),
			elementalBurst: Zod.number(),
		})
	)

	const parsedTravelersData = travelersDataSchema.parse(
		JSON.parse(travelersData)
	)

	const parsedCharacter = characterSchema.parse(
		Utils.toCapitalized(`Traveler ${vision}`)
	)
	await CharacterModel.upsertCharacter({
		name: parsedCharacter,
		progression,
		accId,
		otherTravelers: parsedTravelersData,
	})
	return RemixNode.json<ActionData>({ success: true })
}

interface LoaderData {
	travelerData: CharacterData.CharacterData
	otherTravelersData: CharacterData.CharacterData[]
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
	const accId = await Session.requireAccountId(request)
	const { vision } = params
	invariant(vision)

	const validTraveler = [
		'Traveler Anemo',
		'Traveler Geo',
		'Traveler Electro',
		// 'Traveler Dendro',
		// 'Traveler Hydro',
		// 'Traveler Pyro',
		// 'Traveler Cryo',
	] as const

	const travelerSchema = Zod.enum(validTraveler)
	const parsedTraveler = travelerSchema.parse(
		Utils.toCapitalized(`Traveler ${vision}`)
	)

	const userTravelers = await CharacterModel.getUserCharacters({
		isTraveler: true,
		accId,
	})
	const currentTraveler = userTravelers?.find((c) => c.name === parsedTraveler)

	const otherTravelers = validTraveler.filter(
		(traveler) => traveler !== parsedTraveler
	)

	const travelerData: CharacterData.CharacterData = {
		name: parsedTraveler,
		level: currentTraveler?.['@level'] ?? 1,
		ascension: currentTraveler?.['@ascension'] ?? 0,
		normalAttack: currentTraveler?.['@normal_attack'] ?? 1,
		elementalSkill: currentTraveler?.['@elemental_skill'] ?? 1,
		elementalBurst: currentTraveler?.['@elemental_burst'] ?? 1,
	}

	const otherTravelersData: CharacterData.CharacterData[] = otherTravelers.map(
		(traveler) => {
			const otherTraveler = userTravelers?.find((c) => c.name === traveler)
			return {
				name: traveler,
				level: otherTraveler?.['@level'] ?? 1,
				ascension: otherTraveler?.['@ascension'] ?? 0,
				normalAttack: otherTraveler?.['@normal_attack'] ?? 1,
				elementalSkill: otherTraveler?.['@elemental_skill'] ?? 1,
				elementalBurst: otherTraveler?.['@elemental_burst'] ?? 1,
			}
		}
	)

	return RemixNode.json<LoaderData>({ travelerData, otherTravelersData })
}

export default function TravelerManualLevelupPage() {
	const { travelerData, otherTravelersData } =
		RemixReact.useLoaderData() as LoaderData
	const actionData = RemixReact.useActionData<ActionData>()
	const inputProps = RemixParamsHelper.useFormInputProps(ParamsSchema)

	return (
		<ManualLevelForm
			inputProps={inputProps}
			errors={actionData?.errors}
			defaultValues={travelerData}
			hiddenTravelersData={otherTravelersData}
			submitSuccess={actionData?.success}
		/>
	)
}
