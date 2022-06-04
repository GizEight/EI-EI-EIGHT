import { FC, useCallback } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { setToast } from '../../app/slices/toastSlice'
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
