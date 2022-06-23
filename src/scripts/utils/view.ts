import { find, isNil, size, padEnd } from 'lodash'

import { ResponseArticle } from '../../@types/article'
import { ResponseUser } from '../../@types/user'
import { ArticleCard } from '../../@types/view'
import { calculateDate } from './dateFormat'

/*
 * 文字数に応じて３点リーダー付与
 */
export const overflowTextFormatter = (text: string) => {
  if (size(text) > 40) {
    return padEnd(text.slice(0, 40), 43, '.')
  }
  return text
}

/*
 * 記事一覧に表示する内容をフォーマット
 */

export const formatArticleCards = (
  article: ResponseArticle,
  users: ResponseUser[]
): ArticleCard => {
  const author = find(users, { userId: article.userId })
  if (isNil(author)) {
    return {
      id: article.id,
      userId: '',
      thumbUrl: article.thumbUrl,
      avatarUrl: 'noimage.JPG',
      username: 'ユーザーが存在しません。',
      title: article.title,
      createdAt: calculateDate(article.createdAt),
    }
  }
  return {
    id: article.id,
    userId: author.userId,
    thumbUrl: article.thumbUrl || 'noimage.JPG',
    avatarUrl: author.photoURL,
    username: author.name,
    title: article.title,
    createdAt: calculateDate(article.createdAt),
  }
}
