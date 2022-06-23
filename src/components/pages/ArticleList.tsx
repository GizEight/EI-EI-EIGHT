import { map, isNil } from 'lodash'
import { useState, useEffect } from 'react'
import Tilt from 'react-parallax-tilt'

import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { PER_PAGE } from '../../scripts/utils/const'
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
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)

  /*
   * Hooks
   */
  const { data: articleData, status: articleStatus } = useQueryArticles({
    page: currentPage,
  })
  const { data: userData, status: userStatus } = useQueryUsers({})

  /*
  ? 記事一覧取得後
  */
  useEffect(() => {
    let isMounted = true
    if (!isNil(articleData) && isMounted) {
      setPageCount(Math.ceil(articleData.totalCount / PER_PAGE))
    }
    return () => {
      isMounted = false
    }
  }, [articleData])

  if (articleStatus === 'loading' || userStatus === 'loading') {
    return <Loading />
  }

  return (
    <>
      <SectionLayout sectionName="article">
        <SearchForm />
        <SectionTitle>Articles</SectionTitle>
        {isNil(articleData) || isNil(userData) ? (
          <div style={{ marginTop: '30px' }}>
            <ErrorMessage>List is not defined...</ErrorMessage>
          </div>
        ) : (
          <>
            <ArticleContentsWrapper>
              {map(articleData.contents, (content) => (
                <Tilt key={content.id}>
                  <ArticleCard users={userData.contents} article={content} />
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
        {isNil(articleData) || isNil(userData) ? (
          <div style={{ marginTop: '30px' }}>
            <ErrorMessage>List is not defined...</ErrorMessage>
          </div>
        ) : (
          <>
            <ArticleContentsWrapper>
              {map(articleData.contents, (content) => (
                <Tilt key={content.id}>
                  <ArticleCard users={userData.contents} article={content} />
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
