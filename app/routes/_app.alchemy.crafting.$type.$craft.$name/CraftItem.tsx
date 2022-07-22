import * as HeadlessUIReact from '@headlessui/react'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as Utils from '~/utils/index'

const backgroundImage: Record<number, string> = {
  1: 'bg-image-rarity-1',
  2: 'bg-image-rarity-2',
  3: 'bg-image-rarity-3',
  4: 'bg-image-rarity-4',
  5: 'bg-image-rarity-5',
}

interface Props {
  name: string
  rarity: number
  crafter: {
    name: string
    rarity: number
    quantity: number
    requiredQuantity: number
  }
  refundable: boolean
  doublable: boolean
  error?: {
    message: string
  }
}

export default function CraftItem({
  name,
  rarity,
  crafter,
  refundable,
  doublable,
  error,
}: Props) {
  const navigate = RemixReact.useNavigate()
  const transition = RemixReact.useTransition()
  const busy = transition.state === 'submitting'

  const cancelButtonRef = React.useRef(null)

  const isCraftable = crafter.quantity >= crafter.requiredQuantity

  return (
    <HeadlessUIReact.Dialog
      className="relative z-10"
      initialFocus={cancelButtonRef}
      open={true}
      onClose={() => navigate('..')}
    >
      <div className="fixed inset-0 bg-overlay-black-12" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <RemixReact.Form
          method="post"
          className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <HeadlessUIReact.Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-gray-2 px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
            <div>
              <HeadlessUIReact.Dialog.Title
                as="h3"
                className="text-lg font-medium leading-6 text-gray-12"
              >
                Crafting {name}
              </HeadlessUIReact.Dialog.Title>
              {!isCraftable ? (
                <div>
                  <p>
                    Not enought material to craft {name}, need{' '}
                    {crafter.requiredQuantity} {crafter.name} but have{' '}
                    {crafter.quantity}
                  </p>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                    <div className="flex-shrink-0 rounded-b-md bg-gray-3 shadow-sm">
                      <div
                        className={clsx(
                          backgroundImage[crafter.rarity],
                          'rounded-t-md rounded-br-2xl bg-contain'
                        )}
                      >
                        <Image
                          src={`/item/${Utils.getImageSrc(crafter.name)}.png`}
                          alt={crafter.name}
                          className="h-16 w-16 rounded-br-2xl"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="text-center">
                        <span className="sr-only">
                          Quantity {crafter.requiredQuantity}
                        </span>
                        <p className="text-sm text-gray-11" aria-hidden>
                          {crafter.requiredQuantity}
                        </p>
                      </div>
                    </div>
                  </div>

                  <Icon.Outline name="switchVertical" className="mt-4" />

                  <div className="mt-4 flex items-center gap-2">
                    <div className="bg-gray-2 shadow-sm">
                      <div
                        className={clsx(
                          backgroundImage[rarity],
                          'rounded-md bg-contain'
                        )}
                      >
                        <Image
                          src={`/item/${Utils.getImageSrc(name)}.png`}
                          alt={name}
                          className="h-16 w-16"
                          width={64}
                          height={64}
                        />
                      </div>
                    </div>

                    <input
                      type="hidden"
                      name="crafterName"
                      value={crafter.name}
                    />
                    <input
                      type="hidden"
                      name="crafterQuantity"
                      value={crafter.requiredQuantity}
                    />

                    <div className="max-w-[18rem] sm:w-72">
                      <div className="w-full">
                        <label
                          htmlFor="quantity"
                          className="block text-sm font-medium text-gray-12"
                        >
                          Quantity to craft
                        </label>
                        <input
                          type="number"
                          name="quantity"
                          id="quantity"
                          className="w-full rounded-md border-gray-7 bg-gray-2 tabular-nums text-gray-11 shadow-sm focus:border-gray-8 focus:text-gray-12 focus:ring-gray-8 sm:text-sm"
                          defaultValue={1}
                          min={1}
                          max={Math.floor(crafter.quantity / 3)}
                          aria-invalid={!!error}
                          aria-describedby={`craft-error`}
                        />
                      </div>

                      {refundable || doublable ? (
                        <div className="mt-2 w-full">
                          <label
                            htmlFor="bonus-quantity"
                            className="block text-sm font-medium text-gray-12"
                          >
                            Refund or Bonus
                          </label>
                          <div className="relative mt-1 rounded-md shadow-sm">
                            <input
                              type="number"
                              name="bonusQuantity"
                              id="bonus-quantity"
                              className="block w-full rounded-md border-gray-7 bg-gray-2 pr-[5.5rem] tabular-nums text-gray-11 shadow-sm focus:border-gray-8 focus:text-gray-12 focus:ring-gray-8 sm:text-sm"
                              defaultValue={0}
                              min={0}
                              max={Math.floor(crafter.quantity / 3)}
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center">
                              <label htmlFor="bonus-type" className="sr-only">
                                Type
                              </label>
                              <select
                                name="bonusType"
                                id="bonus-type"
                                className="h-full rounded-md border-transparent bg-transparent py-0 pl-2 pr-7 text-gray-11 focus:border-gray-8 focus:ring-gray-8 sm:text-sm"
                              >
                                {refundable && <option>Refund</option>}
                                {doublable && <option>Bonus</option>}
                              </select>
                            </div>
                          </div>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  {error && (
                    <p
                      className="mt-2 text-sm text-danger-9"
                      id={`craft-error`}
                    >
                      {error?.message}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                {isCraftable ? (
                  <div className="w-full sm:col-start-2">
                    <Button className="w-full" type="submit" disabled={busy}>
                      {busy ? 'Crafting...' : 'Craft'}
                    </Button>
                  </div>
                ) : null}

                <div
                  className={clsx(
                    isCraftable
                      ? 'mt-3 sm:col-start-1 sm:mt-0'
                      : 'sm:col-span-2',
                    'w-full'
                  )}
                >
                  <Button
                    type="button"
                    variant="basic"
                    className="w-full"
                    disabled={busy}
                    onClick={() => navigate('..')}
                    ref={cancelButtonRef}
                  >
                    {isCraftable ? 'Cancel' : 'Close'}
                  </Button>
                </div>
              </div>
            </div>
          </HeadlessUIReact.Dialog.Panel>
        </RemixReact.Form>
      </div>
    </HeadlessUIReact.Dialog>
  )
}
