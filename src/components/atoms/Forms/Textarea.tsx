import clsx from 'clsx'
import { forwardRef } from 'react'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

type Props = TextareaAutosizeProps & {
  isBg: boolean
}

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ isBg, ...props }, ref) => (
    <TextareaAutosize
      minRows={3}
      className={clsx('c-form-form_textarea', isBg && 'c-form-form-isBg')}
      {...props}
      ref={ref}
    />
  )
)
