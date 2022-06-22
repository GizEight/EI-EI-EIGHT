import { isNil } from 'lodash'
import { useQuery } from 'react-query'

import { GetArticlesResponse } from '../../@types/api.d'
import { fetchArticles } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
import { CACHE_KEY_ARTICLE } from '../utils/const'
import { useToast } from './useToast'

type Props = {
  page?: number
  filter?: string
}

export const useQueryArticles = ({ page = 1, filter = undefined }: Props) => {
  const { showToast } = useToast()

  return useQuery<GetArticlesResponse>({
    queryKey: [CACHE_KEY_ARTICLE, page],
    /*
    ? offset
    - 何件目から取得するか(index)
     */
    queryFn: () =>
      fetchArticles({
        offset: isNil(page) ? 0 : page * 10,
        filters: filter,
      }),
    staleTime: 0,
    keepPreviousData: true,
    onSuccess(data) {
      if (data.errCode !== ERROR_CODES.NORMAL_NOOP.errCode) {
        showToast('error', data.errMsg)
      }
    },
  })
}
