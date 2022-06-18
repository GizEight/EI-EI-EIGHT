import { FC, memo, ReactNode } from 'react'

type Props = {
  body: ReactNode
  side: ReactNode
}

export const DetailContentWrapper: FC<Props> = memo(({ body, side }: Props) => (
  <div className="p-section-article-detail_contents">
    <div className="p-section-article-detail_body">{body}</div>
    <aside className="p-section-article-detail_side">{side}</aside>
  </div>
))
