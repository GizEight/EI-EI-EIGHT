import { CmsResponseDefault } from './cms.d'

export interface User {
  name: string
  photoUrl: string
  description?: string
  twitterUrl?: string
  facebookUrl?: string
  firebaseId: string
}

export interface ResponseUser extends CmsResponseDefault, User {}
