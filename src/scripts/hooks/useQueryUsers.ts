import { useQuery } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { fetchUsers } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
import { CACHE_KEY_USER } from '../utils/const'
import { useToast } from './useToast'

type Props = {
  filter?: string
}

export const useQueryUsers = ({ filter = '' }: Props) => {
  const { showToast } = useToast()

  return useQuery<GetUsersResponse>({
    queryKey: CACHE_KEY_USER,
    queryFn: () => fetchUsers({ filters: filter }),
    staleTime: 0,
    keepPreviousData: true,
    onSuccess(data) {
      if (data.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showToast('error', data.errMsg)
      }
    },
  })
}
