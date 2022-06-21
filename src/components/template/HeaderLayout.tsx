import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { isEmpty } from 'lodash'
import { Suspense, useState, memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppSelector, useAppDispatch } from '../../app/hooks'
import { selectArticle, resetForm } from '../../app/slices/articleSlice'
import { selectUser } from '../../app/slices/userSlice'
import { useAuth } from '../../scripts/hooks/useAuth'
import { useMutateArticles } from '../../scripts/hooks/useMutateArticles'
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
  const dispatch = useAppDispatch()
  const { user } = useAppSelector(selectUser)
  const { article } = useAppSelector(selectArticle)
  const { createArticleMutation, updateArticleMutation } = useMutateArticles()

  /*
   * Mutation state
   */
  const { isLoading: createIsLoading, isSuccess: createIsSuccess } =
    createArticleMutation
  const { isLoading: updateIsLoading } = updateArticleMutation

  /*
   * State
   */
  const [isShowPop, setIsShowPop] = useState(false)

  /*
   * 記事投稿
   */
  const onClickPost = useCallback(() => {
    const { userId } = user
    const { id, thumbUrl } = article
    const { title, content } = article.form

    /*
     ? 記事のidが存在しない ? 記事作成 : 記事更新
     */
    if (isEmpty(id)) {
      createArticleMutation.mutate({ userId, title, content, thumbUrl })
      createIsSuccess && dispatch(resetForm())
    } else {
      updateArticleMutation.mutate({ id, userId, title, content, thumbUrl })
    }
  }, [user, article])

  return (
    <header className={clsx('l-header', article.isEdit && 'l-header-edit')}>
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
            <PrimaryButton
              onClick={onClickPost}
              disabled={
                article.form.isValid || createIsLoading || updateIsLoading
              }
              isLoading={createIsLoading || updateIsLoading}
            >
              Post it !
            </PrimaryButton>
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
                  <button onClick={() => setIsShowPop(!isShowPop)}>
                    <Suspense fallback={<span>Loading...</span>}>
                      <Avatar src={user.photoUrl} alt={user.name} />
                    </Suspense>
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
