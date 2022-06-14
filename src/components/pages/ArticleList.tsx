import { map, isNil } from 'lodash'
import { useState, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'

import { ListCard } from '../../@types/view'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useToast } from '../../scripts/hooks/useToast'
import { formatArticleCards } from '../../scripts/utils/view'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Loading } from '../atoms/Loading'
import { SectionTitle } from '../atoms/SectionTitle'
import { ArticleCard } from '../organisms/ArticleCard'
import { SearchForm } from '../organisms/SearchForm'
import { ArticleContentsWrapper } from '../templates/ArticleContentsWrapper'
import { SectionLayout } from '../templates/SectionLayout'

export const ArticleList = () => {
  const { data: articleData, status: articleStatus } = useQueryArticles()
  const { showErrorToast } = useToast()
  const { currentPage, prevPage, nextPage, jumpPageBy } = usePaging({
    allPageCount: isNil(articleData)
      ? 1
      : size(articleData.contents) / PER_PAGE,
  })

  const [articleList, setArticleList] = useState<ListCard[]>([])

  useEffect(() => {
    let isMounted = true
    if (!isNil(articleData)) {
      formatArticleCards(articleData.contents).then((list) => {
        if (isMounted) {
          if ('errCode' in list) {
            showErrorToast(list)
            return
          }
          setArticleList(list)
        }
      })
    }
    return () => {
      isMounted = false
    }
  }, [articleData])

  if (articleStatus === 'loading') {
    return <Loading />
  }

  return (
    <>
      <SectionLayout sectionName="article">
        <div className="p-section_content">
          <SearchForm />
          <SectionTitle>Articles</SectionTitle>
          {isNil(articleData) ? (
            <div style={{ marginTop: '30px' }}>
              <ErrorMessage>List is not defined...</ErrorMessage>
            </div>
          ) : (
            <ArticleContentsWrapper>
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
            </ArticleContentsWrapper>
          )}
        </div>
      </SectionLayout>
      <SectionLayout sectionName="article-featured">
        <div className="p-section_content">
          <SectionTitle>Featured</SectionTitle>
          {isNil(articleData) ? (
            <div style={{ marginTop: '30px' }}>
              <ErrorMessage>List is not defined...</ErrorMessage>
            </div>
          ) : (
            <ArticleContentsWrapper>
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
            </ArticleContentsWrapper>
          )}
        </div>
      </SectionLayout>
    </>
  )
}
