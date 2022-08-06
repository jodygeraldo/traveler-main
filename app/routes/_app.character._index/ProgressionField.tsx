interface Props {
  id?: string
  label: string
  name: string
  value: number
  min: number
  max: number
  error?: string
}

export default function ProgressionField({
  id,
  name,
  label,
  value,
  min,
  max,
  error,
}: Props) {
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
