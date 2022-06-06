import { useCallback, useState } from 'react'

import { ERROR_CODES } from '../lib/error'
import { googleLogout, authGoogleLogin } from '../lib/firebase/auth'
import { useToast } from './useToast'

export const useAuth = () => {
  const { showErrorToast, loginSuccessToast, resetToast } = useToast()

  const [loading, setLoading] = useState(false)

  /*
   * Googleログイン
   */
  const login = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authGoogleLogin()
      if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showErrorToast(res)
      }
      loginSuccessToast()
    } catch (e) {
      showErrorToast({
        errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
        errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
      })
    } finally {
      setLoading(false)
    }
  }, [showErrorToast])

  /*
   * Googleログアウト
   */
  const logout = useCallback(async () => {
    setLoading(true)
    try {
      const res = await googleLogout()
      if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showErrorToast(res)
      }
      resetToast()
    } catch (e) {
      showErrorToast({
        errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
        errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
      })
    } finally {
      setLoading(false)
    }
  }, [showErrorToast])

  return { loading, login, logout }
}
