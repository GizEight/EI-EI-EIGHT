/*
 * env Firebase
 */
export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY
export const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
export const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID
export const FIREBASE_STORAGE_BUCKET = import.meta.env
  .VITE_FIREBASE_STORAGE_BUCKET
export const FIREBASE_MESSAGING_SENDER_ID = import.meta.env
  .VITE_FIREBASE_MESSAGING_SENDER_ID
export const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID
export const FIREBASE_MEASUREMENT_ID = import.meta.env
  .VITE_FIREBASE_MEASUREMENT_ID

/*
 * env microCMS
 */
export const MICROCMS_BASE_URL = import.meta.env.VITE_MICROCMS_BASE_URL
export const X_MICROCMS_API_KEY = import.meta.env.VITE_X_MICROCMS_API_KEY

/*
 * message, title, etc...
 */
export const LOGIN_SUCCESS_MESSAGE = 'Login Success!'
export const POST_SUCCESS_MESSAGE = 'Post Success!'
export const APP_TITLE = 'EI-EI-EIGHT'

/*
 * number
 */
export const PER_PAGE = 10
export const TOAST_DURATION_TIME = 8000
export const ARTICLE_DETAIL_STILE_TIME = 0

/*
 * useQuery cache key
 */
export const CACHE_KEY_ARTICLE = 'articles'
export const CACHE_KEY_ARTICLE_DETAIL = 'article_detail'
export const CACHE_KEY_USER = 'users'
export const CACHE_KEY_USER_DETAIL = 'user_detail'

/*
 * URL
 */
export const PUBLIC_URL = import.meta.env.VITE_PUBLIC_URL
export const URL_VALID =
  // eslint-disable-next-line no-useless-escape
  /^(https?|ftp)(:\/\/[-_.!~*\'()a-zA-Z0-9;\/?:\@&=+\$,%#]+)$/
