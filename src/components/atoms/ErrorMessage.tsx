import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { FC, memo } from 'react'

type Props = {
  children: string
}

export const ErrorMessage: FC<Props> = memo(({ children }: Props) => (
  <p className={clsx('u-text-error', isEmpty(children) && 'c-form-hidden')}>
    {children}
  </p>
))
