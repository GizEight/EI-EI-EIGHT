import { FC } from 'react'

type Props = {
  src: string
  alt?: string
}

export const Avatar: FC<Props> = ({ src, alt = '' }) => (
  <img src={src} alt={alt} className="c-avatar" />
)
