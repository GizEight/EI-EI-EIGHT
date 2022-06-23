export interface User {
  name: string
  photoURL: string
  description?: string
  twitterUrl?: string
  instagramUrl?: string
  userId: string
}

export interface ResponseUser {
  name: string
  photoURL: string
  description?: string
  twitterUrl?: string
  instagramUrl?: string
  userId: string
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}
