import { onAuthStateChanged, User as FirebaseUser } from 'firebase/auth'
import { isNil, isEmpty } from 'lodash'
import { FC, useEffect } from 'react'

import { useAppDispatch } from './app/hooks'
import { login, logout } from './app/slices/userSlice'
import { AuthTest } from './components/test/AuthTest'
import { auth } from './firebase'
import { fetchUsers, createUser } from './scripts/lib/api'

const App: FC = () => {
  const dispatch = useAppDispatch()
  /*
  ? ログイン状況監視
  */
  useEffect(() => {
    const unSubscribe = () => {
      onAuthStateChanged(auth, (user: FirebaseUser | null) => {
        if (isNil(user)) {
          dispatch(logout())
          return
        }
        /*
        ? ユーザーが登録済か確認する
        */
        fetchUsers({
          filters: `userId[equals]${user.uid}`,
        }).then(async ({ contents }) => {
          if (isEmpty(contents)) {
            await createUser({
              name: user.displayName || user.uid,
              photoUrl: user.photoURL || '',
              description: '',
              twitterUrl: '',
              facebookUrl: '',
              userId: user.uid,
            })
            dispatch(
              login({
                name: user.displayName || user.uid,
                photoURL: user.photoURL || '',
                description: '',
                twitterUrl: '',
                facebookUrl: '',
                userId: user.uid,
              })
            )
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
          unSubscribe()
        })
      })
    }
    return () => unSubscribe()
  }, [])

  return (
    <div className="App">
      EI-EI-EIGHT
      <div style={{ marginTop: '30px' }} />
      <AuthTest />
    </div>
  )
}

export default App
