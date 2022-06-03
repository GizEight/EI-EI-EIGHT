export const ERROR_CODES = {
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
  EMPTY_CONTENTS: {
    errCode: 2000,
    errMsg: 'コンテンツが存在しません。条件を変更して再度お試しください。',
  },

  /*
   * バリデーション: Email
   */
  VALIDATE_EMAIL: {
    errCode: 3000,
    errMsg: '正しい形式で入力してください。',
  },

  /*
   * 必須入力項目
   */
  REQUIRED_TEXT: {
    errCode: 4000,
    errMsg: '必須入力項目が未入力のままです。',
  },

  /*
   * catch
   */
  INTERNAL_SERVER_ERROR: {
    errCode: 5000,
    errMsg: 'サーバーエラーが起きました。開発者に問い合わせください。',
  },
}
