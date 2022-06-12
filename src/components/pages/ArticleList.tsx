import { map, isNil, find } from 'lodash'

import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { calculateDate } from '../../scripts/utils/dateFormat'
import { ArticleCard } from '../organisms/ArticleCard'

export const ArticleList = () => {
  const { data: userData, status: userStatus } = useQueryUsers()
  const { data: articleData, status: articleStatus } = useQueryArticles()

  if (articleStatus === 'loading' || userStatus === 'loading') {
    return <div>Loading...</div>
  }
  if (articleStatus === 'error' || userStatus === 'error') {
    return <div>Error...</div>
  }

  return (
    <div>
      {isNil(articleData) || isNil(userData) ? (
        <div>articleData is undefined</div>
      ) : (
        <>
          {map(articleData.contents, (content) => (
            <ArticleCard
              key={content.id}
              imgUrl={content.imageUrl}
              avatarUrl={
                find(userData.contents, { userId: content.userId })?.photoURL ||
                ''
              }
              name={
                find(userData.contents, { userId: content.userId })?.name ||
                'No Register User'
              }
              title={content.title}
              createdAt={calculateDate(content.createdAt)}
            />
          ))}
        </>
      )}
    </div>
  )
}
