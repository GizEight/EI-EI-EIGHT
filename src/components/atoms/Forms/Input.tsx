import { memo, forwardRef } from 'react'

type InputProps = JSX.IntrinsicElements['input']

export const Input = memo(
  forwardRef<HTMLInputElement, InputProps>((props, ref) => (
    <input type="text" className="c-form-form_input" ref={ref} {...props} />
  ))
)
