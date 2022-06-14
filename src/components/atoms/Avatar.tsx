import { FC, memo, Suspense } from 'react'

import { Loading } from './Loading'

type Props = {
  src: string
  alt?: string
}

export const Avatar: FC<Props> = memo(({ src, alt = '' }: Props) => (
  <Suspense fallback={<Loading />}>
    <img src={src} alt={alt} className="c-avatar" />
  </Suspense>
))
