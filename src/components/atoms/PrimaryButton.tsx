import { ReactNode, FC, memo } from 'react'

type ButtonProps = JSX.IntrinsicElements['button']

type Props = {
  children: ReactNode
  isRounded?: boolean
} & ButtonProps

export const PrimaryButton: FC<Props> = memo<Props>((props: Props) => {
  const { children, isRounded = false, ...rest } = props
  return (
    <button
      className={`c-btn ${isRounded ? 'c-btn-rounded' : undefined}`}
      {...rest}
    >
      {children}
    </button>
  )
})
