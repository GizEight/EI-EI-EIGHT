import { signInWithPopup, UserCredential } from 'firebase/auth'
import { toNumber } from 'lodash'

import { AuthGoogleLoginResponse } from '../../../@types/api.d'
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
      userId: userCredential.user.uid,
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
        userId: '',
        errCode: toNumber(error.code),
        errMsg: error.message,
      }
    }
    return {
      userId: '',
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}
