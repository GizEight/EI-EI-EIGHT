import { CmsResponseDefault } from './cms.d'

export interface User {
  name: string
  photoURL: string
  description?: string
  twitterUrl?: string
  facebookUrl?: string
  userId: string
}

export interface ResponseUser extends CmsResponseDefault, User {}
