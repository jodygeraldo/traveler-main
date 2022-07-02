import type { ActionFunction, LoaderFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useActionData, useLoaderData } from '@remix-run/react'
import { getFormData, useFormInputProps } from 'remix-params-helper'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import ManualLevelForm from '~/components/ManualLevelForm'
import { validateAscensionRequirement } from '~/data/characters'
import { getUserCharacter, upsertCharacter } from '~/models/character.server'
import { requireAccountId } from '~/session.server'
import type { CharacterData } from '../_app.character.traveler.$vision.manual-levelup/_index'

const ParamsSchema = z.object({
  level: z.number().min(1).max(90),
  ascension: z.number().min(0).max(6),
  normalAttack: z.number().min(1).max(10),
  elementalSkill: z.number().min(1).max(10),
  elementalBurst: z.number().min(1).max(10),
})

type ActionData = {
  success: boolean
  errors?: { [key: string]: string }
}

export const action: ActionFunction = async ({ request, params }) => {
  const accId = await requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const result = await getFormData(request, ParamsSchema)
  if (!result.success) {
    return json<ActionData>({ success: result.success, errors: result.errors }, { status: 400 })
  }

  const errors = validateAscensionRequirement(result.data)
  if (errors) {
    console.log(errors)
    return json<ActionData>({ success: false, errors }, { status: 400 })
  }

  await upsertCharacter({
    name: characterName,
    progression: result.data,
    accId,
  })
  return json<ActionData>({ success: true })
}

type LoaderData = {
  characterData: CharacterData
}

export const loader: LoaderFunction = async ({ request, params }) => {
  const accId = await requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const userCharacter = await getUserCharacter({ name: characterName, accId })

  const characterData: CharacterData = {
    name: characterName,
    level: userCharacter?.['@level'] ?? 1,
    ascension: userCharacter?.['@ascension'] ?? 0,
    normalAttack: userCharacter?.['@normal_attack'] ?? 1,
    elementalSkill: userCharacter?.['@elemental_skill'] ?? 1,
    elementalBurst: userCharacter?.['@elemental_burst'] ?? 1,
  }

  return json<LoaderData>({ characterData })
}

export default function CharacterManualLevelupPage() {
  const { characterData } = useLoaderData() as LoaderData
  const actionData = useActionData<ActionData>()
  const inputProps = useFormInputProps(ParamsSchema)

  return (
    <ManualLevelForm
      inputProps={inputProps}
      errors={actionData?.errors}
      defaultValues={characterData}
      submitSuccess={actionData?.success}
    />
  )
}
