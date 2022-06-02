import { ErrorCodes } from '../../@types/error'

export const ERROR_CODES: ErrorCodes = {
  /*
   * Response status 200番台
   */
  NORMAL_NOOP: {
    errCode: 1000,
    errMsg: '',
  },

  /*
   * Responseがカラの時
   */
  CONTENTS_EMPTY: {
    errCode: 2000,
    errMsg: 'コンテンツが存在しません。条件を変更して再度お試しください。',
  },

  /*
   * catch句で受け取る
   */
  INTERNAL_SERVER_ERROR: {
    errCode: 5000,
    errMsg: 'サーバーエラーが起きました。開発者に問い合わせください。',
  },
}
