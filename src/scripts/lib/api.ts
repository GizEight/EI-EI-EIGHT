import { isNil, omit } from 'lodash'

import {
  MicroCmsResponse,
  GetArticlesResponse,
  GetMicroCmsResponse,
  GetArticlesRequest,
  ExceptingGetMicroCmsResponse,
  CreateArticleRequest,
  UpdateArticleRequest,
  GetArticlesResponse,
  CreateArticleResponse,
  UpdateArticleResponse,
  GetUsersRequest,
  CreateUserRequest,
  UpdateUserRequest,
  GetUsersResponse,
  CreateUserResponse,
  UpdateUserResponse,
} from '../../@types/api'
import { Article } from '../../@types/article'
import { User } from '../../@types/user.d'
import apiInstance from './axios'
import { ERROR_CODES } from './error'
import { errorHandler } from './responseErrorHandler'

/*
? microCMS限定でcatch時に返す
 */
const CATCH_RESPONSE = {
  contents: [],
  totalCount: 0,
  offset: 0,
  limit: 0,
  errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
  errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
}
const CATCH_RESPONSE_EXCEPTING_GET = {
  id: '',
  errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
  errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
}

/*
 * GET 記事
 */
export const fetchArticles = async (
  params?: GetArticlesRequest
): Promise<GetArticlesResponse> => {
  try {
    const res = await apiInstance.get<MicroCmsResponse<Article>>('articles', {
      params,
    })
    const validated = errorHandler(res)
    if (!isNil(validated)) {
      return validated
    }
    return {
      ...res.data,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (e) {
    return CATCH_RESPONSE
  }
}

/*
GET ユーザー
*/
 * 記事投稿
 */
export const postArticle = async (
  params: CreateArticleRequest
): Promise<CreateArticleResponse> => {
  try {
    const res = await apiInstance.post<ExceptingGetMicroCmsResponse>(
      'articles',
      params
    )
    return {
      ...res.data,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (e) {
    return CATCH_RESPONSE_EXCEPTING_GET
  }
}

/*
 * 記事更新
 */
export const updateArticle = async (
  params: UpdateArticleRequest
): Promise<UpdateArticleResponse> => {
  const requestParams: Omit<UpdateArticleRequest, 'id'> = omit(params, 'id')
  try {
    const res = await apiInstance.post<ExceptingGetMicroCmsResponse>(
      `articles/${params.id}`,
      requestParams
    )
    return {
      ...res.data,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (e) {
    return CATCH_RESPONSE_EXCEPTING_GET
  }
}
export const fetchUsers = async (
  params?: GetUsersRequest
): Promise<GetUsersResponse> => {
  try {
    const res = await apiInstance.get<MicroCmsResponse<User>>('users', {
      params,
    })
    const validated = errorHandler(res)
    if (!isNil(validated)) {
      return validated
    }
    return {
      ...res.data,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (e) {
    return CATCH_RESPONSE
/*
 * ユーザー作成
 */
export const createUser = async (
  params: CreateUserRequest
): Promise<CreateUserResponse> => {
  try {
    const res = await apiInstance.post<ExceptingGetMicroCmsResponse>(
      'users',
      params
    )
    return {
      ...res.data,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (e) {
    return CATCH_RESPONSE_EXCEPTING_GET
  }
}

/*
 * 記事更新
 */
export const updateUser = async (
  params: UpdateUserRequest
): Promise<UpdateUserResponse> => {
  const requestParams: Omit<UpdateUserRequest, 'id'> = omit(params, 'id')
  try {
    const res = await apiInstance.post<ExceptingGetMicroCmsResponse>(
      `users/${params.id}`,
      requestParams
    )
    return {
      ...res.data,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (e) {
    return CATCH_RESPONSE_EXCEPTING_GET
  }
}
