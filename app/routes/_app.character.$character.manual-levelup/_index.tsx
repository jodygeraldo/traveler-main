import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import ManualLevelForm from '~/components/ManualLevelForm'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'

const ParamsSchema = Zod.object({
  level: Zod.number().min(1).max(90),
  ascension: Zod.number().min(0).max(6),
  normalAttack: Zod.number().min(1).max(10),
  elementalSkill: Zod.number().min(1).max(10),
  elementalBurst: Zod.number().min(1).max(10),
})

interface ActionData {
  success: boolean
  errors?: { [key: string]: string }
}

export const action: RemixNode.ActionFunction = async ({ request, params }) => {
  const accId = await Session.requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    return RemixNode.json<ActionData>(
      { success: result.success, errors: result.errors },
      { status: 400 }
    )
  }

  const errors = CharacterData.validateAscensionRequirement(result.data)
  if (errors) {
    console.log(errors)
    return RemixNode.json<ActionData>(
      { success: false, errors },
      { status: 400 }
    )
  }

  await CharacterModel.upsertCharacter({
    name: characterName,
    progression: result.data,
    accId,
  })
  return RemixNode.json<ActionData>({ success: true })
}

interface LoaderData {
  characterData: CharacterData.CharacterData
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
  const accId = await Session.requireAccountId(request)
  const { character: characterName } = params
  invariant(characterName)

  const userCharacter = await CharacterModel.getUserCharacter({
    name: characterName,
    accId,
  })

  const characterData: CharacterData.CharacterData = {
    name: characterName,
    level: userCharacter?.['@level'] ?? 1,
    ascension: userCharacter?.['@ascension'] ?? 0,
    normalAttack: userCharacter?.['@normal_attack'] ?? 1,
    elementalSkill: userCharacter?.['@elemental_skill'] ?? 1,
    elementalBurst: userCharacter?.['@elemental_burst'] ?? 1,
  }

  return RemixNode.json<LoaderData>({ characterData })
}

export default function CharacterManualLevelupPage() {
  const { characterData } = RemixReact.useLoaderData() as LoaderData
  const actionData = RemixReact.useActionData<ActionData>()
  const inputProps = RemixParamsHelper.useFormInputProps(ParamsSchema)

  return (
    <ManualLevelForm
      inputProps={inputProps}
      errors={actionData?.errors}
      defaultValues={characterData}
      submitSuccess={actionData?.success}
    />
  )
}
