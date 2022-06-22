import { AxiosResponse } from 'axios'
import { isEmpty } from 'lodash'

import { ERROR_CODES } from './error'

export const errorHandler = (res: AxiosResponse<any>) => {
  if (
    isEmpty(res.data) ||
    ('contents' in res.data && isEmpty(res.data.contents))
  ) {
    return {
      ...res.data,
      errCode: ERROR_CODES.EMPTY_CONTENTS.errCode,
      errMsg: ERROR_CODES.EMPTY_CONTENTS.errMsg,
    }
  }
  return undefined
}
