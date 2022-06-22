import { AxiosResponse } from 'axios'
import { isEmpty } from 'lodash'

import { ERROR_CODES } from './error'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
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
