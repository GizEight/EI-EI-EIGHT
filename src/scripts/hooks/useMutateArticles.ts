// TODO: fetch後のformリセット処理
import { isNil, map } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetArticlesResponse } from '../../@types/api.d'
import { postArticle, updateArticle, fetchArticles } from '../lib/api'
import { CACHE_KEY_ARTICLE } from '../utils/const'

export const useMutateArticles = () => {
  const queryClient = useQueryClient()

  /*
   * 記事作成後、cacheに登録
   */
  const createArticleMutation = useMutation(postArticle, {
    onSuccess: () => {
      const previousArticles =
        queryClient.getQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE)
      if (!isNil(previousArticles)) {
        fetchArticles().then((res) => {
          queryClient.setQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE, res)
        })
      }
    },
  })

  /*
   * 記事編集後、cacheを編集
   */
  const updateArticleMutation = useMutation(updateArticle, {
    onSuccess: (data) => {
      const previousArticles =
        queryClient.getQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE)
      if (!isNil(previousArticles)) {
        fetchArticles({ filters: `id[equals]${data.id}` }).then((res) => {
          queryClient.setQueryData<GetArticlesResponse>(CACHE_KEY_ARTICLE, {
            ...previousArticles,
            contents: map(previousArticles.contents, (article) =>
              article.id === res.contents[0].id ? res.contents[0] : article
            ),
          })
        })
      }
    },
  })

  return { createArticleMutation, updateArticleMutation }
}
