import clsx from 'clsx'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

type Props = {
  isBg: boolean
}

type InputProps = JSX.IntrinsicElements['input'] & Props

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ isBg, ...props }, ref) => (
    <input
      type="text"
      {...props}
      className={clsx('c-form-form_input', isBg && 'c-form-form_input-isBg')}
      ref={ref}
    />
  )
)

Input.propTypes = {
  isBg: PropTypes.bool.isRequired,
}
