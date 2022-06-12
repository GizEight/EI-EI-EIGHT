import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
  onClick: () => void
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
  isRounded?: boolean
}

export const PrimaryButton: FC<Props> = (props: Props) => {
  const {
    children,
    onClick,
    isDisabled = false,
    type = 'button',
    isRounded = false,
  } = props
  return (
    <button
      className={`c-btn ${isRounded ? 'c-btn-rounded' : undefined}`}
      type={type}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  )
}
