import { FC } from 'react'

import { Avatar } from '../atoms/Avatar'

type Props = {
  avatarUrl: string
  name: string
  imgUrl: string
  title: string
  createdAt: string
}

export const ArticleCard: FC<Props> = (props: Props) => {
  const { avatarUrl, name, imgUrl, title, createdAt } = props

  return (
    <div>
      <div>
        <Avatar src={avatarUrl} />
        <span>{name}</span>
      </div>
      <figure>
        <img src={imgUrl} alt="" />
        <figcaption>{title}</figcaption>
      </figure>
      <div>
        <span>{createdAt}</span>
      </div>
    </div>
  )
}
