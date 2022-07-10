import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import type * as RemixParamsHelper from 'remix-params-helper'
import type * as CharacterData from '~/data/characters'
import Button from './Button'
import Notification from './Notification'

interface Props {
  progression: CharacterData.Character['progression']
  inputProps: (key: string, options?: any) => RemixParamsHelper.InputPropType
  errors?: { [key: string]: string }
  submitSuccess?: boolean
}

export default function ManualLevelForm({
  progression,
  inputProps,
  errors,
  submitSuccess,
}: Props) {
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
              defaultValue={progression?.level ?? 1}
              error={errors?.level}
              inputProps={inputProps('level')}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <InputField
              id="ascension"
              label="Ascension"
              defaultValue={progression?.ascension ?? 0}
              min={0} // the params helper not correctly read the min value (0)
              error={errors?.ascension}
              inputProps={inputProps('ascension')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="normal-attack"
              label="Normal Attack"
              defaultValue={progression?.normalAttack ?? 1}
              error={errors?.normalAttack}
              inputProps={inputProps('normalAttack')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="elemental-skill"
              label="elemental Skill"
              defaultValue={progression?.elementalSkill ?? 1}
              error={errors?.elementalSkill}
              inputProps={inputProps('elementalSkill')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="elemental-burst"
              label="elemental Burst"
              defaultValue={progression?.elementalBurst ?? 1}
              error={errors?.elementalBurst}
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
      <Notification key={location.key} success={submitSuccess} />
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
