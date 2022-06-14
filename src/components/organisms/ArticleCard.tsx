import { FC, memo } from 'react'
import { Link } from 'react-router-dom'

import { Avatar } from '../molecules/Avatar'

type Props = {
  id: string
  userId: string
  avatarUrl: string
  name: string
  imgUrl: string
  title: string
  createdAt: string
}

export const ArticleCard: FC<Props> = memo((props: Props) => {
  const { id, userId, avatarUrl, name, imgUrl, title, createdAt } = props

  return (
    <div className="p-card_article">
      <Link to={`/user/${userId}`} className="p-card_article_user">
        <Avatar src={avatarUrl} />
        <span>{name}</span>
      </Link>
      <Link to={`/article/${id}`}>
        <figure className="p-card_article_content">
          <img src={imgUrl} alt="" className="p-card_article_content_img" />
          <figcaption className="p-card_article_content_title">
            {title}
          </figcaption>
        </figure>
      </Link>
      <Link to={`/user/${userId}`}>
        <div className="p-card_article_status">
          <span>{createdAt}</span>
        </div>
      </Link>
    </div>
  )
})
