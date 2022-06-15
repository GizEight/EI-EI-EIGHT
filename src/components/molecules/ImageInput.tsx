import { IconName, IconPrefix } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FC, memo, ChangeEvent } from 'react'

type Props = {
  icon: [IconPrefix, IconName]
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  id: string
}

export const ImageInput: FC<Props> = memo(({ icon, onChange, id }: Props) => (
  <label htmlFor={id} className="c-form-image">
    <FontAwesomeIcon icon={icon} size="lg" />
    <input type="file" accept="image/*" id={id} onChange={onChange} />
  </label>
))
