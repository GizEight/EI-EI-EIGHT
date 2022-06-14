import { FC, memo, ReactNode } from 'react'

type Props = {
  type?: 'button' | 'submit' | 'reset'
  children: ReactNode
  onClick: () => void
}

export const IconButton: FC<Props> = memo(
  ({ type = 'button', children, onClick }: Props) => (
    <button type={type} className="c-icon-btn" onClick={onClick}>
      {children}
    </button>
  )
)
