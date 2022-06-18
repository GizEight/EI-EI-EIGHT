import { FC, memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const DetailContentWrapper: FC<Props> = memo(({ children }: Props) => (
  <div className="p-section-article-detail_contents">{children}</div>
))
