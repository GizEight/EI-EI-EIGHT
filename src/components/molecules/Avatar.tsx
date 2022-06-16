import { FC, memo, Suspense } from 'react'

import { Loading } from '../atoms/Loading'

type ImageProps = JSX.IntrinsicElements['img']

type Props = ImageProps

export const Avatar: FC<Props> = memo<Props>((props: Props) => (
  <Suspense fallback={<Loading />}>
    <img {...props} alt={props.alt} className="c-avatar" />
  </Suspense>
))
