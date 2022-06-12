import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty } from 'lodash'
import { Suspense, useState } from 'react'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { useAuth } from '../../scripts/hooks/useAuth'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { APP_TITLE } from '../../scripts/utils/const'
import { Avatar } from '../atoms/Avatar'
import { Popover } from '../atoms/Popover'
import { PrimaryButton } from '../atoms/PrimaryButton'
import { RouterLink } from '../atoms/RouterLink'

export const HeaderLayout = () => {
  // TODO: loading時にボタンにスピナー表示させる
  const { login, logout } = useAuth()
  const { user } = useAppSelector(selectUser)

  const { data, status } = useQueryUsers({ userId: user.userId })

  const [isShowPop, setIsShowPop] = useState(false)

  // TODO: エラー処理
  if (status === 'error') {
    return <div>Error</div>
  }

  return (
    <header className="l-header">
      <div className="l-header_inner">
        <div className="l-header_content">
          <RouterLink to="/">
            <h1 className="l-header_content-title">
              <FontAwesomeIcon icon={['fas', 'lightbulb']} />
              <span>{APP_TITLE}</span>
            </h1>
          </RouterLink>
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
        </div>
      </div>
    </header>
  )
}
