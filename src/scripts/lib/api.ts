import { isNil, omit } from 'lodash'

import {
  GetArticlesRequest,
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
  GetDetailArticleRequest,
  GetDetailArticleResponse,
  GetDetailUserRequest,
  GetDetailUserResponse,
} from '../../@types/api'
import { ExceptingGetMicroCmsResponse } from '../../@types/cms.d'
import apiInstance from './axios'
import { ERROR_CODES } from './error'
import { errorHandler } from './responseErrorHandler'

/*
? catch時に返す
 */
const CATCH_LIST_RESPONSE_GET = {
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
 * 記事取得
 */
export const fetchArticles = async (
  params?: GetArticlesRequest
): Promise<GetArticlesResponse> => {
  try {
    const res = await apiInstance.get<GetArticlesResponse>('articles', {
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
    return CATCH_LIST_RESPONSE_GET
  }
}

/*
 * 記事詳細取得
 */
export const fetchDetailArticle = async (
  params: GetDetailArticleRequest
): Promise<GetDetailArticleResponse> => {
  try {
    const res = await apiInstance.get<GetDetailArticleResponse>(
      `articles/${params.id}`
    )
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
    return {
      thumbUrl: '',
      title: '',
      userId: '',
      content: '',
      id: '',
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
      revisedAt: '',
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}

/*
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
    const res = await apiInstance.patch<ExceptingGetMicroCmsResponse>(
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

/*
 * ユーザー取得
 */
export const fetchUsers = async (
  params?: GetUsersRequest
): Promise<GetUsersResponse> => {
  try {
    const res = await apiInstance.get<GetUsersResponse>('users', {
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
    return CATCH_LIST_RESPONSE_GET
  }
}

/*
 * ユーザー詳細取得
 */
export const fetchDetailUser = async (
  params: GetDetailUserRequest
): Promise<GetDetailUserResponse> => {
  try {
    const res = await apiInstance.get<GetDetailUserResponse>(
      `users/${params.id}`
    )
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
    return {
      name: '',
      photoURL: '',
      description: '',
      twitterUrl: '',
      instagramUrl: '',
      userId: '',
      id: '',
      createdAt: '',
      updatedAt: '',
      publishedAt: '',
      revisedAt: '',
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}

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
    const res = await apiInstance.patch<ExceptingGetMicroCmsResponse>(
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
