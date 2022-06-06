import { useQuery } from 'react-query'

import { GetArticlesResponse } from '../../@types/api.d'
import { fetchArticles } from '../lib/api'
import { USE_QUERY_STALE_TIME, CACHE_KEY_ARTICLE } from '../utils/const'

export const useQueryArticles = () =>
  useQuery<GetArticlesResponse>({
    queryKey: CACHE_KEY_ARTICLE,
    queryFn: (context) => fetchArticles(context.pageParam),
    staleTime: USE_QUERY_STALE_TIME,
  })
