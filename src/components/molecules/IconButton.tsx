import { isEmpty } from 'lodash'
import { FC, memo, ReactNode } from 'react'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  className?: string
  children: ReactNode
  onClick: () => void
}

export const IconButton: FC<Props> = memo(
  ({ type = 'button', className = '', children, onClick }: Props) => (
    <button
      type={type}
      className={isEmpty(className) ? `c-icon-btn` : `c-icon-btn ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  )
)
