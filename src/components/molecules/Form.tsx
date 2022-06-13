import { FC, memo, useCallback } from 'react'
import TextareaAutosize from 'react-textarea-autosize'

type Props = {
  label: '名前' | '自己紹介'
  type: 'text' | 'textarea'
}

export const Form: FC<Props> = memo((props: Props) => {
  const { label, type } = props

  const switchFormType = useCallback(() => {
    let formType = null

    switch (type) {
      case 'text':
        formType = <input type="text" className="c-form-form" />
        break

      case 'textarea':
        formType = <TextareaAutosize minRows={3} className="c-form-form" />
        break

      default:
        formType = null
        break
    }

    return formType
  }, [])

  const switchForm = () => (
    <div className="c-form">
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>{label}</label>
      {switchFormType()}
    </div>
  )

  return <>{switchForm()}</>
})
