import { AxiosResponse } from 'axios'
import { isEmpty } from 'lodash'

import { GetMicroCmsResponse } from '../../@types/cms'
import { ERROR_CODES } from './error'

export const errorHandler = <T>(res: AxiosResponse<GetMicroCmsResponse<T>>) => {
  if (isEmpty(res.data.contents)) {
    return {
      ...res.data,
      errCode: ERROR_CODES.EMPTY_CONTENTS.errCode,
      errMsg: ERROR_CODES.EMPTY_CONTENTS.errMsg,
    }
  }
  return undefined
}
