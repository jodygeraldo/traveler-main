import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import * as RemixParamsHelper from 'remix-params-helper'
import * as Zod from 'zod'
import Button from '~/components/Button'
import Notification from '~/components/Notification'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'
import * as Utils from '~/utils'
import * as CharacterUtils from '~/utils/server/character.server'
import InputField from './InputField'

export const meta: RemixNode.MetaFunction = ({ params }) => ({
  title: `${Utils.deslugify(
    params.name ?? ''
  )} Manual Level Up - Traveler Main`,
  description: `Set ${Utils.deslugify(params.name ?? '')} progression manually`,
})

const FormDataSchema = Zod.object({
  level: Zod.number().min(1).max(90),
  ascension: Zod.number().min(0).max(6),
  normalAttack: Zod.number().min(1).max(10),
  elementalSkill: Zod.number().min(1).max(10),
  elementalBurst: Zod.number().min(1).max(10),
})

export async function action({ params, request }: RemixNode.ActionArgs) {
  const accountId = await Session.requireAccountId(request)

  const name = Zod.string()
    .transform((str) => Utils.deslugify(str))
    .parse(params.name)
  if (!CharacterUtils.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const result = await RemixParamsHelper.getFormData(request, FormDataSchema)
  if (!result.success) {
    return RemixNode.json(
      { success: result.success, errors: result.errors },
      { status: 400 }
    )
  }

  const progression = { ...result.data }
  const errors = CharacterUtils.validateAscensionRequirement(progression)
  if (errors) {
    return RemixNode.json({ success: false, errors }, { status: 400 })
  }

  await CharacterModel.upsertCharacter({
    name,
    progression,
    accountId,
  })
  return RemixNode.json(
    { success: true, errors: {} },
    { statusText: 'SUCCESS' }
  )
}

export async function loader({ params, request }: RemixNode.LoaderArgs) {
  const accId = await Session.requireAccountId(request)

  const name = Zod.string()
    .transform((str) => Utils.deslugify(str))
    .parse(params.name)
  if (!CharacterUtils.validateCharacter(name)) {
    throw RemixNode.json(
      { message: `There is no character with name ${name}` },
      { status: 404, statusText: 'Character not found' }
    )
  }

  const userCharacter = await CharacterModel.getUserCharacter({
    name,
    accountId: accId,
  })

  const character = CharacterUtils.getCharacterProgression({
    name,
    progression: userCharacter,
  })

  return RemixNode.json({ character })
}

export default function CharacterManualLevelupPage() {
  const { character } = RemixReact.useLoaderData<typeof loader>()
  const actionData = RemixReact.useActionData<typeof action>()
  const inputProps = RemixParamsHelper.useFormInputProps(FormDataSchema)
  const location = RemixReact.useLocation()
  const transition = RemixReact.useTransition()
  const busy = transition.state === 'submitting'

  return (
    <div className="mt-12">
      <RemixReact.Form method="post">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <InputField
              id="level"
              label="Level"
              defaultValue={character.progression?.level ?? 1}
              error={actionData?.errors?.level}
              inputProps={inputProps('level')}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <InputField
              id="ascension"
              label="Ascension"
              defaultValue={character.progression?.ascension ?? 0}
              min={0} // the params helper not correctly read the min value (0)
              error={actionData?.errors?.ascension}
              inputProps={inputProps('ascension')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="normal-attack"
              label="Normal Attack"
              defaultValue={character.progression?.normalAttack ?? 1}
              error={actionData?.errors?.normalAttack}
              inputProps={inputProps('normalAttack')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="elemental-skill"
              label="elemental Skill"
              defaultValue={character.progression?.elementalSkill ?? 1}
              error={actionData?.errors?.elementalSkill}
              inputProps={inputProps('elementalSkill')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="elemental-burst"
              label="elemental Burst"
              defaultValue={character.progression?.elementalBurst ?? 1}
              error={actionData?.errors?.elementalBurst}
              inputProps={inputProps('elementalBurst')}
            />
          </div>
        </div>
        <div className="mt-8 text-right">
          <Button type="submit" focusRing={1} disabled={busy}>
            {busy ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </RemixReact.Form>
      <Notification key={location.key} success={actionData?.success} />
    </div>
  )
}
