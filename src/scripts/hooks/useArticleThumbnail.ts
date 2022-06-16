import { isNil } from 'lodash'
import { useCallback, ChangeEvent, useState } from 'react'

import { useAppDispatch } from '../../app/hooks'
import { setThumbUrl } from '../../app/slices/articleSlice'
import { ERROR_CODES } from '../lib/error'
import { getImageUrl } from '../lib/firebase/storage'
import { getUniqueChar } from '../utils/text'
import { useToast } from './useToast'

export const useArticleThumbnail = () => {
  /*
   * Hooks
   */
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  /*
   * State
   */
  const [loading, setLoading] = useState(false)

  /*
   * Store set article image url
   */
  const onChangedArticleThumbUrl = useCallback(
    async (e: ChangeEvent<HTMLInputElement>) => {
      setLoading(true)
      try {
        const target = e.target.files
        if (isNil(target)) {
          showToast('error', ERROR_CODES.VALIDATE_IMAGE.errMsg)
          return
        }
        const randomChar = getUniqueChar()
        const fileName = `${randomChar}_${target[0].name}`
        const res = await getImageUrl({
          dirName: 'article',
          fileName,
          imageFile: target[0],
        })
        if (res.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
          showToast('error', res.errMsg)
          return
        }
        dispatch(setThumbUrl(res.url))
      } finally {
        setLoading(false)
      }
    },
    []
  )
  return { loading, onChangedArticleThumbUrl }
}
