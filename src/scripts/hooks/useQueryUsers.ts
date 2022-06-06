import { isNil } from 'lodash'
import { useQuery } from 'react-query'

import { GetUsersResponse } from '../../@types/api.d'
import { fetchUsers } from '../lib/api'
import { USE_QUERY_STALE_TIME, CACHE_KEY_USER } from '../utils/const'

type Props = {
  userId: string
}

export const useQueryUsers = (props?: Props) =>
  useQuery<GetUsersResponse>({
    queryKey: CACHE_KEY_USER,
    queryFn: () =>
      fetchUsers(
        isNil(props) ? undefined : { filters: `userId[equals]${props.userId}` }
      ),
    staleTime: USE_QUERY_STALE_TIME,
  })
