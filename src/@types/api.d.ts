import { Article } from './article'
import { ErrorResponse } from './error'
import { User } from './user'

interface MicroCmsRequest {
  offset: number
  limit: number
  filters: string
  fields: string
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
 * User
 */
export interface GetUsersRequest extends Partial<MicroCmsRequest> {}
export interface GetUsersResponse extends ErrorResponse {
  contents: User[]
  totalCount: number
  offset: number
  limit: number
}
