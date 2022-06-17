import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, memo } from 'react'

type InputProps = JSX.IntrinsicElements['input']

type Props = {
  icon: [IconPrefix, IconName]
} & InputProps

export const ImageInput: FC<Props> = memo<Props>((props: Props) => (
  <label htmlFor={props.id} className="c-form-image">
    <FontAwesomeIcon icon={props.icon} size="lg" />
    <input type="file" accept="image/*" {...props} />
  </label>
))
