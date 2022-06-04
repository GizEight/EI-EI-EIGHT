import { CmsResponseDefault } from './cms.d'

export interface Article {
  imageUrl: string
  title: string
  userId: string
  content: string
  contentCount: number
}

export interface ResponseArticle extends CmsResponseDefault, Article {}
