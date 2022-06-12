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
    <div className='p-card_article'>
      <div className='p-card_article_user'>
        <Avatar src={avatarUrl} />
        <span>{name}</span>
      </div>
      <figure className='p-card_article_content'>
        <img src={imgUrl} alt="" className='p-card_article_content_img'/>
        <figcaption className='p-card_article_content_title'>{title}</figcaption>
      </figure>
      <div className='p-card_article_status'>
        <span>{createdAt}</span>
      </div>
    </div>
  )
}
