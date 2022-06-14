import { isNil } from 'lodash'
import { FC, memo, useCallback } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type NullAble<T> = T | null

type Props = {
  label?: NullAble<string>
  placeholder?: NullAble<string>
  type: 'text' | 'textarea'
}

export const Form: FC<Props> = memo((props: Props) => {
  const { label, placeholder, type } = props

  const switchFormType = useCallback(() => {
    switch (type) {
      case 'textarea':
        return (
          <TextareaAutosize
            minRows={3}
            className="c-form-form"
            placeholder={placeholder || ''}
          />
        )

      default:
        return (
          <input
            type="text"
            className="c-form-form"
            placeholder={placeholder || ''}
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
