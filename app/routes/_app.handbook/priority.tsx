import * as RadixSeparator from '@radix-ui/react-separator'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as Utils from '~/utils'

type Props = {
  priority: {
    name: string
    progression: {
      label: string
      current: number
      target: number | null
    }[]
  } | null
}

export default function Priority({ priority }: Props) {
  if (!priority) {
    return (
      <section aria-labelledby="priority-title">
        <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
          <div className="my-6">
            <h2 className="px-6 font-medium text-gray-12" id="priority-title">
              Top priority track
            </h2>

            <p className="mt-6 text-center text-sm text-gray-11">
              No tracked character
            </p>

            <div className="mt-6 px-6">
              <Button.Link
                to="/track/add"
                prefetch="intent"
                className="w-full justify-center"
              >
                Track a character
              </Button.Link>
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section aria-labelledby="priority-title">
      <div className="overflow-hidden rounded-lg bg-gray-2 shadow">
        <div className="my-6">
          <h2 className="px-6 font-medium text-gray-12" id="priority-title">
            Top priority track
          </h2>

          <div className="mt-6 flex items-center px-6">
            <Image
              src={`/character/${Utils.getImageSrc(priority.name)}.png`}
              alt=""
              width={80}
              className="h-20 w-20"
            />
            <h3 className="text-sm font-medium text-gray-12">
              {priority.name}
            </h3>
          </div>

          <div className="mt-4 bg-gray-3 py-6">
            {priority.progression.map((progression, idx) => (
              <div
                key={progression.label}
                className="text-center text-sm font-medium"
              >
                <div className="flex items-center justify-center gap-2">
                  {progression.target &&
                  progression.current !== progression.target ? (
                    <>
                      <span className="text-gray-12">
                        {progression.current}
                      </span>
                      <span className="sr-only">to</span>
                      <Icon.Solid
                        name="arrowSmRight"
                        className="h-5 w-5"
                        aria-hidden
                      />
                      <span className="text-gray-12">{progression.target}</span>
                    </>
                  ) : (
                    <span className="text-gray-12">{progression.current}</span>
                  )}
                </div>
                <span className="text-gray-11">{progression.label}</span>
                {idx !== priority.progression.length - 1 && (
                  <RadixSeparator.Root className="my-4 h-px w-auto bg-gray-6" />
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 px-6">
            <Button.Link
              to={`/track/${priority.name}`}
              prefetch="intent"
              className="w-full justify-center"
            >
              Track page
            </Button.Link>
          </div>
        </div>
      </div>
    </section>
  )
}
