import { isNil, map } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetArticlesResponse } from '../../@types/api.d'
import { postArticle, updateArticle, fetchArticles } from '../lib/api'
import { ERROR_CODES } from '../lib/error'
import { CACHE_KEY_ARTICLE, POST_SUCCESS_MESSAGE } from '../utils/const'
import { processErrorHandlerIfNeeded } from '../utils/view'
import { useToast } from './useToast'

export const useMutateArticles = () => {
  const queryClient = useQueryClient()
  const { showToast } = useToast()

  /*
   * 記事作成後、cacheに登録
   */
  const createArticleMutation = useMutation(postArticle, {
    onSuccess: (data) => {
      if (
        processErrorHandlerIfNeeded(data.errCode, () =>
          showToast('error', data.errMsg)
        )
      )
        return
      showToast('success', POST_SUCCESS_MESSAGE)
      const previousArticles =
        queryClient.getQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE)
      if (!isNil(previousArticles)) {
        fetchArticles().then((res) => {
          queryClient.setQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE, res)
        })
      }
    },
    onError: () => {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    },
  })

  /*
   * 記事編集後、cacheを編集
   */
  const updateArticleMutation = useMutation(updateArticle, {
    onSuccess: (data) => {
      if (
        processErrorHandlerIfNeeded(data.errCode, () =>
          showToast('error', data.errMsg)
        )
      )
        return
      showToast('success', POST_SUCCESS_MESSAGE)
      const previousArticles =
        queryClient.getQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE)
      if (!isNil(previousArticles)) {
        fetchArticles({ filters: `id[equals]${data.id}` }).then((res) => {
          if (
            processErrorHandlerIfNeeded(res.errCode, () =>
              showToast('error', res.errMsg)
            )
          )
            return
          queryClient.setQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE, {
            ...previousArticles,
            contents: map(previousArticles.contents, (article) =>
              article.id === res.contents[0].id ? res.contents[0] : article
            ),
          })
        })
      }
    },
    onError: () => {
      showToast('error', ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg)
    },
  })

  return { createArticleMutation, updateArticleMutation }
}
