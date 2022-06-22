import { useQuery } from 'react-query'

import { GetDetailUserResponse } from '../../@types/api.d'
import { fetchDetailUser } from '../lib/api'
import { CACHE_KEY_USER_DETAIL } from '../utils/const'

type Props = {
  userId: string
}

export const useQueryDetailUser = ({ userId }: Props) =>
  useQuery<GetDetailUserResponse>({
    queryKey: CACHE_KEY_USER_DETAIL,
    queryFn: () => fetchDetailUser({ id: userId }),
    staleTime: 0,
  })
