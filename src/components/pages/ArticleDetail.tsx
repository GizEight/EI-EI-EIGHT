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
  const { data: article, isLoading: articleIsLoading } = useQueryArticles({
    filter: `id[equals]${params.id}`,
  })
  const { data: user, isLoading: userIsLoading } = useQueryUsers({
    filter: isNil(article)
      ? undefined
      : `userId[equals]${article.contents[0].userId}`,
  })

  const isError = useCallback(
    () =>
      article?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode ||
      user?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode,
    [article, user]
  )

  const renderError = useCallback(
    () => (
      <ErrorMessage>
        {article?.errMsg
          ? article.errMsg
          : user?.errMsg
          ? user.errMsg
          : ERROR_CODES.UNKNOWN_ERROR.errMsg}
      </ErrorMessage>
    ),
    [article, user]
  )

  return (
    <SectionLayout sectionName="article-detail">
      {articleIsLoading || userIsLoading ? (
        <Loading />
      ) : (
        <div>
          {isNil(article) || isNil(user) || isError() ? (
            renderError()
          ) : (
            <>
              <DetailHeader
                thumbSrc={article.contents[0].thumbUrl || 'noimage.JPG'}
                thumbAlt={article.contents[0].title}
                title={article.contents[0].title}
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
                  <PreviewMarkdown markdown={article.contents[0].content} />
                </div>
                <aside className="p-section-article-detail_side">
                  <dl className="p-section-article-detail_side description u-glass">
                    <Link to={`/user/${user.contents[0].id}`}>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'circle-user']}
                          size="lg"
                        />
                        著者
                      </dt>
                      <dd>
                        <img src={user.contents[0].photoURL} alt="" />
                        <span>{user.contents[0].name}</span>
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
                      <dd>{calculateDate(article.contents[0].createdAt)}</dd>
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
                        {stringCountFormatBy(article.contents[0].content)}
                      </dd>
                    </div>
                  </dl>
                  <div className="p-section-article-detail_side follow u-glass">
                    <div>
                      <Link to={`/user/${user.contents[0].id}`}>
                        <img
                          src={user.contents[0].photoURL}
                          alt={user.contents[0].name}
                        />
                        <span>{user.contents[0].name}</span>
                      </Link>
                      <PrimaryButton>Follow</PrimaryButton>
                    </div>
                    <p>{user.contents[0].description}</p>
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
