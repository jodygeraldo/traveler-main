interface Props {
  label: string
  name: string
  defaultValue?: string | number
  id: string
  min?: number
  max?: number
}

export default function InputField({
  id,
  name,
  label,
  defaultValue,
  min,
  max,
}: Props) {
  return (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-12">
        {label}
      </label>
      <input
        id={id}
        name={name}
        type="number"
        className="mt-1 block w-full rounded-md border-gray-7 bg-gray-3 shadow-sm focus:border-primary-8 focus:ring-primary-8 sm:text-sm"
        defaultValue={defaultValue}
        min={min}
        max={max}
      />
    </>
  )
}
