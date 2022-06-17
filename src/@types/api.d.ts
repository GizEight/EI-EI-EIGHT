import { User as FirebaseUser } from 'firebase/auth'

import { ResponseArticle } from './article'
import { ErrorResponse } from './error'
import { ResponseUser } from './user'

/*
 * Googleログイン
 */
export interface AuthGoogleLoginResponse extends ErrorResponse {
  user: FirebaseUser
}

/*
 * Firebase ImageUrl 取得
 */
export interface GetImageUrlRequest {
  dirName: string
  fileName: string
  imageFile: File
}
export interface GetImageUrlResponse extends ErrorResponse {
  url: string
}

/*
 * 記事取得
 */
export interface GetArticlesRequest extends Partial<GetMicroCmsRequest> {}
export interface GetArticlesResponse extends ErrorResponse {
  contents: ResponseArticle[]
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
  thumbUrl?: string
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
export interface GetUsersResponse extends ErrorResponse {
  contents: ResponseUser[]
  totalCount: number
  offset: number
  limit: number
}

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
