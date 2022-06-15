import { isNil } from 'lodash'
import { FC, memo, useCallback } from 'react'
import { UseFormRegister, Path } from 'react-hook-form'
import TextareaAutosize from 'react-textarea-autosize'

import { Forms } from '../../@types/view.d'

type NullAble<T> = T | null

type Props = {
  name: Path<Forms>
  required: boolean
  label?: NullAble<string>
  placeholder?: NullAble<string>
  type: 'text' | 'textarea'
  register: UseFormRegister<Forms>
}

export const Form: FC<Props> = memo((props: Props) => {
  const { label, placeholder, type, register, name, required } = props

  const switchFormType = useCallback(() => {
    switch (type) {
      case 'textarea':
        return (
          <TextareaAutosize
            minRows={3}
            className="c-form-form_textarea"
            placeholder={placeholder || ''}
            {...register(name, { required })}
          />
        )

      default:
        return (
          <input
            type="text"
            className="c-form-form_input"
            placeholder={placeholder || ''}
            {...register(name, { required })}
          />
        )
    }
  }, [type])

  const switchForm = useCallback(
    () => (
      <div className="c-form">
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        {!isNil(label) && <label>{label}</label>}
        {switchFormType()}
      </div>
    ),
    [label, switchFormType]
  )

  return <>{switchForm()}</>
})
