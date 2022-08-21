interface Props {
  type?: 'text' | 'textarea' | 'url' | 'select'
  id?: string
  label: string
  name: string
  defaultValue: string
  options?: { label: string; value: string }[]
  error?: string
}

export default function ResourceField({
  type = 'text',
  id,
  name,
  defaultValue,
  label,
  options = [
    { label: 'Pending', value: 'PENDING' },
    { label: 'Draft', value: 'DRAFT' },
    { label: 'Published', value: 'PUBLISHED' },
  ],
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
        {type !== 'textarea' && type !== 'select' && (
          <input
            type={type}
            name={name}
            id={id || name}
            defaultValue={defaultValue}
            required
            className="block w-full rounded-md border-gray-6 bg-gray-2 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
          />
        )}
        {type === 'textarea' && (
          <textarea
            name={name}
            id={id || name}
            required
            rows={5}
            defaultValue={defaultValue}
            className="block w-full rounded-md border-gray-6 bg-gray-2 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
            aria-invalid={!!error}
            aria-describedby={`${id}-error`}
          />
        )}
        {type === 'select' && (
          <select
            name={name}
            id={id || name}
            required
            className="block w-full rounded-md border-gray-6 bg-gray-2 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
            defaultValue={defaultValue}
          >
            {options.map((option) => (
              <option key={option.label} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )}
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
