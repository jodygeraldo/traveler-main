import * as HeadlessUIReact from '@headlessui/react'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import type * as RemixParamsHelper from 'remix-params-helper'
import type * as CharacterData from '~/data/characters'
import Button from './Button'
import * as Icon from './Icon'

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
  const notificationState = React.useState(false)
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
      <Notification
        key={location.key}
        state={notificationState}
        success={submitSuccess}
      />
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

function Notification({
  success,
  state,
}: {
  success?: boolean
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
}) {
  const [show, setShow] = state

  React.useEffect(() => {
    if (success !== undefined) {
      setShow(true)

      const timer = setTimeout(() => {
        setShow(false)
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [success, setShow])

  if (success === undefined) {
    return null
  }

  return (
    <HeadlessUIReact.Portal>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-10 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <HeadlessUIReact.Transition
            show={show}
            as={React.Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div
              className={clsx(
                success ? 'bg-success-11' : 'bg-danger-11',
                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg shadow-lg ring-1 ring-gray-7 ring-opacity-5'
              )}
            >
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-white">
                      {success ? 'Level up successful' : 'Level up failed'}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className={clsx(
                        success
                          ? 'bg-success-11 focus:ring-offset-success-11'
                          : 'bg-danger-11 focus:ring-offset-danger-11',
                        'inline-flex rounded-md text-white focus:outline-none focus:ring-2 focus:ring-primary-8 focus:ring-offset-2'
                      )}
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <Icon.Outline
                        name="x"
                        className="h-5 w-5"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </HeadlessUIReact.Transition>
        </div>
      </div>
    </HeadlessUIReact.Portal>
  )
}
