export type ToastType = 'success' | 'warning' | 'error' | 'info'

export type Forms = {
  title: string
  content: string
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
