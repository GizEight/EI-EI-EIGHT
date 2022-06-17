import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { toNumber } from 'lodash'

import { GetImageUrlRequest, GetImageUrlResponse } from '../../../@types/api'
import { storage } from '../../../firebase'
import { ERROR_CODES } from '../error'
import { isFirebaseError } from './error'

/*

storageに保存 => 画像のurl取得

*/
export const getImageUrl = async (
  params: GetImageUrlRequest
): Promise<GetImageUrlResponse> => {
  const { dirName, fileName, imageFile } = params
  try {
    const path = `${dirName}/${fileName}`
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, imageFile)
    const url = await getDownloadURL(ref(storage, path))
    return {
      url,
      errCode: ERROR_CODES.NORMAL_NOOP.errCode,
      errMsg: ERROR_CODES.NORMAL_NOOP.errMsg,
    }
  } catch (error) {
    if (
      error instanceof Error &&
      isFirebaseError(error) &&
      error.code === 'auth/account-exists-with-different-credential'
    ) {
      return {
        url: '',
        errCode: toNumber(error.code),
        errMsg: error.message,
      }
    }
    return {
      url: '',
      errCode: ERROR_CODES.INTERNAL_SERVER_ERROR.errCode,
      errMsg: ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg,
    }
  }
}
