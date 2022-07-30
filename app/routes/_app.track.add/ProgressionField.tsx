import * as Icon from '~/components/Icon'

interface Props {
  id?: string
  label: string
  name: string
  currentValue: number
  min: number
  max: number
  error?: string
}

export default function ProgressionField({
  id,
  name,
  label,
  currentValue,
  min,
  max,
  error,
}: Props) {
  if (currentValue < max) {
    return (
      <div className="space-y-1 px-4 sm:grid sm:grid-cols-9 sm:gap-4 sm:space-y-0 sm:px-6 sm:py-5">
        <div className="sm:col-span-3">
          <label
            htmlFor={id || name}
            className="block text-sm font-medium text-gray-12 sm:mt-px sm:pt-2"
          >
            {label}
          </label>
        </div>
        <div className="flex items-center gap-4 sm:col-span-6">
          <div>
            <span className="sr-only">Current level</span>
            <span className="text-sm text-gray-12">{currentValue}</span>
          </div>

          <span className="sr-only">To target</span>
          <Icon.Solid
            name="switchHorizontal"
            className="h-5 w-5 text-gray-12"
            aria-hidden
          />

          <div className="flex-1">
            <input
              type="number"
              name={name}
              id={id || name}
              min={min}
              max={max}
              defaultValue={currentValue}
              required
              className="block w-full rounded-md border-gray-6 bg-gray-2 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
              aria-invalid={!!error}
              aria-describedby={`${id}-error`}
            />
          </div>
        </div>
        <p
          className="mt-1 text-sm text-danger-9 sm:col-span-9"
          id={`${id}-error`}
        >
          {error}
        </p>
      </div>
    )
  }

  return <input type="hidden" name={name} defaultValue={currentValue} />
}
