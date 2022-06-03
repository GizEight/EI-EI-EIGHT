import { signInWithPopup, UserCredential } from 'firebase/auth'

import { auth, googleAuthProvider } from '../../../firebase'

/*
 * Googleログイン
 */
export const authGoogleLogin = async () => {
  try {
    const userCredential: UserCredential = await signInWithPopup(
      auth,
      googleAuthProvider
    )
    const user = userCredential.user
    return user.uid
  } catch (e) {
    return e
  }
}
