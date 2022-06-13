import { map, isNil } from 'lodash'
import { useState, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'

import { ListCard } from '../../@types/view'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { formatArticleCards } from '../../scripts/utils/view'
import { Loading } from '../atoms/Loading'
import { ArticleCard } from '../organisms/ArticleCard'

export const ArticleList = () => {
  const { data: articleData, status: articleStatus } = useQueryArticles()

  const [articleList, setArticleList] = useState<ListCard[]>([])

  useEffect(() => {
    if (!isNil(articleData)) {
      formatArticleCards(articleData.contents).then((list) => {
        setArticleList(list)
      })
    }
  }, [articleData])

  if (articleStatus === 'loading') {
    return <Loading />
  }
  if (articleStatus === 'error') {
    return <div>Error...</div>
  }

  return (
    <section className="p-article u-grid u-grid-article">
      {isNil(articleData) ? (
        <div>articleData is undefined</div>
      ) : (
        <>
          {map(articleList, (content) => (
            <Tilt key={content.id}>
              <ArticleCard
                id={content.id}
                userId={content.userId}
                imgUrl={content.imgUrl || 'noimage.JPG'}
                avatarUrl={content.avatarUrl}
                name={content.name}
                title={content.title}
                createdAt={content.createdAt}
              />
            </Tilt>
          ))}
        </>
      )}
    </section>
  )
}
