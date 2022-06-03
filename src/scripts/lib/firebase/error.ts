import { FirebaseError } from '../../../@types/error'

export const isFirebaseError = (e: Error): e is FirebaseError =>
  'code' in e && 'message' in e
