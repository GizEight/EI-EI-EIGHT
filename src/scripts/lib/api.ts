import { isNil } from 'lodash'

import {
  MicroCmsResponse,
  GetArticlesResponse,
  GetArticlesRequest,
} from '../../@types/api'
import { Article } from '../../@types/article'
import apiInstance from './axios'
import { ERROR_CODES } from './error'
import { errorHandler } from './responseErrorHandler'

/*
 * GET 記事取得
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
    return {
      contents: [],
      totalCount: 0,
      offset: 0,
      limit: 0,
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}
