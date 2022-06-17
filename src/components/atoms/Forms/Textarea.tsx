import { memo, forwardRef } from 'react'
import TextareaAutosize, {
  TextareaAutosizeProps,
} from 'react-textarea-autosize'

export const Textarea = memo(
  forwardRef<HTMLTextAreaElement, TextareaAutosizeProps>((props, ref) => (
    <TextareaAutosize
      minRows={3}
      className="c-form-form_textarea"
      {...props}
      ref={ref}
    />
  ))
)
