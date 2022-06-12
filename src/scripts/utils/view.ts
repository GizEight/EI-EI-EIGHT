import { reduce, find, isNil } from 'lodash'

import { ResponseArticle } from '../../@types/article'
import { ListCard } from '../../@types/view'
import { fetchUsers } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
import { calculateDate } from './dateFormat'

export const formatArticleCards = async (
  listContents: ResponseArticle[]
): Promise<ListCard[]> => {
  const users = await fetchUsers()
  let list
  if (users.errCode === ERROR_CODES.NORMAL_NOOP.errCode) {
    list = reduce(
      listContents,
      (result: ListCard[], currentValue) => {
        const target = find(users.contents, { userId: currentValue.userId })
        if (!isNil(target)) {
          result.push({
            id: currentValue.id,
            avatarUrl: target.photoURL,
            name: target.name,
            imgUrl: currentValue.imageUrl,
            title: currentValue.title,
            createdAt: calculateDate(currentValue.createdAt),
          })
        }
        return result
      },
      []
    )
  }
  return list as ListCard[]
}
