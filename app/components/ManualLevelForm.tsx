import { Dialog, Portal, Transition } from '@headlessui/react'
import { Form, useLocation, useSubmit, useTransition } from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import type { InputPropType } from 'remix-params-helper'
import { useHydrated } from 'remix-utils'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import type { CharacterData } from '~/routes/_app.character.traveler.$vision.manual-levelup/_index'
import { splitPerCapitalCase, toCapitalized } from '~/utils'
import { Button } from './Button'
import Icon from './Icon'

const newDataSchema = z.object({
  level: z.number(),
  ascension: z.number(),
  normalAttack: z.number(),
  elementalSkill: z.number(),
  elementalBurst: z.number(),
})

type Values = {
  level: number
  ascension: number
  normalAttack: number
  elementalSkill: number
  elementalBurst: number
}

type Props = {
  defaultValues: Values
  inputProps: (key: string, options?: any) => InputPropType
  errors?: { [key: string]: string }
  hiddenTravelersData?: CharacterData[]
  submitSuccess?: boolean
}

export default function ManualLevelForm({
  defaultValues,
  inputProps,
  errors,
  hiddenTravelersData,
  submitSuccess,
}: Props) {
  const hydrated = useHydrated()
  const alertState = React.useState(false)
  const notificationState = React.useState(false)
  const ref = React.useRef<HTMLFormElement>(null)
  const [values, setValues] = React.useState<Values>(defaultValues)
  const [formData, setFormData] = React.useState<FormData | undefined>(undefined)
  const location = useLocation()
  const transition = useTransition()
  const busy = transition.state === 'submitting'

  function handleClick() {
    const form = new FormData(ref.current ?? undefined)

    const { level, ascension, normalAttack, elementalSkill, elementalBurst } =
      Object.fromEntries(form)

    setFormData(form ?? undefined)

    const parsedNewData = newDataSchema.parse({
      level: parseInt(z.string().parse(level)),
      ascension: parseInt(z.string().parse(ascension)),
      normalAttack: parseInt(z.string().parse(normalAttack)),
      elementalSkill: parseInt(z.string().parse(elementalSkill)),
      elementalBurst: parseInt(z.string().parse(elementalBurst)),
    })

    setValues(parsedNewData)

    alertState[1](true)
  }

  return (
    <div className="mt-8">
      <Form ref={ref} method="post">
        <div className="grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-3">
            <InputField
              id="level"
              label="Level"
              defaultValue={defaultValues.level}
              error={errors?.level}
              inputProps={inputProps('level')}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <InputField
              id="ascension"
              label="Ascension"
              defaultValue={defaultValues.ascension}
              min={0} // the params helper not correctly read the min value (0)
              error={errors?.ascension}
              inputProps={inputProps('ascension')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="normal-attack"
              label="Normal Attack"
              defaultValue={defaultValues.normalAttack}
              error={errors?.normalAttack}
              inputProps={inputProps('normalAttack')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="elemental-skill"
              label="elemental Skill"
              defaultValue={defaultValues.elementalSkill}
              error={errors?.elementalSkill}
              inputProps={inputProps('elementalSkill')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <InputField
              id="elemental-burst"
              label="elemental Burst"
              defaultValue={defaultValues.elementalBurst}
              error={errors?.elementalBurst}
              inputProps={inputProps('elementalBurst')}
            />
          </div>
        </div>
        <input type="hidden" name="travelersData" value={JSON.stringify(hiddenTravelersData)} />
        <div className="mt-8 text-right">
          <Button
            type={hydrated ? 'button' : 'submit'}
            onClick={hydrated ? handleClick : undefined}
            focusRing={1}
            disabled={busy}
          >
            {busy ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </Form>
      <Alert state={alertState} oldValues={defaultValues} newValues={values} formData={formData} />
      <Notification key={location.key} state={notificationState} success={submitSuccess} />
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
  inputProps: InputPropType
  min?: number
}) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-12">
        {label}{' '}
        <span className={clsx(!inputProps.required && 'hidden', 'text-sm text-gray-11')}>*</span>
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

function Alert({
  state,
  oldValues,
  newValues,
  formData,
}: {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  oldValues: Values
  newValues: Values
  formData?: FormData
}) {
  const [open, setOpen] = state
  const cancelButtonRef = React.useRef(null)
  const submit = useSubmit()
  const { pathname } = useLocation()

  function handleSubmit() {
    invariant(formData)
    submit(formData, { method: 'post', action: pathname })
    setOpen(false)
  }

  return (
    <Transition.Root show={open} as={React.Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={React.Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-overlay-black-9 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-2 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-info-1 sm:mx-0 sm:h-10 sm:w-10">
                    <Icon
                      type="outline"
                      name="informationCircle"
                      className="h-6 w-6 text-info-9"
                      aria-hidden="true"
                    />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-12">
                      Manual level up
                    </Dialog.Title>
                    <div className="mt-2 text-sm text-gray-11">
                      <p>Manual level up generally not recommended.</p>
                      <p>You changed:</p>
                      <ul>
                        {(Object.keys(newValues) as Array<keyof Values>).map((key) => {
                          return newValues[key] !== oldValues[key] ? (
                            <li key={key}>
                              {splitPerCapitalCase(toCapitalized(key))}{' '}
                              <span className="font-bold">{oldValues[key]}</span>
                              <span className="sr-only">To</span>
                              <Icon
                                type="solid"
                                name="arrowSmRight"
                                aria-hidden
                                className="inline h-4 w-4"
                              />
                              <span className="font-bold">{newValues[key]}</span>
                            </li>
                          ) : null
                        })}
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <Button
                    className="w-full sm:ml-3 sm:w-auto"
                    variant="info"
                    onClick={handleSubmit}
                  >
                    Confirm changes
                  </Button>
                  <Button
                    className="mt-3 w-full sm:mt-0 sm:ml-3 sm:w-auto"
                    variant="basic"
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </Button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  )
}

function Notification({
  state,
  success,
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

  return (
    <Portal>
      <div
        aria-live="assertive"
        className="pointer-events-none fixed inset-0 z-10 flex items-end px-4 py-6 sm:items-start sm:p-6"
      >
        <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
          <Transition
            show={show}
            as={React.Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="p-4">
                <div className="flex items-center">
                  <div className="flex w-0 flex-1 justify-between">
                    <p className="w-0 flex-1 text-sm font-medium text-gray-900">
                      {success ? 'Level up successful' : 'Level up failed'}
                    </p>
                  </div>
                  <div className="ml-4 flex flex-shrink-0">
                    <button
                      type="button"
                      className="inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                      onClick={() => {
                        setShow(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <Icon type="outline" name="x" className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </Portal>
  )
}
