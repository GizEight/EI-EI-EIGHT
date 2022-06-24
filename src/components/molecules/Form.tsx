import { isNil } from 'lodash'
import { FC, memo, ReactNode } from 'react'

import { ErrorMessage } from '../atoms/ErrorMessage'

type NullAble<T> = T | null
type Undefinedable<T> = T | undefined

type Props = {
  label?: NullAble<string>
  id?: Undefinedable<string>
  children: ReactNode
  errorMsg?: string
}

export const Form: FC<Props> = memo((props: Props) => {
  const { label = '', id = '', children, errorMsg = '' } = props

  return (
    <div className="c-form">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      {!isNil(label) && <label htmlFor={id}>{label}</label>}
      {children}
      <ErrorMessage>{errorMsg}</ErrorMessage>
    </div>
  )
})
