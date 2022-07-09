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
  const accountId = await Session.requireAccountId(request)
  const { name } = params
  invariant(name)

  const result = await RemixParamsHelper.getFormData(request, ParamsSchema)
  if (!result.success) {
    return RemixNode.json<ActionData>(
      { success: result.success, errors: result.errors },
      { status: 400 }
    )
  }

  const errors = CharacterData.validateAscensionRequirement({
    progression: result.data,
  })
  if (errors) {
    return RemixNode.json<ActionData>(
      { success: false, errors },
      { status: 400 }
    )
  }

  await CharacterModel.upsertCharacter({
    name,
    progression: result.data,
    accountId,
  })
  return RemixNode.json<ActionData>({ success: true })
}

interface LoaderData {
  character: CharacterData.Character
}

export const loader: RemixNode.LoaderFunction = async ({ request, params }) => {
  const accId = await Session.requireAccountId(request)
  const { name } = params
  invariant(name)

  const userCharacter = await CharacterModel.getUserCharacter({
    name,
    accountId: accId,
  })

  const character = CharacterData.getCharacter({
    name,
    userCharacter,
  })

  return RemixNode.json<LoaderData>({ character })
}

export default function CharacterManualLevelupPage() {
  const { character } = RemixReact.useLoaderData() as LoaderData
  const actionData = RemixReact.useActionData<ActionData>()
  const inputProps = RemixParamsHelper.useFormInputProps(ParamsSchema)

  return (
    <ManualLevelForm
      inputProps={inputProps}
      errors={actionData?.errors}
      progression={character.progression}
      submitSuccess={actionData?.success}
    />
  )
}
