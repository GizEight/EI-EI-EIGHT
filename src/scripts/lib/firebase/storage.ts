import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import { storage } from '../../../firebase'

/*

storageに保存 => 画像のurl取得

*/
export const getImageUrl = async (
  dirName: string,
  fileName: string,
  imageFile: File
) => {
  const path = `${dirName}/${fileName}`
  const storageRef = ref(storage, path)
  await uploadBytes(storageRef, imageFile)
  const url = await getDownloadURL(ref(storage, path))
  return url
}
