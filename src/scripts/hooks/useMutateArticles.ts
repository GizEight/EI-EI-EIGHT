// TODO: fetch後のformリセット処理
import { isNil, map } from 'lodash'
import { useQueryClient, useMutation } from 'react-query'

import { GetMicroCmsResponse } from '../../@types/api.d'
import { ResponseArticle } from '../../@types/article'
import { postArticle, updateArticle, fetchArticles } from '../lib/api'
import { CACHE_KEY_ARTICLE } from '../utils/const'

export const useMutateArticles = () => {
  const queryClient = useQueryClient()

  const createArticleMutation = useMutation(postArticle, {
    onSuccess: () => {
      const previousArticles =
        queryClient.getQueryData<GetMicroCmsResponse<ResponseArticle>>(
          CACHE_KEY_ARTICLE
        )
      if (!isNil(previousArticles)) {
        fetchArticles().then((res) => {
          queryClient.setQueryData<GetMicroCmsResponse<ResponseArticle>>(
            CACHE_KEY_ARTICLE,
            res
          )
        })
      }
    },
  })

  const updateArticleMutation = useMutation(updateArticle, {
    onSuccess: (data) => {
      const previousArticles =
        queryClient.getQueryData<GetMicroCmsResponse<ResponseArticle>>(
          CACHE_KEY_ARTICLE
        )
      if (!isNil(previousArticles)) {
        fetchArticles({ filters: `id[equals]${data.id}` }).then((res) => {
          queryClient.setQueryData<GetMicroCmsResponse<ResponseArticle>>(
            CACHE_KEY_ARTICLE,
            {
              ...previousArticles,
              contents: map(previousArticles.contents, (article) =>
                article.id === res.contents[0].id ? res.contents[0] : article
              ),
            }
          )
        })
      }
    },
  })

  return { createArticleMutation, updateArticleMutation }
}
