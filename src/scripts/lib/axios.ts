import axios from 'axios'

import { MICROCMS_BASE_URL, X_MICROCMS_API_KEY } from '../utils/const'
import { debugClientLog } from '../utils/logger'

debugClientLog('baseURL ===> ', MICROCMS_BASE_URL)

const apiInstance = axios.create({
  headers: {
    'X-MICROCMS-API-KEY': X_MICROCMS_API_KEY,
    'Content-Type': 'application/json',
  },
  baseURL: MICROCMS_BASE_URL,
})

export default apiInstance
