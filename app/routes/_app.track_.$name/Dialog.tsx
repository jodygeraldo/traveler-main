import * as RadixDialog from '@radix-ui/react-dialog'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import type * as CharacterType from '~/types/character'

type Props = {
  name: string
  progression: CharacterType.Progression
  children: React.ReactNode
}

export default function Dialog({ name, progression, children }: Props) {
  const fetcher = RemixReact.useFetcher()
  const busy = fetcher.state === 'submitting'

  return (
    <RadixDialog.Root>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>

      <RadixDialog.Portal>
        <div className="relative z-10">
          <RadixDialog.Overlay className="fixed inset-0 bg-overlay-black-12 transition-opacity" />

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <RadixDialog.Content className="relative w-full transform rounded-lg bg-gray-2 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6">
                <RadixDialog.Close
                  aria-label="Close"
                  className="absolute top-4 right-4 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-7"
                >
                  <Icon.Solid name="x" className="h-4 w-4 text-gray-11" />
                </RadixDialog.Close>

                <fetcher.Form
                  action="?index"
                  method="post"
                  replace={true}
                  className="w-full"
                >
                  <input type="hidden" name="editName" value={name} />

                  <RadixDialog.Title className="text-lg font-medium leading-6 text-gray-12">
                    Edit {name} progression
                  </RadixDialog.Title>

                  <div className="space-y-2 py-4">
                    <ProgressionField
                      label="Level"
                      name="editLevel"
                      value={progression.level}
                      min={1}
                      max={90}
                      error={fetcher.data?.errors?.level}
                    />

                    <ProgressionField
                      label="Ascension"
                      name="editAscension"
                      value={progression.ascension}
                      min={0}
                      max={6}
                      error={fetcher.data?.errors?.ascension}
                    />

                    <ProgressionField
                      id="normal-attack"
                      label="Normal Attack"
                      name="editNormalAttack"
                      value={progression.normalAttack}
                      min={1}
                      max={10}
                      error={fetcher.data?.errors?.normalAttack}
                    />

                    <ProgressionField
                      id="elemental-skill"
                      label="Elemental Skill"
                      name="editElementalSkill"
                      value={progression.elementalSkill}
                      min={1}
                      max={10}
                      error={fetcher.data?.errors?.elementalSkill}
                    />

                    <ProgressionField
                      id="elemental-burst"
                      label="Elemental Burst"
                      name="editElementalBurst"
                      value={progression.elementalBurst}
                      min={1}
                      max={10}
                      error={fetcher.data?.errors?.elementalBurst}
                    />
                  </div>

                  <div className="flex justify-end">
                    <Button.Base
                      type="submit"
                      name="kind"
                      value="edit"
                      variant="success"
                      className={clsx(busy && 'cursor-progress')}
                    >
                      {busy ? 'Saving changes...' : 'Save changes'}
                    </Button.Base>
                  </div>
                </fetcher.Form>
              </RadixDialog.Content>
            </div>
          </div>
        </div>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  )
}

function ProgressionField({
  id,
  name,
  label,
  value,
  min,
  max,
  error,
}: {
  id?: string
  label: string
  name: string
  value: number
  min: number
  max: number
  error?: string
}) {
  return (
    <div className="space-y-1">
      <div>
        <label
          htmlFor={id || name}
          className="block text-sm font-medium text-gray-12 sm:mt-px sm:pt-2"
        >
          {label}
        </label>
      </div>
      <div className="sm:col-span-2">
        <input
          type="number"
          name={name}
          id={id || name}
          min={min}
          max={max}
          defaultValue={value}
          required
          className="block w-full rounded-md border-gray-6 bg-gray-2 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
          aria-invalid={!!error}
          aria-describedby={`${id}-error`}
        />
        <p
          className="mt-1 text-sm text-danger-9 sm:col-span-9"
          id={`${id}-error`}
        >
          {error}
        </p>
      </div>
    </div>
  )
}
