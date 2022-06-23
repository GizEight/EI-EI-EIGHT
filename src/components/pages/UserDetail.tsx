import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty, isNil, map } from 'lodash'
import { FC, useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'
import { useParams } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { PER_PAGE } from '../../scripts/utils/const'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Loading } from '../atoms/Loading'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { RouterLink } from '../atoms/RouterLink'
import { SectionTitle } from '../atoms/SectionTitle'
import { ArticleCard } from '../organisms/ArticleCard'
import { PagingButtons } from '../organisms/PagingButtons'
import { ArticleContentsWrapper } from '../template/ArticleContentsWrapper'
import { SectionLayout } from '../template/SectionLayout'

export const UserDetail: FC = () => {
  /*
   * State
   */
  const [pageCount, setPageCount] = useState(1)
  const [currentPage, setCurrentPage] = useState(0)

  /*
   * Hooks
   */
  const params = useParams<{ id: string }>()
  const { user } = useAppSelector(selectUser)
  const { data: userData, status: userStatus } = useQueryUsers({
    filter: `userId[equals]${params.id}`,
  })
  const { data: articleData, status: articleStatus } = useQueryArticles({
    filter: `userId[equals]${params.id}`,
    page: currentPage,
  })

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

  if (userStatus === 'loading' || articleStatus === 'loading') {
    return <Loading />
  }

  return (
    <>
      {isNil(userData) ? (
        <div style={{ marginTop: '30px' }}>
          <ErrorMessage>User is not defined...</ErrorMessage>
        </div>
      ) : (
        <SectionLayout sectionName="user-detail">
          <div>
            <figure>
              <img
                src={userData.contents[0].photoURL}
                alt={userData.contents[0].name}
              />
              <figcaption>
                <h2>{userData.contents[0].name}</h2>
                {!isEmpty(userData.contents[0].description) && (
                  <p>{userData.contents[0].description}</p>
                )}
                <div>
                  <FontAwesomeIcon icon={['fab', 'twitter']} />
                  {/* {!isEmpty(userData.contents[0].twitterUrl) && (
                    )} */}
                  <FontAwesomeIcon icon={['fab', 'instagram']} />
                  {/* {!isEmpty(userData.contents[0].instagramUrl) && (
                    )} */}
                </div>
              </figcaption>
            </figure>
            <div>
              {isEmpty(user.userId) ? (
                <PrimaryButton>Follow</PrimaryButton>
              ) : (
                <RouterLink to={`/user/${params.id}/edit`} isBtn>
                  Edit
                </RouterLink>
              )}
            </div>
          </div>
        </SectionLayout>
      )}
      <SectionLayout sectionName="article">
        <SectionTitle>Articles</SectionTitle>
        {isNil(articleData) ||
        isEmpty(articleData.contents) ||
        isNil(userData) ? (
          <div style={{ marginTop: '30px' }}>
            <ErrorMessage>記事が存在しません。</ErrorMessage>
          </div>
        ) : (
          <>
            <PagingButtons
              allCountPage={pageCount}
              currentPage={currentPage}
              onPageChange={(page: number) => setCurrentPage(page)}
            />
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
