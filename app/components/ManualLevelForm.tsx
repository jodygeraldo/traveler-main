import { Dialog, Portal, Transition } from '@headlessui/react'
import { Form, useLocation, useSubmit } from '@remix-run/react'
import * as React from 'react'
import type { InputPropType } from 'remix-params-helper'
import { useHydrated } from 'remix-utils'
import invariant from 'tiny-invariant'
import { z } from 'zod'
import type { TravelerData } from '~/routes/_app.character.traveler.$vision.manual-levelup/_index'
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
  hiddenTravelersData?: TravelerData[]
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
            <label htmlFor="level" className="block text-sm font-medium text-gray-12">
              Level
            </label>
            <input
              id="level"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              defaultValue={defaultValues.level}
              {...inputProps('level')}
              aria-invalid={!!errors?.level}
              aria-describedby="level-error"
            />
            <p className="mt-2 text-sm text-danger-9" id="level-error">
              {errors?.level}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="ascension" className="block text-sm font-medium text-gray-12">
              Ascension
            </label>
            <input
              id="ascension"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              defaultValue={defaultValues.ascension}
              min={0} // the params helper not correctly read the min value (0)
              {...inputProps('ascension')}
              aria-invalid={!!errors?.ascension}
              aria-describedby="ascension-error"
            />
            <p className="mt-2 text-sm text-danger-9" id="ascension-error">
              {errors?.ascension}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="normal-attack" className="block text-sm font-medium text-gray-12">
              Normal Attack
            </label>
            <input
              id="normal-attack"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              defaultValue={defaultValues.normalAttack}
              {...inputProps('normalAttack')}
              aria-invalid={!!errors?.normalAttack}
              aria-describedby="normal-attack-error"
            />
            <p className="mt-2 text-sm text-danger-9" id="normal-attack-error">
              {errors?.normalAttack}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="elemental-skill" className="block text-sm font-medium text-gray-12">
              Elemental Skill
            </label>
            <input
              id="elemental-skill"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              defaultValue={defaultValues.elementalSkill}
              {...inputProps('elementalSkill')}
              aria-invalid={!!errors?.elementalSkill}
              aria-describedby="elemental-skill-error"
            />
            <p className="mt-2 text-sm text-danger-9" id="elemental-skill-error">
              {errors?.elementalSkill}
            </p>
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="elemental-burst" className="block text-sm font-medium text-gray-12">
              Elemental Burst
            </label>
            <input
              id="elemental-burst"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              defaultValue={defaultValues.elementalBurst}
              {...inputProps('elementalBurst')}
              aria-invalid={!!errors?.elementalBurst}
              aria-describedby="elemental-burst-error"
            />
            <p className="mt-2 text-sm text-danger-9" id="elemental-burst-error">
              {errors?.elementalBurst}
            </p>
          </div>
        </div>
        <input type="hidden" name="travelersData" value={JSON.stringify(hiddenTravelersData)} />
        <div className="mt-8 text-right">
          <Button
            type={hydrated ? 'button' : 'submit'}
            onClick={hydrated ? handleClick : undefined}
            focusRing={1}
          >
            Save
          </Button>
        </div>
      </Form>
      <Alert state={alertState} oldValues={defaultValues} newValues={values} formData={formData} />
      <Notification key={location.key} state={notificationState} success={submitSuccess} />
    </div>
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
