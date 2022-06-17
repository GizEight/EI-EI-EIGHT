import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { isNil, isEmpty, map } from 'lodash'
import { FC, useEffect } from 'react'
import { TailSpin } from 'react-loader-spinner'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { Toast } from './components/molecules/Toast'
import { LayoutsWrapper } from './components/templates/LayoutsWrapper'
import { auth } from './firebase'
import { HOME_ROUTES } from './routes'
import { useMutateUsers } from './scripts/hooks/useMutateUsers'
import { useToast } from './scripts/hooks/useToast'
import { fetchUsers } from './scripts/lib/api'

const App: FC = () => {
  const { toast, loadingToast, onClickCloseToast } = useToast()
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
        {(toast.isShow || loadingToast.isShow) && (
          <Toast
            type={toast.type}
            onCLickCloseIcon={onClickCloseToast}
            isLoading={loadingToast.isShow}
          >
            {loadingToast.isShow && (
              <TailSpin
                height={30}
                width={30}
                color="#707070"
                wrapperStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
            {toast.message}
          </Toast>
        )}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
