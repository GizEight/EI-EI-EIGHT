import { map, isNil } from 'lodash'
import { useState, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'

import { ListCard } from '../../@types/view'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useToast } from '../../scripts/hooks/useToast'
import { PER_PAGE } from '../../scripts/utils/const'
import { formatArticleCards } from '../../scripts/utils/view'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Loading } from '../atoms/Loading'
import { SectionTitle } from '../atoms/SectionTitle'
import { ArticleCard } from '../organisms/ArticleCard'
import { PagingButtons } from '../organisms/PagingButtons'
import { SearchForm } from '../organisms/SearchForm'
import { ArticleContentsWrapper } from '../template/ArticleContentsWrapper'
import { SectionLayout } from '../template/SectionLayout'

export const ArticleList = () => {
  /*
   * State
   */
  const [articleList, setArticleList] = useState<ListCard[]>([])
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)

  /*
   * Hooks
   */
  const { data: articleData, status: articleStatus } = useQueryArticles({
    page: currentPage,
  })
  const { showToast } = useToast()

  /*
   * Format Article Data & Set Page Count
   */
  useEffect(() => {
    let isMounted = true
    if (!isNil(articleData)) {
      isMounted && setPageCount(Math.ceil(articleData.totalCount / PER_PAGE))
      formatArticleCards(articleData.contents).then((list) => {
        if (isMounted) {
          if ('errCode' in list) {
            showToast('error', list.errMsg)
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
        <SearchForm />
        <SectionTitle>Articles</SectionTitle>
        {isNil(articleData) ? (
          <div style={{ marginTop: '30px' }}>
            <ErrorMessage>List is not defined...</ErrorMessage>
          </div>
        ) : (
          <>
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
            <PagingButtons
              allCountPage={pageCount}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </>
        )}
      </SectionLayout>
      <SectionLayout sectionName="article-featured">
        <SectionTitle>Featured</SectionTitle>
        {isNil(articleData) ? (
          <div style={{ marginTop: '30px' }}>
            <ErrorMessage>List is not defined...</ErrorMessage>
          </div>
        ) : (
          <>
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
            <PagingButtons
              allCountPage={pageCount}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
          </>
        )}
      </SectionLayout>
    </>
  )
}
