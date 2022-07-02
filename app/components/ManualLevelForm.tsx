import { Form } from '@remix-run/react'
import type { InputPropType } from 'remix-params-helper'
import type { TravelerData } from '~/routes/_app.character.traveler.$vision.manual-levelup/_index'
import { Button } from './Button'

type Props = {
  defaultValues: {
    level: number
    ascension: number
    normalAttack: number
    elementalSkill: number
    elementalBurst: number
  }
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
  return (
    <div className="mt-8">
      <Form method="post">
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
          <Button type="submit" focusRing={1}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}
