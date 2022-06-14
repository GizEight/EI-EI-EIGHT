import { FC, memo } from 'react'

type Props = {
  tagName: string
}

export const Tag: FC<Props> = memo((props: Props) => {
  const { tagName } = props

  return (
    <div className="c-tag">
      <p>{tagName}</p>
    </div>
  )
})
