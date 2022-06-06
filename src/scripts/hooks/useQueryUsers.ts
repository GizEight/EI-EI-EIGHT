import { useQuery } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { fetchUsers } from '../lib/api'
import { USE_QUERY_STALE_TIME, CACHE_KEY_USER } from '../utils/const'

export const useQueryUsers = () =>
  useQuery<GetUsersResponse>({
    queryKey: CACHE_KEY_USER,
    queryFn: (context) => fetchUsers(context.pageParam),
    staleTime: USE_QUERY_STALE_TIME,
  })
