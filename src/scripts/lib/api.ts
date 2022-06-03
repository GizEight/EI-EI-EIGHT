import { isNil } from 'lodash'

import {
  MicroCmsResponse,
  GetArticlesResponse,
  GetArticlesRequest,
  GetUsersRequest,
  GetUsersResponse,
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
  }
}
