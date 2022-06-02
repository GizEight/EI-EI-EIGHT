import axios from 'axios'

import { MICROCMS_BASE_URL, X_MICROCMS_API_KEY } from '../utils/const'

// eslint-disable-next-line no-console
console.log('baseURL ===> ', MICROCMS_BASE_URL)

const apiInstance = axios.create({
  headers: {
    'X-MICROCMS-API-KEY': X_MICROCMS_API_KEY,
    'Content-Type': 'application/json',
  },
  baseURL: MICROCMS_BASE_URL,
})

export default apiInstance
