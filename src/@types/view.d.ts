export type ToastType = 'success' | 'warning' | 'error' | 'info'

export type ArticleForms = {
  title: string
  content: string
}

export type UserForms = {
  username: string
  description: string
  twitterUrl: string
  instagramUrl: string
}

export type ArticleCard = {
  id: string
  userId: string
  thumbUrl: string
  avatarUrl: string
  username: string
  title: string
  createdAt: string
}
