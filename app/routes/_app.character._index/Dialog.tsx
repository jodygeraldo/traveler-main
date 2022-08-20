import * as RadixDialog from '@radix-ui/react-dialog'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import { AnimatePresence, motion, type Variants } from 'framer-motion'
import * as React from 'react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import type * as CharacterType from '~/types/character'
import ProgressionField from './ProgressionField'

type Props = {
  name: string
  progression: CharacterType.Progression
  children: React.ReactNode
}

const contentVariants: Variants = {
  hidden: { scale: 0, transition: { ease: 'easeInOut', duration: 0.2 } },
  show: { scale: 1, transition: { ease: 'easeInOut', duration: 0.2 } },
}

const overlayVariants: Variants = {
  hidden: { opacity: 0, transition: { duration: 0.2 } },
  show: { opacity: 1, transition: { duration: 0.2 } },
}

export default function Dialog({ name, progression, children }: Props) {
  const [open, setOpen] = React.useState(false)
  const fetcher = RemixReact.useFetcher()
  const busy = fetcher.state === 'submitting'

  return (
    <RadixDialog.Root open={open} onOpenChange={setOpen}>
      <RadixDialog.Trigger asChild>{children}</RadixDialog.Trigger>

      <AnimatePresence>
        {open && (
          <RadixDialog.Portal forceMount>
            <div className="relative z-30">
              <RadixDialog.Overlay asChild>
                <motion.div
                  className="fixed inset-0 bg-overlay-black-12"
                  variants={overlayVariants}
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                />
              </RadixDialog.Overlay>

              <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                  <RadixDialog.Content asChild>
                    <motion.div
                      className="relative w-full transform rounded-lg bg-gray-2 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:max-w-sm sm:p-6"
                      variants={contentVariants}
                      initial="hidden"
                      animate="show"
                      exit="hidden"
                    >
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
                        <input type="hidden" name="name" value={name} />

                        <RadixDialog.Title className="text-lg font-medium leading-6 text-gray-12">
                          Edit {name} progression
                        </RadixDialog.Title>

                        <div className="space-y-2 py-4">
                          <ProgressionField
                            label="Level"
                            name="level"
                            value={progression.level}
                            min={1}
                            max={90}
                            error={fetcher.data?.errors?.level}
                          />

                          <ProgressionField
                            label="Ascension"
                            name="ascension"
                            value={progression.ascension}
                            min={0}
                            max={6}
                            error={fetcher.data?.errors?.ascension}
                          />

                          <ProgressionField
                            id="normal-attack"
                            label="Normal Attack"
                            name="normalAttack"
                            value={progression.normalAttack}
                            min={1}
                            max={10}
                            error={fetcher.data?.errors?.normalAttack}
                          />

                          <ProgressionField
                            id="elemental-skill"
                            label="Elemental Skill"
                            name="elementalSkill"
                            value={progression.elementalSkill}
                            min={1}
                            max={10}
                            error={fetcher.data?.errors?.elementalSkill}
                          />

                          <ProgressionField
                            id="elemental-burst"
                            label="Elemental Burst"
                            name="elementalBurst"
                            value={progression.elementalBurst}
                            min={1}
                            max={10}
                            error={fetcher.data?.errors?.elementalBurst}
                          />
                        </div>

                        <div className="flex justify-end">
                          <Button.Base
                            type="submit"
                            variant="success"
                            className={clsx(busy && 'cursor-progress')}
                          >
                            {busy ? 'Saving changes...' : 'Save changes'}
                          </Button.Base>
                        </div>
                      </fetcher.Form>
                    </motion.div>
                  </RadixDialog.Content>
                </div>
              </div>
            </div>
          </RadixDialog.Portal>
        )}
      </AnimatePresence>
    </RadixDialog.Root>
  )
}
