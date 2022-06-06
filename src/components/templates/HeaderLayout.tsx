import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty } from 'lodash'
import { Suspense, useState } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { useAuth } from '../../scripts/hooks/useAuth'
import { APP_TITLE } from '../../scripts/utils/const'
import { Avatar } from '../atoms/Avatar'
import { Popover } from '../atoms/Popover'
import { PrimaryButton } from '../atoms/PrimaryButton'

export const HeaderLayout = () => {
  const loginUser = useAppSelector(selectUser)
  // TODO: loading時にボタンにスピナー表示させる
  const { loading, login, logout } = useAuth()

  const [isShowPop, setIsShowPop] = useState(false)

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
            {isEmpty(loginUser.user.userId) ? (
              <PrimaryButton onClick={login} isRounded>
                <p className="iconwithbtn">
                  <FontAwesomeIcon icon={['fab', 'google']} />
                  <span>Login with Google</span>
                </p>
              </PrimaryButton>
            ) : (
              <>
                <Suspense fallback={<span>Loading...</span>}>
                  <button onClick={() => setIsShowPop(!isShowPop)}>
                    <Avatar
                      src={loginUser.user.photoURL}
                      alt={loginUser.user.name}
                    />
                  </button>
                  {isShowPop && (
                    <Popover>
                      <div className="popover_item">
                        <PrimaryButton onClick={logout}>Log out</PrimaryButton>
                      </div>
                    </Popover>
                  )}
                </Suspense>
                <RouterLink to="/article/create" className="btn">
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
