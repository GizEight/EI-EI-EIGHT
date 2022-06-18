import clsx from 'clsx'
import { isNil, isEmpty } from 'lodash'
import { FC, memo, ReactNode } from 'react'

import { ErrorMessage } from '../atoms/ErrorMessage'

type NullAble<T> = T | null

type Props = {
  label?: NullAble<string>
  children: ReactNode
  errorMsg?: string
}

export const Form: FC<Props> = memo((props: Props) => {
  const { label = '', children, errorMsg = '' } = props

  return (
    <div className="c-form">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {!isNil(label) && <label>{label}</label>}
      {children}
      <ErrorMessage className={clsx(isEmpty(errorMsg) && 'c-form-hidden')}>
        {errorMsg}
      </ErrorMessage>
    </div>
  )
})
