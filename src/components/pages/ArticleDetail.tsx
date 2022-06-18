import { isNil } from 'lodash'
import { useParams } from 'react-router-dom'

import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { ERROR_CODES } from '../../scripts/lib/error'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Loading } from '../atoms/Loading'
import { DetailContentWrapper } from '../molecules/ArticleDetail/DetailContent'
import { DetailHeader } from '../molecules/ArticleDetail/DetailHeader'
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

  return (
    <SectionLayout sectionName="article-detail">
      {articleIsLoading || userIsLoading ? (
        <Loading />
      ) : (
        <div>
          {article?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode ||
          user?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode ? (
            <ErrorMessage>
              {article?.errMsg
                ? article.errMsg
                : user?.errMsg
                ? user.errMsg
                : ERROR_CODES.UNKNOWN_ERROR.errMsg}
            </ErrorMessage>
          ) : (
            <>
              <DetailHeader
                thumbSrc={article.contents[0].thumbUrl || 'noimage.JPG'}
                thumbAlt={article.contents[0].title}
                title={article.contents[0].title}
              />
              <DetailContentWrapper>
                <div className="p-section-article-detail_body">
                  <div
                    // eslint-disable-next-line react/no-danger
                    dangerouslySetInnerHTML={{
                      __html: `${article.contents[0].content}`,
                    }}
                  />
                </div>
                <aside className="p-section-article-detail_side">side</aside>
              </DetailContentWrapper>
            </>
          )}
        </div>
      )}
    </SectionLayout>
  )
}
