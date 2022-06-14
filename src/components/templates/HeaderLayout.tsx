import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty } from 'lodash'
import { Suspense, useState, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectArticle } from '../../app/slices/articleSlice'
import { selectUser } from '../../app/slices/userSlice'
import { useAuth } from '../../scripts/hooks/useAuth'
import { useMutateArticles } from '../../scripts/hooks/useMutateArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { APP_TITLE } from '../../scripts/utils/const'
import { Popover } from '../atoms/Popover'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { RouterLink } from '../atoms/RouterLink'
import { Avatar } from '../molecules/Avatar'

export const HeaderLayout = memo(() => {
  /*
   * Hooks
   */
  const { login, logout } = useAuth()
  const navigate = useNavigate()
  const { user } = useAppSelector(selectUser)
  const { article } = useAppSelector(selectArticle)
  const { data } = useQueryUsers({ userId: user.userId })
  const { createArticleMutation, updateArticleMutation } = useMutateArticles()

  /*
   * State
   */
  const [isShowPop, setIsShowPop] = useState(false)

  /*
   * 記事投稿
   */
  const onClickPost = useCallback(() => {
    const { userId } = user
    const { id, title, content, imageUrl } = article

    /*
     ? 記事のidが存在しない ? 記事作成 : 記事更新
     */
    if (isEmpty(id)) {
      createArticleMutation.mutate({ userId, title, content, imageUrl })
    } else {
      updateArticleMutation.mutate({ id, userId, title, content, imageUrl })
    }
  }, [user, article])

  return (
    <header
      className={`l-header ${article.isEdit ? 'l-header-edit' : undefined}`}
    >
      <div className="l-header_inner">
        <div className="l-header_content">
          {article.isEdit ? (
            <button onClick={() => navigate(-1)}>
              <FontAwesomeIcon icon={['fas', 'circle-arrow-left']} size="lg" />
            </button>
          ) : (
            <RouterLink to="/">
              <h1 className="l-header_content-title">
                <FontAwesomeIcon icon={['fas', 'lightbulb']} />
                <span>{APP_TITLE}</span>
              </h1>
            </RouterLink>
          )}
          {article.isEdit ? (
            <PrimaryButton onClick={onClickPost}>Post it !</PrimaryButton>
          ) : (
            <nav className="l-header_content-menu">
              {isEmpty(user.userId) ? (
                <PrimaryButton onClick={login} isRounded>
                  <p className="u-icon-btn">
                    <FontAwesomeIcon icon={['fab', 'google']} />
                    <span>Login with Google</span>
                  </p>
                </PrimaryButton>
              ) : (
                <>
                  <Suspense fallback={<span>Loading...</span>}>
                    <button onClick={() => setIsShowPop(!isShowPop)}>
                      <Avatar
                        src={data?.contents[0].photoURL || ''}
                        alt={data?.contents[0].name}
                      />
                    </button>
                    {isShowPop && (
                      <Popover>
                        <div className="c-popover_item">
                          <PrimaryButton
                            onClick={() => {
                              logout()
                              setIsShowPop(false)
                            }}
                          >
                            Log out
                          </PrimaryButton>
                        </div>
                      </Popover>
                    )}
                  </Suspense>
                  <RouterLink to="/article/create" isBtn>
                    Add new
                  </RouterLink>
                </>
              )}
            </nav>
          )}
        </div>
      </div>
    </header>
  )
})
