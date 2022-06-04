import { ReactNode, FC } from 'react'

type Props = {
  children: ReactNode
  onClick: () => void
  type?: 'button' | 'submit' | 'reset'
  isDisabled?: boolean
}

export const PrimaryButton: FC<Props> = (props: Props) => {
  const { children, onClick, isDisabled = false, type = 'button' } = props
  return (
    <button className="btn" type={type} onClick={onClick} disabled={isDisabled}>
      {children}
    </button>
  )
}
