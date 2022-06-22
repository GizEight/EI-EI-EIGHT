import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNil } from 'lodash'
import { useCallback } from 'react'
import { useParams, Link } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { useQueryDetailArticle } from '../../scripts/hooks/useQueryDetailArticle'
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
  const { user: loginUser } = useAppSelector(selectUser)
  const { data: articleData, isLoading: articleIsLoading } =
    useQueryDetailArticle({ articleId: params.id || '' })
  const { data: usersData, isLoading: userIsLoading } = useQueryUsers({
    filter: isNil(articleData)
      ? undefined
      : `userId[equals]${articleData.userId || ''}`,
  })

  const isError = useCallback(
    () =>
      articleData?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode ||
      usersData?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode,
    [articleData, usersData]
  )

  const renderError = useCallback(
    () => (
      <ErrorMessage>
        {articleData?.errMsg
          ? articleData.errMsg
          : usersData?.errMsg
          ? usersData.errMsg
          : ERROR_CODES.UNKNOWN_ERROR.errMsg}
      </ErrorMessage>
    ),
    [articleData, usersData]
  )

  return (
    <SectionLayout sectionName="article-detail">
      {articleIsLoading || userIsLoading ? (
        <Loading />
      ) : (
        <div>
          {isNil(articleData) || isNil(usersData) || isError() ? (
            renderError()
          ) : (
            <>
              <DetailHeader
                thumbSrc={articleData.thumbUrl || 'noimage.JPG'}
                thumbAlt={articleData.title}
                title={articleData.title}
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
                  <PreviewMarkdown markdown={articleData.content} />
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
                      <dd>{calculateDate(articleData.createdAt)}</dd>
                    </div>
                    <div>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'file-lines']}
                          size="lg"
                        />
                        文章量
                      </dt>
                      <dd>{stringCountFormatBy(articleData.content)}</dd>
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
                          to={`/article/${articleData.id}/edit`}
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
