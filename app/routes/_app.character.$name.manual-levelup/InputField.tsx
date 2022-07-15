import clsx from 'clsx'
import type * as RemixParamsHelper from 'remix-params-helper'

interface Props {
  label: string
  defaultValue?: string | number
  error?: string
  id: string
  inputProps: RemixParamsHelper.InputPropType
  min?: number
}

export default function InputField({
  id,
  label,
  defaultValue,
  error,
  inputProps,
  min,
}: Props) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-12">
        {label}{' '}
        <span
          className={clsx(
            !inputProps.required && 'hidden',
            'text-sm text-gray-11'
          )}
        >
          *
        </span>
      </label>
      <input
        id={id}
        className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
        defaultValue={defaultValue}
        min={min}
        {...inputProps}
        aria-invalid={!!error}
        aria-describedby={`${id}-error`}
      />
      <p className="mt-2 text-sm text-danger-9" id={`${id}-error`}>
        {error}
      </p>
    </>
  )
}
