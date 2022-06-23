import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { isNil, isEmpty, map } from 'lodash'
import { FC, useEffect } from 'react'
import { Oval } from 'react-loader-spinner'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import { useAppDispatch } from './app/hooks'
import { login, logout } from './app/slices/userSlice'
import { Toast } from './components/molecules/Toast'
import { LayoutsWrapper } from './components/template/LayoutsWrapper'
import { auth } from './firebase'
import { HOME_ROUTES } from './routes'
import { useMutateUsers } from './scripts/hooks/useMutateUsers'
import { useToast } from './scripts/hooks/useToast'
import { fetchUsers } from './scripts/lib/api'

const App: FC = () => {
  const { toast, loadingToast, handleCloseToast } = useToast()
  const { createUserMutation } = useMutateUsers()
  const dispatch = useAppDispatch()

  /*
   * ログイン状況監視
   */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (isNil(user)) {
          dispatch(logout())
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
              instagramUrl: '',
              userId: user.uid,
            }
            /*
             * 新規ログイン
             */
            createUserMutation.mutate(signInNewUser)
          } else {
            /*
             * 登録済み
             */
            dispatch(
              login({
                userId: res.contents[0].userId,
                name: res.contents[0].name,
                photoUrl: res.contents[0].photoURL,
              })
            )
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
            onCLickCloseIcon={handleCloseToast}
            isLoading={loadingToast.isShow}
          >
            {toast.message}
            {loadingToast.isShow && (
              <Oval
                height={30}
                width={30}
                ariaLabel="loading"
                color="#cce0f3"
                secondaryColor="#fff"
                wrapperStyle={{
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              />
            )}
          </Toast>
        )}
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={false} />
    </>
  )
}

export default App
