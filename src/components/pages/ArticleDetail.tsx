import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { ERROR_CODES } from '../../scripts/lib/error'
import { calculateDate } from '../../scripts/utils/dateFormat'
import { stringCountFormatBy } from '../../scripts/utils/format'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Loading } from '../atoms/Loading'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { DetailContentWrapper } from '../molecules/ArticleDetail/DetailContent'
import { DetailHeader } from '../molecules/ArticleDetail/DetailHeader'
import { PreviewMarkdown } from '../molecules/PreviewMarkdown'
import { SectionLayout } from '../template/SectionLayout'

export const ArticleDetail = () => {
  /*
   * Hooks
   */
  const params = useParams<{ id: string }>()
  const { user: loginUser } = useAppSelector(selectUser)
  const { data: articlesData, isLoading: articleIsLoading } = useQueryArticles({
    filter: `id[equals]${params.id}`,
  })
  const { data: usersData, isLoading: userIsLoading } = useQueryUsers({
    filter: isNil(articlesData)
      ? undefined
      : `userId[equals]${articlesData.contents[0].userId}`,
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
                thumbSrc={articlesData.contents[0].thumbUrl || 'noimage.JPG'}
                thumbAlt={articlesData.contents[0].title}
                title={articlesData.contents[0].title}
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
                  <PreviewMarkdown
                    markdown={articlesData.contents[0].content}
                  />
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
                      <dd>
                        {calculateDate(articlesData.contents[0].createdAt)}
                      </dd>
                    </div>
                    <div>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'file-lines']}
                          size="lg"
                        />
                        文章量
                      </dt>
                      <dd>
                        {stringCountFormatBy(articlesData.contents[0].content)}
                      </dd>
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
                      <PrimaryButton>Follow</PrimaryButton>
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
