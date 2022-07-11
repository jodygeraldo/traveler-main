import * as RemixNode from '@remix-run/node'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as RemixParamsHelper from 'remix-params-helper'
import invariant from 'tiny-invariant'
import * as Zod from 'zod'
import Button from '~/components/Button'
import Notification from '~/components/Notification'
import * as CharacterData from '~/data/characters'
import * as CharacterModel from '~/models/character.server'
import * as Session from '~/session.server'

export const meta: RemixNode.MetaFunction = ({ params }) => ({
  title: `${params.name} Manual Level Up - Traveler Main`,
  description: `Set ${params.name} progression manually`,
})

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
    progression: userCharacter,
  })

  return RemixNode.json<LoaderData>({ character })
}

export default function CharacterManualLevelupPage() {
  const { character } = RemixReact.useLoaderData() as LoaderData
  const actionData = RemixReact.useActionData<ActionData>()
  const inputProps = RemixParamsHelper.useFormInputProps(ParamsSchema)
  const location = RemixReact.useLocation()
  const transition = RemixReact.useTransition()
  const busy = transition.state === 'submitting'

  return (
    <div className="mt-8">
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

function InputField({
  id,
  label,
  defaultValue,
  error,
  inputProps,
  min,
}: {
  label: string
  defaultValue?: string | number
  error?: string
  id: string
  inputProps: RemixParamsHelper.InputPropType
  min?: number
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-12">
        {label}{' '}
        <span
          className={clsx(
            !inputProps.required && 'hidden',
            'text-sm text-gray-11'
          )}
        >
          *
        </span>
      </label>
      <input
        id={id}
        className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
        defaultValue={defaultValue}
        min={min}
        {...inputProps}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
      />
      <p className="mt-2 text-sm text-danger-9" id={`${id}-error`}>
        {error}
      </p>
    </>
  )
}
