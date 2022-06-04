import { signInWithPopup, UserCredential, signOut } from 'firebase/auth'
import { toNumber } from 'lodash'

import { AuthGoogleLoginResponse } from '../../../@types/api.d'
import { ErrorResponse } from '../../../@types/error.d'
import { auth, googleAuthProvider } from '../../../firebase'
import { ERROR_CODES } from '../error'
import { isFirebaseError } from './error'

/*
 * Googleログイン
 */
export const authGoogleLogin = async (): Promise<AuthGoogleLoginResponse> => {
  try {
    const userCredential: UserCredential = await signInWithPopup(
      auth,
      googleAuthProvider
    )
    return {
      user: userCredential.user,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/account-exists-with-different-credential'
    ) {
      return {
        user: {} as UserCredential['user'],
        errCode: toNumber(error.code),
        errMsg: error.message,
      }
    }
    return {
      user: {} as UserCredential['user'],
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}

/*
 * Google ログアウト
 */
export const logout = async (): Promise<ErrorResponse> => {
  try {
    await signOut(auth)
    return {
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (error) {
    return {
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}
