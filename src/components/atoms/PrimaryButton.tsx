import clsx from 'clsx'
import { ReactNode, FC, memo } from 'react'
import { TailSpin } from 'react-loader-spinner'

type ButtonProps = JSX.IntrinsicElements['button']

type Props = {
  children: ReactNode
  isRounded?: boolean
  isLoading?: boolean
} & ButtonProps

export const PrimaryButton: FC<Props> = memo<Props>((props: Props) => {
  const { children, isRounded = false, isLoading = false, ...rest } = props
  return (
    <button
      className={clsx(
        'c-btn',
        isRounded && 'c-btn-rounded',
        isLoading && 'c-btn-loading'
      )}
      {...rest}
    >
      {isLoading ? (
        <TailSpin
          height={16}
          width={16}
          color="#707070"
          wrapperStyle={{ alignItems: 'center', justifyContent: 'center' }}
        />
      ) : (
        children
      )}
    </button>
  )
})
