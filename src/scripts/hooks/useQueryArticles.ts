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
    １ページ目 => 1 * 10 - 10 = 0件目（１件目~9件目, 総数はlimitの数によって決まる）
    ２ページ目 => 2 * 10 - 10 = 10件目
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
