import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  UserCredential,
} from 'firebase/auth'

import { AuthRegisterUserRequest } from '../../../@types/api'
import { auth, googleAuthProvider } from '../../../firebase'

/*
 * 新規ユーザー作成
 */
export const authRegisterUser = async (params: AuthRegisterUserRequest) => {
  const { email, password } = params
  try {
    const userCredential: UserCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    return user.uid
  } catch (e) {
    return e
  }
}

/*
 * emailログイン
 */
export const authEmailLogin = async (params: AuthRegisterUserRequest) => {
  const { email, password } = params
  try {
    const userCredential: UserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    )
    const user = userCredential.user
    return user.uid
  } catch (e) {
    return e
  }
}

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
