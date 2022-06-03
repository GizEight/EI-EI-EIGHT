import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth'

import { AuthRegisterUserRequest } from '../../../@types/api'
import { auth } from '../../../firebase'

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
