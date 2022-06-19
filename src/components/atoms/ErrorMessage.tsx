import clsx from 'clsx'
import { FC, memo } from 'react'

type Props = {
  children: string
  className?: string
}

export const ErrorMessage: FC<Props> = memo(
  ({ children, className }: Props) => (
    <p className={clsx('u-text-error', className)}>{children}</p>
  )
)
