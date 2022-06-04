import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { isNil, isEmpty } from 'lodash'
import { FC, useEffect, useCallback } from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'

import { useAppDispatch, useAppSelector } from './app/hooks'
import { selectToast, closeToast, setToast } from './app/slices/toastSlice'
import { login, logout } from './app/slices/userSlice'
import { PrimaryButton } from './components/atoms/PrimaryButton'
import { Toast } from './components/atoms/Toast'
import { AuthTest } from './components/test/AuthTest'
import { auth } from './firebase'
import { fetchUsers, createUser } from './scripts/lib/api'
import {
  LOGIN_SUCCESS_MESSAGE,
  TOAST_DURATION_TIME,
} from './scripts/utils/const'

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
  const { toast } = useAppSelector(selectToast)

  const onClickIconClose = useCallback(() => dispatch(closeToast()), [])

  const resetToast = useCallback(() => {
    dispatch(
      setToast({
        type: 'success',
        message: toast.message,
        isShow: false,
      })
    )
  }, [dispatch, setToast])

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
        dispatch(
          setToast({
            type: 'success',
            message: LOGIN_SUCCESS_MESSAGE,
            isShow: true,
          })
        )
        setTimeout(() => resetToast, TOAST_DURATION_TIME)

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
      <div className="App">
        EI-EI-EIGHT
        <button
          onClick={() => {
            dispatch(logout())
            resetToast()
          }}
          type="button"
        >
          ログアウト
        </button>
        <AuthTest />
        <PrimaryButton onClick={() => console.log('button')}>
          ボタン
        </PrimaryButton>
        <Toast
          type={toast.type}
          iconClose={onClickIconClose}
          isShow={toast.isShow}
        >
          {toast.message}
        </Toast>
      </div>
    </QueryClientProvider>
  )
}

export default App
