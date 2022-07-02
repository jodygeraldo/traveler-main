import { Form } from '@remix-run/react'
import type { InputPropType } from 'remix-params-helper'
import { Button } from './Button'

type Props = {
  inputProps: (key: string, options?: any) => InputPropType
}

export default function ManualLevelForm({ inputProps }: Props) {
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
              {...inputProps('level')}
            />
          </div>

          <div className="col-span-6 sm:col-span-3">
            <label htmlFor="ascension" className="block text-sm font-medium text-gray-12">
              Ascension
            </label>
            <input
              id="ascension"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              min={0} // the params helper not correctly read the min value (0)
              {...inputProps('ascension')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="normal-attack" className="block text-sm font-medium text-gray-12">
              Normal Attack
            </label>
            <input
              id="normal-attack"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              {...inputProps('normal-attack')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="elemental-skill" className="block text-sm font-medium text-gray-12">
              Elemental Skill
            </label>
            <input
              id="elemental-skill"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              {...inputProps('elemental-skill')}
            />
          </div>

          <div className="col-span-6 sm:col-span-2">
            <label htmlFor="elemental-burst" className="block text-sm font-medium text-gray-12">
              Elemental Burst
            </label>
            <input
              id="elemental-burst"
              className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              {...inputProps('elemental-burst')}
            />
          </div>
        </div>
        <div className="mt-8 text-right">
          <Button type="submit" focusRing={1}>
            Save
          </Button>
        </div>
      </Form>
    </div>
  )
}
