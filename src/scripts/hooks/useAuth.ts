import { useCallback, useState } from 'react'

import { ERROR_CODES } from '../lib/error'
import { googleLogout, authGoogleLogin } from '../lib/firebase/auth'
import { LOGIN_SUCCESS_MESSAGE } from '../utils/const'
import { useToast } from './useToast'

export const useAuth = () => {
  const { showToast } = useToast()

  const [loading, setLoading] = useState(false)

  /*
   * Googleログイン
   */
  const login = useCallback(async () => {
    setLoading(true)
    try {
      const res = await authGoogleLogin()
      if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showToast('error', res.errMsg)
        return
      }
      showToast('success', LOGIN_SUCCESS_MESSAGE)
    } catch (e) {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  /*
   * Googleログアウト
   */
  const logout = useCallback(async () => {
    setLoading(true)
    try {
      const res = await googleLogout()
      if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showToast('error', res.errMsg)
      }
    } catch (e) {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    } finally {
      setLoading(false)
    }
  }, [showToast])

  return { loading, login, logout }
}
