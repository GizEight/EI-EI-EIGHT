import { isNil } from 'lodash'
import { useParams } from 'react-router-dom'

import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { useQueryUsers } from '../../scripts/hooks/useQueryUsers'
import { DetailContentWrapper } from '../molecules/ArticleDetail/DetailContent'
import { DetailHeader } from '../molecules/ArticleDetail/DetailHeader'
import { SectionLayout } from '../template/SectionLayout'

// eslint-disable-next-line arrow-body-style
export const ArticleDetail = () => {
  /*
   * Hooks
   */
  const params = useParams<{ id: string }>()
  const { data: article, isLoading: articleIsLoading } = useQueryArticles({
    filter: `id[equals]${params.id}`,
  })
  const { data: user, isLoading: userIsLoading } = useQueryUsers({
    filter: isNil(article)
      ? undefined
      : `userId[equals]${article.contents[0].userId}`,
  })

  return (
    <SectionLayout sectionName="article-detail">
      <DetailHeader thumbSrc="" thumbAlt="" title="タイトル" />
      <DetailContentWrapper body="body" side="side" />
    </SectionLayout>
  )
}
