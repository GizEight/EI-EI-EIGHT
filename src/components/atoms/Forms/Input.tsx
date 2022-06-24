import clsx from 'clsx'
import PropTypes from 'prop-types'
import { forwardRef } from 'react'

type Props = JSX.IntrinsicElements['input'] & {
  isBg: boolean
}

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ isBg, ...props }, ref) => (
    <input
      type="text"
      {...props}
      className={clsx('c-form-form_input', isBg && 'c-form-form-isBg')}
      ref={ref}
    />
  )
)

Input.propTypes = {
  isBg: PropTypes.bool.isRequired,
}
