export interface Article {
  imageUrl: string
  title: string
  userId: string
  content: string
}

export interface ResponseArticle {
  imageUrl: string
  title: string
  userId: string
  content: string
  id: string
  createdAt: string
  updatedAt: string
  publishedAt: string
  revisedAt: string
}
