import { FC, memo, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { ResponseArticle } from '../../@types/article'
import { ResponseUser } from '../../@types/user'
import { ArticleCard as ArticleCardType } from '../../@types/view'
import { formatArticleCards } from '../../scripts/utils/view'
import { Avatar } from '../molecules/Avatar'

type Props = {
  users: ResponseUser[]
  article: ResponseArticle
}

export const ArticleCard: FC<Props> = memo((props: Props) => {
  const { users, article } = props

  const [articleCard, setArticleCard] = useState<ArticleCardType>({
    id: '',
    userId: '',
    thumbUrl: '',
    avatarUrl: '',
    username: '',
    title: '',
    createdAt: '',
  })

  /*
  ? 表示用にフォーマット後
  */
  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      setArticleCard(formatArticleCards(article, users))
    }
    return () => {
      isMounted = false
    }
  }, [users, article])

  return (
    <div className="p-card_article u-glass">
      <Link to={`/user/${articleCard.userId}`} className="p-card_article_user">
        <Avatar src={articleCard.avatarUrl} />
        <span>{articleCard.username}</span>
      </Link>
      <Link to={`/article/${articleCard.id}`}>
        <figure className="p-card_article_content">
          <img
            src={articleCard.thumbUrl}
            alt=""
            className="p-card_article_content_img"
          />
          <figcaption className="p-card_article_content_title">
            {articleCard.title}
          </figcaption>
        </figure>
      </Link>
      <Link to={`/user/${articleCard.userId}`}>
        <div className="p-card_article_status">
          <span>{articleCard.createdAt}</span>
        </div>
      </Link>
    </div>
  )
})
