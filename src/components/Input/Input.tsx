interface InputProps {
    name: string
    type: string
    placeholder: string
    className?: string
    required?: boolean
    autoFocus?: boolean
}

export function Input(props: InputProps) {
  return (
    <input
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
      className={`input input-bordered w-full max-w-xs bg-white ${props.className}`}
      required={props.required}
      autoFocus={props.autoFocus}
    />
  );
}
