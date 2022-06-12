import { map, isNil } from 'lodash'
import { useState, useEffect } from 'react'

import { ListCard } from '../../@types/view'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { calculateDate } from '../../scripts/utils/dateFormat'
import { formatArticleCards } from '../../scripts/utils/view'
import { ArticleCard } from '../organisms/ArticleCard'

export const ArticleList = () => {
  const { data: articleData, status: articleStatus } = useQueryArticles()

  const [data, setData] = useState<ListCard[]>([])

  useEffect(() => {
    if (!isNil(articleData)) {
      formatArticleCards(articleData.contents).then((list) => {
        setData(list)
      })
    }
  }, [])

  if (articleStatus === 'loading') {
    return <div>Loading...</div>
  }
  if (articleStatus === 'error') {
    return <div>Error...</div>
  }

  return (
    <div>
      {isNil(articleData) ? (
        <div>articleData is undefined</div>
      ) : (
        <>
          {map(data, (content) => (
            <ArticleCard
              key={content.id}
              imgUrl={content.imgUrl}
              avatarUrl={content.avatarUrl}
              name={content.name}
              title={content.title}
              createdAt={content.createdAt}
            />
          ))}
        </>
      )}
    </div>
  )
}
