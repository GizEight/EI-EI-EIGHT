import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { isNil, isEmpty } from 'lodash'
import { FC, useEffect } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useAppDispatch } from './app/hooks'
import { login, logout } from './app/slices/userSlice'
import { Toast } from './components/atoms/Toast'
import { LayoutsWrapper } from './components/templates/LayoutsWrapper'
import { AuthTest } from './components/test/AuthTest'
import { auth } from './firebase'
import { useToast } from './scripts/hooks/useToast'
import { fetchUsers, createUser } from './scripts/lib/api'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
})

const App: FC = () => {
  const dispatch = useAppDispatch()
  const { toast, resetToast, loginSuccessToast, onClickCloseToast } = useToast()

  /*
  ? ログイン状況監視
  */
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(
      auth,
      (user: FirebaseUser | null) => {
        if (isNil(user)) {
          dispatch(logout())
          resetToast()
          return
        }
        loginSuccessToast()
        /*
        ? ユーザーが登録済か確認する
        */
        fetchUsers({
          filters: `userId[equals]${user.uid}`,
        }).then(async ({ contents }) => {
          if (isEmpty(contents)) {
            const signInNewUser = {
              name: user.displayName || user.uid,
              photoURL: user.photoURL || '',
              description: '',
              twitterUrl: '',
              facebookUrl: '',
              userId: user.uid,
            }
            await createUser(signInNewUser)
            dispatch(login(signInNewUser))
          } else {
            dispatch(
              login({
                name: contents[0].name || contents[0].userId,
                photoURL: contents[0].photoURL || '',
                description: contents[0].description || '',
                twitterUrl: contents[0].twitterUrl || '',
                facebookUrl: contents[0].facebookUrl || '',
                userId: contents[0].userId,
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
    <QueryClientProvider client={queryClient}>
      <LayoutsWrapper>
        <div className="App">
          EI-EI-EIGHT
          <AuthTest />
        </div>
      </LayoutsWrapper>
      <Toast
        type={toast.type}
        iconClose={onClickCloseToast}
        isShow={toast.isShow}
      >
        {toast.message}
      </Toast>
    </QueryClientProvider>
  )
}

export default App
