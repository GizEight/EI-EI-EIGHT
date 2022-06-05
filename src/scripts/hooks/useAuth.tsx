import { useCallback } from 'react'

import { ERROR_CODES } from '../lib/error'
import { googleLogout, authGoogleLogin } from '../lib/firebase/auth'
import { useToast } from './useToast'

export const useAuth = () => {
  const { showErrorToast } = useToast()

  const login = useCallback(async () => {
    const res = await authGoogleLogin()
    if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
      showErrorToast(res)
    }
  }, [showErrorToast])

  const logout = useCallback(async () => {
    const res = await googleLogout()
    if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
      showErrorToast(res)
    }
  }, [showErrorToast])

  return { login, logout }
}
