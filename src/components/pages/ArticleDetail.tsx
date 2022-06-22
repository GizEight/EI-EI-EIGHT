import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty, isNil } from 'lodash'
import { useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { ERROR_CODES } from '../../scripts/lib/error'
import { calculateDate } from '../../scripts/utils/dateFormat'
import { stringCountFormatBy } from '../../scripts/utils/format'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Loading } from '../atoms/Loading'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { RouterLink } from '../atoms/RouterLink'
import { DetailContentWrapper } from '../molecules/ArticleDetail/DetailContent'
import { DetailHeader } from '../molecules/ArticleDetail/DetailHeader'
import { PreviewMarkdown } from '../molecules/PreviewMarkdown'
import { SectionLayout } from '../template/SectionLayout'

export const ArticleDetail = () => {
  /*
   * Hooks
   */
  const params = useParams<{ id: string }>()
  console.log(params.id)
  const { user: loginUser } = useAppSelector(selectUser)
  const { data: articlesData, isLoading: articleIsLoading } = useQueryArticles({
    id: params.id,
  })
  const { data: usersData, isLoading: userIsLoading } = useQueryUsers({
    filter:
      isNil(articlesData) || isEmpty(articlesData)
        ? undefined
        : `userId[equals]${articlesData.userId || ''}`,
  })

  const isError = useCallback(
    () =>
      articlesData?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode ||
      usersData?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode,
    [articlesData, usersData]
  )

  const renderError = useCallback(
    () => (
      <ErrorMessage>
        {articlesData?.errMsg
          ? articlesData.errMsg
          : usersData?.errMsg
          ? usersData.errMsg
          : ERROR_CODES.UNKNOWN_ERROR.errMsg}
      </ErrorMessage>
    ),
    [articlesData, usersData]
  )

  return (
    <SectionLayout sectionName="article-detail">
      {articleIsLoading || userIsLoading ? (
        <Loading />
      ) : (
        <div>
          {isNil(articlesData) || isNil(usersData) || isError() ? (
            renderError()
          ) : (
            <>
              <DetailHeader
                thumbSrc={articlesData.thumbUrl || 'noimage.JPG'}
                thumbAlt={articlesData.title}
                title={articlesData.title}
              />
              <DetailContentWrapper>
                <div className="p-section-article-detail_reaction">
                  <div className="p-section-article-detail_reaction__inner">
                    <div className="p-section-article-detail_reaction__inner like">
                      <button>
                        <FontAwesomeIcon icon={['fas', 'heart']} size="lg" />
                      </button>
                      {/* TODO: いいね数 */}
                      1100
                    </div>
                  </div>
                </div>
                <div className="p-section-article-detail_body u-glass">
                  <PreviewMarkdown markdown={articlesData.content} />
                </div>
                <aside className="p-section-article-detail_side">
                  <dl className="p-section-article-detail_side description u-glass">
                    <Link to={`/user/${usersData.contents[0].id}`}>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'circle-user']}
                          size="lg"
                        />
                        著者
                      </dt>
                      <dd>
                        <img src={usersData.contents[0].photoURL} alt="" />
                        <span>{usersData.contents[0].name}</span>
                      </dd>
                    </Link>
                    <div>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'calendar-check']}
                          size="lg"
                        />
                        公開日
                      </dt>
                      <dd>{calculateDate(articlesData.createdAt)}</dd>
                    </div>
                    <div>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'file-lines']}
                          size="lg"
                        />
                        文章量
                      </dt>
                      <dd>{stringCountFormatBy(articlesData.content)}</dd>
                    </div>
                  </dl>
                  <div className="p-section-article-detail_side follow u-glass">
                    <div>
                      <Link to={`/user/${usersData.contents[0].id}`}>
                        <img
                          src={usersData.contents[0].photoURL}
                          alt={usersData.contents[0].name}
                        />
                        <span>{usersData.contents[0].name}</span>
                      </Link>
                      {loginUser.userId === usersData.contents[0].userId ? (
                        <RouterLink
                          isBtn
                          to={`/article/${articlesData.id}/edit`}
                        >
                          Edit
                        </RouterLink>
                      ) : (
                        <PrimaryButton>Follow</PrimaryButton>
                      )}
                    </div>
                    <p>{usersData.contents[0].description}</p>
                  </div>
                </aside>
              </DetailContentWrapper>
            </>
          )}
        </div>
      )}
    </SectionLayout>
  )
}
