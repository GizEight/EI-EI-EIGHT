import { isNil } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { useAppDispatch } from '../../app/hooks'
import { login, logout } from '../../app/slices/userSlice'
import { fetchUsers, updateUser, createUser } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
import { CACHE_KEY_USER } from '../utils/const'
import { useToast } from './useToast'

export const useMutateUsers = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()
  const { showToast } = useToast()

  /*
   * cache & reduxに登録
   */
  const registerUser = (res: GetUsersResponse) => {
    const { contents } = res
    dispatch(
      login({
        userId: contents[0].userId,
        name: contents[0].name,
        photoUrl: contents[0].photoURL,
      })
    )
  }

  /*
   * cache & reduxから削除
   */
  const deleteUser = () => {
    dispatch(logout())
    queryClient.removeQueries(CACHE_KEY_USER)
  }

  /*
   * ユーザー作成後キャッシュに登録
   */
  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      // 初ユーザーログイン時のみ
      fetchUsers({ filters: `id[equals]${data.id}` }).then((res) => {
        if (data.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
          showToast('error', data.errMsg)
          return
        }
        registerUser(res)
      })
    },
    onError: () => {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    },
  })

  /*
   * ユーザー編集後キャッシュに登録
   */
  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      const previousUser =
        queryClient.getQueryData<GetUsersResponse>(CACHE_KEY_USER)
      if (!isNil(previousUser)) {
        fetchUsers({ filters: `id[equals]${data.id}` }).then((res) => {
          if (data.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
            showToast('error', data.errMsg)
            return
          }
          registerUser(res)
        })
      }
    },
    onError: () => {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    },
  })

  return {
    registerUser,
    deleteUser,
    createUserMutation,
    updateUserMutation,
  }
}
