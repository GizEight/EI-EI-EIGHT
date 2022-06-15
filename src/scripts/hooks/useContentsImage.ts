import { isNil } from 'lodash'
import { useState, ChangeEvent, useCallback } from 'react'

import { getImageUrl } from '../lib/firebase/storage'
import { getUniqueChar } from '../utils/text'

export const useContentsImage = () => {
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
    if (isNil(contentImage)) {
      return ''
    }
    const randomChar = getUniqueChar()
    const fileName = `${randomChar}_${contentImage.name}`
    const url = await getImageUrl('contents', fileName, contentImage)
    return url
  }, [contentImage])

  return {
    contentImage,
    setContentImage,
    onChangedContentImage,
    getContentsImageUrl,
  }
}
