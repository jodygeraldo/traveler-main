import * as RemixReact from '@remix-run/react'
import * as Button from '~/components/Button'
import * as Icon from '~/components/Icon'
import Image from '~/components/Image'
import * as Utils from '~/utils'

type Props = {
  kind: string
  progression: {
    current: number
    target: number
  }
  materials: {
    key: string
    value: number
  }[]
  targetLevel: number | null
}

export default function ProgressionField({
  kind,
  materials,
  progression,
  targetLevel,
}: Props) {
  const fetcher = RemixReact.useFetcher()

  const minValue = kind === 'Ascension' ? 0 : 1

  const busy = fetcher.state === 'submitting'

  return (
    <fetcher.Form method="post" className="p-6">
      <h4 className="font-medium text-gray-12">{kind}</h4>

      <div className="sm:flex sm:items-center sm:justify-between sm:gap-8">
        <div className="mt-4 sm:flex sm:items-center sm:gap-8">
          <div className="flex items-center">
            <span className="text-6xl text-gray-12">{progression.current}</span>
            <span className="sr-only">to</span>
            <Icon.Solid
              name="arrowSmRight"
              className="h-10 w-10 text-gray-11"
              aria-hidden
            />
            <span className="text-6xl text-gray-12">{progression.target}</span>
          </div>
          <div>
            {materials.map((m) => (
              <div key={m.key} className="flex items-center gap-2">
                <Image
                  src={`/item/${Utils.getImageSrc(m.key)}.png`}
                  className="h-5 w-5"
                  alt=""
                  width={20}
                  height={20}
                />
                <span className="truncate capitalize text-gray-11">
                  {m.key}
                </span>
                <span className="text-xs tabular-nums text-gray-12 xs:text-sm">
                  x{m.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <input type="hidden" name="level" value={progression.current} />
        <input type="hidden" name="kind" value={kind} />
        {targetLevel && (
          <input type="hidden" name="targetLevel" value={targetLevel} />
        )}
        <div className="hidden -space-x-px sm:block">
          <Button.Group
            type="submit"
            name="control"
            value="decrement"
            disabled={progression.current === minValue}
            position="left"
          >
            <span className="sr-only">Decrease level</span>
            <Icon.Solid
              name="chevronLeft"
              className="h-5 w-5 text-gray-11"
              aria-hidden
            />
          </Button.Group>
          <Button.Group
            type="submit"
            name="control"
            value="increment"
            position="right"
          >
            <span className="sr-only">Increase level</span>
            <Icon.Solid
              name="chevronRight"
              className="h-5 w-5 text-gray-11"
              aria-hidden
            />
          </Button.Group>
        </div>

        <div className="mt-4 w-full xs:flex xs:items-center xs:gap-4 sm:hidden">
          <Button.Base
            type="submit"
            name="control"
            variant="secondary"
            value="decrement"
            disabled={progression.current === minValue}
            className="mt-4 w-full sm:mt-0 sm:w-auto"
          >
            {busy ? 'Decreasing level...' : 'Decrease level'}
          </Button.Base>
          <Button.Base
            type="submit"
            name="control"
            value="increment"
            className="mt-4 w-full sm:mt-0 sm:w-auto"
          >
            {busy ? 'Increasing level...' : 'Increase level'}
          </Button.Base>
        </div>
      </div>
    </fetcher.Form>
  )
}
