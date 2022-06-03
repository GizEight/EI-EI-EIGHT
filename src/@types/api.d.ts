import { Article } from './article'
import { ErrorResponse } from './error'
import { User } from './user'

interface MicroCmsRequest {
  offset: number
  limit: number
  filters: string
  fields: string
}
export interface MicroCmsResponse<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}

/*
 * Auth
 */
export interface AuthGoogleLoginResponse extends ErrorResponse {
  userId: string
}

/*
 * Article
 */
export interface GetArticlesRequest extends Partial<MicroCmsRequest> {}
export interface GetArticlesResponse extends ErrorResponse {
  contents: Article[]
  totalCount: number
  offset: number
  limit: number
}

/*
 * 記事投稿
 */
export interface CreateArticleRequest {
  title: string
  content: string
  imageUrl?: string
  contentCount: number
  userId: string
}
export interface CreateArticleResponse extends ErrorResponse {
  id: string
}

/*
 * 記事更新
 */
export interface UpdateArticleRequest extends Partial<CreateArticleRequest> {
  id: string
}
export interface UpdateArticleResponse extends ErrorResponse {
  id: string
}
 */
export interface GetUsersRequest extends Partial<MicroCmsRequest> {}
export interface GetUsersResponse extends ErrorResponse {
  contents: User[]
  totalCount: number
  offset: number
  limit: number
}

/*
 * ユーザー作成
 */
export interface CreateUserRequest {
  name: string
  photoUrl: string
  description?: string
  twitterUrl?: string
  facebookUrl?: string
  userId: string
}
export interface CreateUserResponse extends ErrorResponse {
  id: string
}

/*
 * ユーザー更新
 */
export interface UpdateUserRequest extends Partial<CreateUserRequest> {
  id: string
}
export interface UpdateUserResponse extends ErrorResponse {
  id: string
}
