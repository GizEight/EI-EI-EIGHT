export type ToastType = 'success' | 'warning' | 'error' | 'info'

export type Forms = {
  title: string
  content: string
}
export interface ListCard {
  id: string
  userId: string
  avatarUrl: string
  name: string
  imgUrl: string
  title: string
  createdAt: string
}
