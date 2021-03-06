import { User as FirebaseUser } from 'firebase/auth'

import { ResponseArticle } from './article'
import { GetMicroCmsRequest } from './cms'
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
 * 記事一覧取得
 */
export interface GetArticlesRequest extends Partial<GetMicroCmsRequest> {}
export interface GetArticlesResponse extends ErrorResponse {
  contents: ResponseArticle[]
  totalCount: number
  offset: number
  limit: number
}

/*
 * 記事詳細取得
 */
export interface GetDetailArticleRequest {
  id: string
}
export interface GetDetailArticleResponse
  extends ResponseArticle,
    ErrorResponse {}

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
 * ユーザー一覧取得
 */
export interface GetUsersRequest extends Partial<GetMicroCmsRequest> {}
export interface GetUsersResponse extends ErrorResponse {
  contents: ResponseUser[]
  totalCount: number
  offset: number
  limit: number
}

/*
 * ユーザー詳細取得
 */
export interface GetDetailUserRequest {
  id: string
}
export interface GetDetailUserResponse extends ResponseUser, ErrorResponse {}

/*
 * ユーザー作成
 */
export interface CreateUserRequest {
  name: string
  photoURL: string
  description?: string
  twitterUrl?: string
  instagramUrl?: string
  userId: string
}
export interface CreateUserResponse extends ErrorResponse {
  id: string
}

/*
 * ユーザー更新
 */
export interface UpdateUserRequest {
  id: string
  name: string
  photoURL?: string
  description?: string
  twitterUrl?: string
  instagramUrl?: string
}
export interface UpdateUserResponse extends ErrorResponse {
  id: string
}
