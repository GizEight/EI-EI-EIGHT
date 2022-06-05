import React, { FC, memo, useCallback } from 'react'
// eslint-disable-next-line import/no-extraneous-dependencies
import TextareaAutosize from 'react-textarea-autosize'

type Props = {
  label: '名前' | '自己紹介'
  type: 'text' | 'textarea'
}

export const Form: FC<Props> = memo((props: Props) => {
  const { label, type } = props

  const formClassName = useCallback(() => {
    let className: string

    switch (type) {
      case 'text':
        className = 'textform'
        break

      case 'textarea':
        className = 'textareaform'
        break

      default:
        className = 'textform'
        break
    }

    return className
  }, [])

  const switchFormType = useCallback(() => {
    let formType = null

    switch (type) {
      case 'text':
        formType = <input type="text" />
        break

      case 'textarea':
        formType = <TextareaAutosize minRows={3} />
        break

      default:
        formType = null
        break
    }

    return formType
  }, [])

  const switchForm = () => (
    <div className={formClassName()}>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label>{label}</label>
      {switchFormType()}
    </div>
  )

  return <>{switchForm()}</>
})
