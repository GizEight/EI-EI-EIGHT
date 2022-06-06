// TODO: fetch後のformリセット処理
import { isNil } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { useAppDispatch } from '../../app/hooks'
import { login, logout } from '../../app/slices/userSlice'
import { fetchUsers, updateUser, createUser } from '../lib/api'
import { CACHE_KEY_USER } from '../utils/const'

export const useMutateUsers = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  /*
   * cache & reduxに登録
   */
  const registerUser = (res: GetUsersResponse) => {
    queryClient.setQueryData<GetUsersResponse>(CACHE_KEY_USER, res)
    const { contents } = res
    dispatch(login(contents[0].userId))
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
        registerUser(res)
      })
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
          registerUser(res)
        })
      }
    },
  })

  return {
    registerUser,
    deleteUser,
    createUserMutation,
    updateUserMutation,
  }
}
