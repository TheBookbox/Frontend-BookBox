interface InputProps {
    name?: string
    value?: any
    type: string
    placeholder: string
    className?: string
    required?: boolean
    autoFocus?: boolean
    onChange?: (newValue: any) => void
    max?: number
    min?:number
}

export function Input(props: InputProps) {
  return (
    <input
      name={props.name}
      type={props.type}
      value={props.value}
      placeholder={props.placeholder}
      className={`input input-bordered w-full max-w-xs bg-white ${props.className}`}
      required={props.required}
      autoFocus={props.autoFocus}
      onChange={e => props.onChange?.(e.target.value)}
      max={props.max}
      min={props.min}
    />
  );
}
