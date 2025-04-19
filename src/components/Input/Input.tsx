interface InputProps {
  name?: string
  value?: any
  type: string
  placeholder?: string
  className?: string
  required?: boolean
  autoFocus?: boolean
  onChange?: (newValue: any) => void
  max?: number
  min?: number
  onKeyDown?: (e: React.KeyboardEvent) => void
  id?: string // Adicionada a propriedade id
  disable?: boolean
}

export function Input(props: InputProps) {
return (
  <input
    name={props.name}
    id={props.id} // Adicionada a propriedade id
    type={props.type}
    value={props.value}
    placeholder={props.placeholder}
    className={`input input-bordered w-full max-w-xs bg-white ${props.className}`}
    required={props.required}
    autoFocus={props.autoFocus}
    onChange={e => props.onChange?.(e.target.value)}
    max={props.max}
    min={props.min}
    onKeyDown={props.onKeyDown}

    disabled={props.disable}
  />
);
}