import { useQuery } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { fetchUsers } from '../lib/api'
import { USE_QUERY_STALE_TIME, CACHE_KEY_USER } from '../utils/const'

type Props = {
  filter?: string
}

export const useQueryUsers = ({ filter = '' }: Props) =>
  useQuery<GetUsersResponse>({
    queryKey: CACHE_KEY_USER,
    queryFn: () => fetchUsers({ filters: filter }),
    staleTime: USE_QUERY_STALE_TIME,
  })
