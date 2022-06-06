import { User as FirebaseUser } from 'firebase/auth'

import { ResponseArticle } from './article'
import { ErrorResponse } from './error'
import { ResponseUser } from './user'

interface GetMicroCmsRequest {
  offset: number
  limit: number
  filters: string
  fields: string
}
export interface GetMicroCmsResponse<T> {
  contents: T[]
  totalCount: number
  offset: number
  limit: number
}
export interface ExceptingGetMicroCmsResponse {
  id: string
}

/*
 * Googleログイン
 */
export interface AuthGoogleLoginResponse extends ErrorResponse {
  user: FirebaseUser
}

/*
 * 記事取得
 */
export interface GetArticlesRequest extends Partial<GetMicroCmsRequest> {}
export interface GetArticlesResponse
  extends GetMicroCmsResponse<ResponseArticle>,
    ErrorResponse {}

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

/*
 * ユーザー取得
 */
export interface GetUsersRequest extends Partial<GetMicroCmsRequest> {}
export interface GetUsersResponse
  extends GetMicroCmsResponse<ResponseUser>,
    ErrorResponse {}

/*
 * ユーザー作成
 */
export interface CreateUserRequest {
  name: string
  photoURL: string
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
