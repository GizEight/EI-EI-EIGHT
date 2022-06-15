import { isNil } from 'lodash'
import { useState, ChangeEvent, useCallback } from 'react'

import { ERROR_CODES } from '../lib/error'
import { getImageUrl } from '../lib/firebase/storage'
import { getUniqueChar } from '../utils/text'
import { useToast } from './useToast'

export const useContentsImage = () => {
  const { showToast } = useToast()

  const [loading, setLoading] = useState(false)
  const [contentImage, setContentImage] = useState<File | null>(null)

  const onChangedContentImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target.files
      !isNil(target) && setContentImage(target[0])
      e.target.value = ''
    },
    [setContentImage]
  )

  const getContentsImageUrl = useCallback(async () => {
    setLoading(true)
    try {
      if (isNil(contentImage)) {
        showToast('error', ERROR_CODES.VALIDATE_IMAGE.errMsg)
        return ''
      }
      const randomChar = getUniqueChar()
      const fileName = `${randomChar}_${contentImage.name}`
      const res = await getImageUrl({
        dirName: 'content',
        fileName,
        imageFile: contentImage,
      })
      if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showToast('error', res.errMsg)
        return ''
      }
      return res.url
    } finally {
      setLoading(false)
    }
  }, [contentImage])

  return {
    loading,
    contentImage,
    setContentImage,
    onChangedContentImage,
    getContentsImageUrl,
  }
}
