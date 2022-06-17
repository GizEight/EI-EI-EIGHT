import { isNil } from 'lodash'
import { useState, ChangeEvent, useCallback } from 'react'

import { ERROR_CODES } from '../lib/error'
import { getImageUrl } from '../lib/firebase/storage'
import { getUniqueChar } from '../utils/text'
import { useToast } from './useToast'

export const useContentsImage = () => {
  const { showToast } = useToast()

  const [loading, setLoading] = useState(false)

  const getContentsImageUrl = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setLoading(true)
      const target = e.target.files
      try {
        if (isNil(target)) {
          showToast('error', ERROR_CODES.VALIDATE_IMAGE.errMsg)
          return ''
        }
        const randomChar = getUniqueChar()
        const fileName = `${randomChar}_${target[0].name}`
        const res = await getImageUrl({
          dirName: 'content',
          fileName,
          imageFile: target[0],
        })
        if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
          showToast('error', res.errMsg)
          return ''
        }
        return res.url
      } finally {
        setLoading(false)
      }
    },
    [showToast]
  )

  return {
    loading,
    getContentsImageUrl,
  }
}
