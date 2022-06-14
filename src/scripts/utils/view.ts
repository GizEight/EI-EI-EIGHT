import { reduce, find, isNil, size, padEnd } from 'lodash'

import { GetUsersResponse } from '../../@types/api.d'
import { ResponseArticle } from '../../@types/article'
import { ListCard } from '../../@types/view'
import { fetchUsers } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
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
export const formatArticleCards = async (
  listContents: ResponseArticle[]
): Promise<ListCard[] | GetUsersResponse> => {
  const res = await fetchUsers()
  if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
    return res
  }
  return reduce(
    listContents,
    (result: ListCard[], currentValue) => {
      const target = find(res.contents, { userId: currentValue.userId })
      if (!isNil(target)) {
        result.push({
          id: currentValue.id,
          userId: currentValue.userId,
          avatarUrl: target.photoURL,
          name: target.name,
          imgUrl: currentValue.imageUrl,
          title: overflowTextFormatter(currentValue.title),
          createdAt: calculateDate(currentValue.createdAt),
        })
      }
      return result
    },
    []
  )
}
