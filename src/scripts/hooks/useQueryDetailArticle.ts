import { useQuery } from 'react-query'

import { GetDetailArticleResponse } from '../../@types/api.d'
import { fetchDetailArticle } from '../lib/api'
import {
  ARTICLE_DETAIL_STILE_TIME,
  CACHE_KEY_ARTICLE_DETAIL,
} from '../utils/const'

type Props = {
  articleId: string
}

export const useQueryDetailArticle = ({ articleId }: Props) =>
  useQuery<GetDetailArticleResponse>({
    queryKey: CACHE_KEY_ARTICLE_DETAIL,
    queryFn: () =>
      fetchDetailArticle({
        id: articleId,
      }),
    staleTime: ARTICLE_DETAIL_STILE_TIME,
  })
