import { isNil } from 'lodash'
import { useCallback, ChangeEvent, useState } from 'react'

import { ERROR_CODES } from '../lib/error'
import { getImageUrl } from '../lib/firebase/storage'
import { getUniqueChar } from '../utils/text'
import { processErrorHandlerIfNeeded } from '../utils/view'
import { useToast } from './useToast'

export const useGetImageUrl = () => {
  /*
   * Hooks
   */
  const { showToast } = useToast()

  /*
   * State
   */
  const [loading, setLoading] = useState(false)

  /*
   * Store set article image url
   */
  const onChangedImageUrl = useCallback(
    async (
      e: ChangeEvent<HTMLInputElement>,
      dirName: string,
      cb: (url: string) => void
    ) => {
      setLoading(true)
      try {
        const target = e.target.files
        if (isNil(target)) {
          // TODO: メッセージ変更必要ありそう
          showToast('error', ERROR_CODES.VALIDATE_IMAGE.errMsg)
          return
        }
        const randomChar = getUniqueChar()
        const fileName = `${randomChar}_${target[0].name}`
        const res = await getImageUrl({
          dirName,
          fileName,
          imageFile: target[0],
        })
        if (
          processErrorHandlerIfNeeded(res.errCode, () =>
            showToast('error', res.errMsg)
          )
        )
          return
        cb(res.url)
      } finally {
        setLoading(false)
      }
    },
    []
  )
  return { loading, onChangedImageUrl }
}
