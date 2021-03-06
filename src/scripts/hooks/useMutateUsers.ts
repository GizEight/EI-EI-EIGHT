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
      if (!isNil(previousUsers)) {
        fetchDetailUser({ id: data.id }).then((res) => {
          if (
            processErrorHandlerIfNeeded(data.errCode, () =>
              showToast('error', data.errMsg)
            )
          )
            return
          const updatedUser = {
            name: res.name,
            photoURL: res.photoURL,
            description: res.description,
            twitterUrl: res.twitterUrl,
            instagramUrl: res.instagramUrl,
            userId: res.userId,
            id: res.id,
            createdAt: res.createdAt,
            updatedAt: res.updatedAt,
            publishedAt: res.publishedAt,
            revisedAt: res.revisedAt,
          }
          queryClient.setQueryData(CACHE_KEY_USER, {
            ...previousUsers,
            contents: map(previousUsers.contents, (user) =>
              user.id === res.id ? updatedUser : user
            ),
          })
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
