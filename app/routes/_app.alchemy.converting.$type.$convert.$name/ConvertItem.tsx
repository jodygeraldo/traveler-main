import * as HeadlessUIReact from '@headlessui/react'
import * as RemixReact from '@remix-run/react'
import clsx from 'clsx'
import * as React from 'react'
import Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as Utils from '~/utils'
import Combobox from './Combobox'

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
  specialConverter: {
    name: string
    rarity: number
    quantity: number
    requiredQuantity: number
  }
  itemsConverter: {
    name: string
    rarity: number
    quantity: number
    requiredQuantity: number
  }[]
  error?: {
    message: string
  }
}

export default function ConvertItem({
  name,
  rarity,
  specialConverter,
  itemsConverter,
  error,
}: Props) {
  const navigate = RemixReact.useNavigate()
  const transition = RemixReact.useTransition()
  const busy = transition.state === 'submitting'

  const cancelButtonRef = React.useRef(null)

  const isConvertable =
    specialConverter.quantity >= specialConverter.requiredQuantity &&
    itemsConverter.some((item) => item.quantity >= item.requiredQuantity)

  const maxQuantityToConvert = Math.max(
    ...itemsConverter.map((item) => item.quantity)
  )

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
                Converting {name}
              </HeadlessUIReact.Dialog.Title>
              {!isConvertable ? (
                <div>
                  <p>Not enought material to convert {name}</p>
                </div>
              ) : (
                <div className="mt-4 flex flex-col items-center">
                  <div className="flex flex-col items-center justify-center gap-2 sm:flex-row">
                    <div className="flex-shrink-0 rounded-b-md bg-gray-3 shadow-sm">
                      <div
                        className={clsx(
                          backgroundImage[specialConverter.rarity],
                          'rounded-t-md rounded-br-2xl bg-contain'
                        )}
                      >
                        <Image
                          src={`/item/${Utils.getImageSrc(
                            specialConverter.name
                          )}.png`}
                          alt={specialConverter.name}
                          className="h-16 w-16 rounded-br-2xl"
                          width={64}
                          height={64}
                        />
                      </div>
                      <div className="text-center">
                        <span className="sr-only">
                          Quantity {specialConverter.requiredQuantity}
                        </span>
                        <p className="text-sm text-gray-11" aria-hidden>
                          {specialConverter.requiredQuantity}
                        </p>
                      </div>
                    </div>

                    <div className="mt-2 max-w-[18rem] sm:mt-0 sm:w-72">
                      <Combobox options={itemsConverter} />
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
                      name="specialItemName"
                      value={specialConverter.name}
                    />
                    <input
                      type="hidden"
                      name="specialItemQuantity"
                      value={specialConverter.requiredQuantity}
                    />

                    <div className="max-w-[18rem] sm:w-72">
                      <label htmlFor="quantity" className="sr-only">
                        Quantity to convert
                      </label>
                      <input
                        type="number"
                        name="quantity"
                        id="quantity"
                        className="w-full rounded-md border-gray-7 bg-gray-2 tabular-nums text-gray-11 shadow-sm focus:border-gray-8 focus:text-gray-12 focus:ring-gray-8 sm:text-sm"
                        defaultValue={1}
                        min={1}
                        max={maxQuantityToConvert}
                        aria-invalid={!!error}
                        aria-describedby={`convert-error`}
                      />
                    </div>
                  </div>

                  {error && (
                    <p
                      className="mt-2 text-sm text-danger-9"
                      id={`convert-error`}
                    >
                      {error?.message}
                    </p>
                  )}
                </div>
              )}

              <div className="mt-5 sm:mt-6 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3">
                {isConvertable ? (
                  <div className="w-full sm:col-start-2">
                    <Button
                      id="convert"
                      className="w-full"
                      type="submit"
                      disabled={busy}
                    >
                      {busy ? 'Converting...' : 'Convert'}
                    </Button>
                  </div>
                ) : null}

                <div
                  className={clsx(
                    isConvertable
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
                    {isConvertable ? 'Cancel' : 'Close'}
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
