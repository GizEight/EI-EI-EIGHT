import { isNil, map } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../app/slices/userSlice'
import { fetchUsers, updateUser, createUser, fetchDetailUser } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
import { CACHE_KEY_USER } from '../utils/const'
import { processErrorHandlerIfNeeded } from '../utils/view'
import { useToast } from './useToast'

export const useMutateUsers = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  /*
    ? 初回ログイン時
   */
  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      fetchUsers({ filters: `id[equals]${data.id}` }).then((res) => {
        if (
          processErrorHandlerIfNeeded(data.errCode, () =>
            showToast('error', data.errMsg)
          )
        )
          return
        dispatch(
          login({
            userId: res.contents[0].userId,
            name: res.contents[0].name,
            photoUrl: res.contents[0].photoURL,
          })
        )
      })
    },
    onError: () => {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    },
  })

  /*
   ? ユーザー情報を更新後キャッシュを更新
   */
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      if (
        processErrorHandlerIfNeeded(data.errCode, () =>
          showToast('error', data.errMsg)
        )
      )
        return
      const previousUsers =
        queryClient.getQueryData<GetUsersResponse>(CACHE_KEY_USER)
      if (!isNil(previousUser)) {
        fetchUsers({ filters: `id[equals]${data.id}` }).then((res) => {
          if (data.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
            showToast('error', data.errMsg)
            return
          }
        })
      }
    },
    onError: () => {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    },
  })

  return {
    createUserMutation,
    updateUserMutation,
  }
}
