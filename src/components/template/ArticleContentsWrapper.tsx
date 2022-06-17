import { FC, memo, ReactNode } from 'react'

type Props = {
  children: ReactNode
}

export const ArticleContentsWrapper: FC<Props> = memo(({ children }: Props) => (
  <div className="u-grid u-grid-article">{children}</div>
))
