import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty, isNil } from 'lodash'
import { useCallback, useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import { GetUsersResponse } from '../../@types/api'
import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { useQueryDetailArticle } from '../../scripts/hooks/useQueryDetailArticle'
import { useToast } from '../../scripts/hooks/useToast'
import { fetchUsers } from '../../scripts/lib/api'
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
  const { showToast } = useToast()

  /*
   * State
   */
  const [userData, setUserData] = useState<GetUsersResponse>()

  /*
   * Get User Data
   */
  useEffect(() => {
    let isMounted = true
    if (!isNil(articleData) && !isEmpty(articleData.userId)) {
      fetchUsers({
        filters: `userId[equals]${articleData.userId}`,
      }).then((res) => {
        if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
          showToast('error', res.errMsg)
          return undefined
        }
        if (isMounted) {
          setUserData(res)
        }
        return undefined
      })
    }
    return () => {
      isMounted = false
    }
  }, [articleData])

  const isError = useCallback(
    () =>
      articleData?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode ||
      userData?.errCode !== ERROR_CODES.NORMAL_NOOP.errCode,
    [articleData, userData]
  )

  const renderError = useCallback(
    () => (
      <ErrorMessage>
        {articleData?.errMsg
          ? articleData.errMsg
          : userData?.errMsg
          ? userData.errMsg
          : ERROR_CODES.UNKNOWN_ERROR.errMsg}
      </ErrorMessage>
    ),
    [articleData, userData]
  )

  return (
    <SectionLayout sectionName="article-detail">
      {articleIsLoading ? (
        <Loading />
      ) : (
        <div>
          {isNil(articleData) || isNil(userData) || isError() ? (
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
                    <Link to={`/user/${userData.contents[0].id}`}>
                      <dt>
                        <FontAwesomeIcon
                          icon={['fas', 'circle-user']}
                          size="lg"
                        />
                        著者
                      </dt>
                      <dd>
                        <img src={userData.contents[0].photoURL} alt="" />
                        <span>{userData.contents[0].name}</span>
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
                      <Link to={`/user/${userData.contents[0].id}`}>
                        <img
                          src={userData.contents[0].photoURL}
                          alt={userData.contents[0].name}
                        />
                        <span>{userData.contents[0].name}</span>
                      </Link>
                      {loginUser.userId === userData.contents[0].userId ? (
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
                    <p>{userData.contents[0].description}</p>
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
