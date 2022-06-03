import { isEmpty } from 'lodash'
import { FC, useCallback } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { setToast } from '../../app/slices/toastSlice'
import { fetchUsers, createUser } from '../../scripts/lib/api'
import { ERROR_CODES } from '../../scripts/lib/error'
import { authGoogleLogin } from '../../scripts/lib/firebase/auth'

export const AuthTest: FC = () => {
  const dispatch = useAppDispatch()

  const onClickGoogleLogin = useCallback(async () => {
    const res = await authGoogleLogin()
    if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
      dispatch(
        setToast({
          isShow: true,
          type: 'error',
          message: `code: ${res.errCode} - ${res.errMsg}`,
        })
      )
      return
    }
    /*
    ? ユーザーが登録済か確認する
    */
    const { contents } = await fetchUsers({
      filters: `userId[equals]${res.user.uid}`,
    })
    if (isEmpty(contents)) {
      const { user } = res
      await createUser({
        name: user.displayName || user.uid,
        photoUrl: user.photoURL || '',
        description: '',
        twitterUrl: '',
        facebookUrl: '',
        userId: user.uid,
      })
    }
  }, [])

  return (
    <div>
      <button type="button" onClick={onClickGoogleLogin}>
        Googleログイン
      </button>
    </div>
  )
}
