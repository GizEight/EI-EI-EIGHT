import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { isNil, isEmpty, map } from 'lodash'
import { FC, useEffect } from 'react'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { Toast } from './components/atoms/Toast'
import { LayoutsWrapper } from './components/templates/LayoutsWrapper'
import { auth } from './firebase'
import { HOME_ROUTES } from './routes'
import { useMutateUsers } from './scripts/hooks/useMutateUsers'
import { useToast } from './scripts/hooks/useToast'
import { fetchUsers } from './scripts/lib/api'

const App: FC = () => {
  const { toast, onClickCloseToast } = useToast()
  const { registerUser, deleteUser, createUserMutation } = useMutateUsers()

  /*
   * ログイン状況監視
   */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (isNil(user)) {
          deleteUser()
          return
        }

        /*
        ? ユーザーが登録済か確認
        */
        fetchUsers({
          filters: `userId[equals]${user.uid}`,
        }).then(async (res) => {
          if (isEmpty(res.contents)) {
            const signInNewUser = {
              name: user.displayName || user.uid,
              photoURL: user.photoURL || '',
              description: '',
              twitterUrl: '',
              facebookUrl: '',
              userId: user.uid,
            }
            createUserMutation.mutate(signInNewUser)
          } else {
            registerUser(res)
          }
        })
      }
    )
    return () => {
      unSubscribe()
    }
  }, [])

  return (
    <>
      <BrowserRouter>
        <LayoutsWrapper>
          <Routes>
            {map(HOME_ROUTES, (route) => (
              <Route
                path={route.path}
                element={route.element}
                key={route.path}
              />
            ))}
          </Routes>
        </LayoutsWrapper>
        <Toast
          type={toast.type}
          onCLickCloseIcon={onClickCloseToast}
          isShow={toast.isShow}
        >
          {toast.message}
        </Toast>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
