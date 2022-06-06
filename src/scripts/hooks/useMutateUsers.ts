// TODO: fetch後のformリセット処理
import { isNil } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { useAppDispatch } from '../../app/hooks'
import { login } from '../../app/slices/userSlice'
import { fetchUsers, updateUser, createUser } from '../lib/api'
import { CACHE_KEY_USER } from '../utils/const'

export const useMutateUsers = () => {
  const queryClient = useQueryClient()
  const dispatch = useAppDispatch()

  const registerUserCache = (res: GetUsersResponse) => {
    queryClient.setQueryData<GetUsersResponse>(CACHE_KEY_USER, res)
    const { contents } = res
    dispatch(
      login({
        name: contents[0].name || contents[0].userId,
        photoURL: contents[0].photoURL || '',
        description: contents[0].description || '',
        twitterUrl: contents[0].twitterUrl || '',
        facebookUrl: contents[0].facebookUrl || '',
        userId: contents[0].userId,
      })
    )
  }

  const createUserMutation = useMutation(createUser, {
    onSuccess: (data) => {
      // 初ユーザーログイン時のみ
      fetchUsers({ filters: `id[equals]${data.id}` }).then((res) => {
        queryClient.setQueryData<GetUsersResponse>(CACHE_KEY_USER, res)
        dispatch(login(res.contents[0]))
      })
    },
  })

  const updateUserMutation = useMutation(updateUser, {
    onSuccess: (data) => {
      const previousUser =
        queryClient.getQueryData<GetUsersResponse>(CACHE_KEY_USER)
      if (!isNil(previousUser)) {
        fetchUsers({ filters: `id[equals]${data.id}` }).then((res) => {
          queryClient.setQueryData<GetUsersResponse>(CACHE_KEY_USER, res)
          dispatch(login(res.contents[0]))
        })
      }
    },
  })

  return { registerUserCache, createUserMutation, updateUserMutation }
}
