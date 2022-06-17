import { isEmpty } from 'lodash'
import { FC, memo, ReactNode } from 'react'

type ButtonProps = JSX.IntrinsicElements['button']

type Props = {
  children: ReactNode
} & ButtonProps

export const IconButton: FC<Props> = memo<Props>(
  ({ children, className, ...rest }: Props) => (
    <button
      className={isEmpty(className) ? `c-icon-btn` : `c-icon-btn ${className}`}
      {...rest}
    >
      {children}
    </button>
  )
)
