import { FC, memo } from 'react'

type Props = {
  thumbSrc: string
  thumbAlt: string
  title: string
}

export const DetailHeader: FC<Props> = memo(
  ({ thumbSrc, thumbAlt, title }: Props) => (
    <header className="p-section-article-detail_header">
      <img src={thumbSrc} alt={thumbAlt} />
      <h1>{title}</h1>
    </header>
  )
)
