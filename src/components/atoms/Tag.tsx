import React, { FC } from 'react'

type Props = {
  tagName: string
}

export const Tag: FC<Props> = (props: Props) => {
  const { tagName } = props

  return (
    <div className="tag">
      <p>{tagName}</p>
    </div>
  )
}
