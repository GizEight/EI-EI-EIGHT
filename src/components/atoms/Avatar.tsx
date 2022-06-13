import { FC, Suspense } from 'react'

import { Loading } from './Loading'

type Props = {
  src: string
  alt?: string
}

export const Avatar: FC<Props> = ({ src, alt = '' }) => (
  <Suspense fallback={<Loading />}>
    <img src={src} alt={alt} className="c-avatar" />
  </Suspense>
)
