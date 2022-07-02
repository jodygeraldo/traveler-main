import { Form } from '@remix-run/react'
import type { InputPropType } from 'remix-params-helper'
import { useHydrated } from 'remix-utils'
import type { TravelerData } from '~/routes/_app.character.traveler.$vision.manual-levelup/_index'
import { Button } from './Button'

import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import Icon from './Icon'
import { z } from 'zod'
import { splitPerCapitalCase, toCapitalized } from '~/utils'

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
}

export default function ManualLevelForm({
  defaultValues,
  inputProps,
  errors,
  hiddenTravelersData,
}: Props) {
  const hydrated = useHydrated()
  const alertState = useState(false)
  const ref = useRef<HTMLFormElement>(null)
  const [values, setValues] = useState<Values>(defaultValues)

  function handleClick() {
    const formData = new FormData(ref.current ?? undefined)

    const { level, ascension, normalAttack, elementalSkill, elementalBurst } =
      Object.fromEntries(formData)

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
      <Alert state={alertState} oldValues={defaultValues} newValues={values} />
    </div>
  )
}

function Alert({
  state,
  oldValues,
  newValues,
}: {
  state: [boolean, React.Dispatch<React.SetStateAction<boolean>>]
  oldValues: Values
  newValues: Values
}) {
  const [open, setOpen] = state
  const cancelButtonRef = useRef(null)

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" initialFocus={cancelButtonRef} onClose={setOpen}>
        <Transition.Child
          as={Fragment}
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
              as={Fragment}
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
                    onClick={() => setOpen(false)}
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
