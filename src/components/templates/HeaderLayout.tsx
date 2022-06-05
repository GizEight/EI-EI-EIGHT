import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isEmpty } from 'lodash'
import { Suspense } from 'react'
import { Link as RouterLink } from 'react-router-dom'

import { useAppSelector } from '../../app/hooks'
import { selectUser } from '../../app/slices/userSlice'
import { APP_TITLE } from '../../scripts/utils/const'
import { Avatar } from '../atoms/Avatar'
import { PrimaryButton } from '../atoms/PrimaryButton'

export const HeaderLayout = () => {
  const loginUser = useAppSelector(selectUser)

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
              // TODO: login: モーダル開く addnew: 記事作成ページ遷移 avatar: menu表示
              <PrimaryButton onClick={console.log}>Log in</PrimaryButton>
            ) : (
              <>
                <Suspense fallback={<span>Loading...</span>}>
                  <Avatar
                    src={loginUser.user.photoURL}
                    alt={loginUser.user.name}
                  />
                </Suspense>
                <PrimaryButton onClick={console.log}>Add new</PrimaryButton>
              </>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
