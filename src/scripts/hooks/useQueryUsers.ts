import { useQuery } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { fetchUsers } from '../lib/api'
import { CACHE_KEY_USER } from '../utils/const'

type Props = {
  filter?: string
}

export const useQueryUsers = ({ filter = '' }: Props) =>
  useQuery<GetUsersResponse>({
    queryKey: CACHE_KEY_USER,
    queryFn: () => fetchUsers({ filters: filter }),
    staleTime: 0,
  })
