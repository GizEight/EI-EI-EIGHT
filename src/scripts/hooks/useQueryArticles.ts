import { useQuery } from 'react-query'

import { GetArticlesResponse } from '../../@types/api.d'
import { fetchArticles } from '../lib/api'
import { USE_QUERY_STALE_TIME } from '../utils/const'

export const useQueryArticles = () =>
  useQuery<GetArticlesResponse>({
    queryKey: 'articles',
    queryFn: (context) => fetchArticles(context.pageParam),
    staleTime: USE_QUERY_STALE_TIME,
  })
