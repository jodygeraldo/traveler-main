import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { getFormData, useFormInputProps } from 'remix-params-helper'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import ManualLevelForm from '~/components/ManualLevelForm'
import { validateAscensionRequirement } from '~/data/characters'
import { getUserCharacters, upsertCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import { toCapitalized } from '~/utils'

const ParamsSchema = z.object({
	level: z.number().min(1).max(90),
	ascension: z.number().min(0).max(6),
	normalAttack: z.number().min(1).max(10),
	elementalSkill: z.number().min(1).max(10),
	elementalBurst: z.number().min(1).max(10),
	travelersData: z.string(),
})

type ActionData = {
	success: boolean
	errors?: { [key: string]: string }
}

export const action: ActionFunction = async ({ request, params }) => {
	const accId = await requireAccountId(request)
	const { vision } = params
	invariant(vision)

	const result = await getFormData(request, ParamsSchema)
	if (!result.success) {
		return json<ActionData>(
			{ success: result.success, errors: result.errors },
			{ status: 400 }
		)
	}

	const { travelersData, ...progression } = result.data
	const errors = validateAscensionRequirement(progression)
	if (errors) {
		console.log(errors)
		return json<ActionData>({ success: false, errors }, { status: 400 })
	}

	const characterSchema = z.enum([
		'Traveler Anemo',
		'Traveler Geo',
		'Traveler Electro',
		// 'Traveler Dendro',
		// 'Traveler Hydro',
		// 'Traveler Pyro',
		// 'Traveler Cryo',
	])
	const travelersDataSchema = z.array(
		z.object({
			name: z.string(),
			level: z.number(),
			ascension: z.number(),
			normalAttack: z.number(),
			elementalSkill: z.number(),
			elementalBurst: z.number(),
		})
	)

	const parsedTravelersData = travelersDataSchema.parse(
		JSON.parse(travelersData)
	)

	const parsedCharacter = characterSchema.parse(
		toCapitalized(`Traveler ${vision}`)
	)
	await upsertCharacter({
		name: parsedCharacter,
		progression,
		accId,
		otherTravelers: parsedTravelersData,
	})
	return json<ActionData>({ success: true })
}

export type CharacterData = {
	name: string
	level: number
	ascension: number
	normalAttack: number
	elementalSkill: number
	elementalBurst: number
}

type LoaderData = {
	travelerData: CharacterData
	otherTravelersData: CharacterData[]
}

export const loader: LoaderFunction = async ({ request, params }) => {
	const accId = await requireAccountId(request)
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

	const travelerSchema = z.enum(validTraveler)
	const parsedTraveler = travelerSchema.parse(
		toCapitalized(`Traveler ${vision}`)
	)

	const userTravelers = await getUserCharacters({ isTraveler: true, accId })
	const currentTraveler = userTravelers?.find((c) => c.name === parsedTraveler)

	const otherTravelers = validTraveler.filter(
		(traveler) => traveler !== parsedTraveler
	)

	const travelerData: CharacterData = {
		name: parsedTraveler,
		level: currentTraveler?.['@level'] ?? 1,
		ascension: currentTraveler?.['@ascension'] ?? 0,
		normalAttack: currentTraveler?.['@normal_attack'] ?? 1,
		elementalSkill: currentTraveler?.['@elemental_skill'] ?? 1,
		elementalBurst: currentTraveler?.['@elemental_burst'] ?? 1,
	}

	const otherTravelersData: CharacterData[] = otherTravelers.map((traveler) => {
		const otherTraveler = userTravelers?.find((c) => c.name === traveler)
		return {
			name: traveler,
			level: otherTraveler?.['@level'] ?? 1,
			ascension: otherTraveler?.['@ascension'] ?? 0,
			normalAttack: otherTraveler?.['@normal_attack'] ?? 1,
			elementalSkill: otherTraveler?.['@elemental_skill'] ?? 1,
			elementalBurst: otherTraveler?.['@elemental_burst'] ?? 1,
		}
	})

	return json<LoaderData>({ travelerData, otherTravelersData })
}

export default function TravelerManualLevelupPage() {
	const { travelerData, otherTravelersData } = useLoaderData() as LoaderData
	const actionData = useActionData<ActionData>()
	const inputProps = useFormInputProps(ParamsSchema)

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
