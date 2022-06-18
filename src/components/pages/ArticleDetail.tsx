import { DetailHeader } from '../molecules/ArticleDetail/DetailHeader'
import { SectionLayout } from '../template/SectionLayout'

// eslint-disable-next-line arrow-body-style
export const ArticleDetail = () => {
  return (
    <SectionLayout sectionName="article-detail">
      <DetailHeader thumbSrc="" thumbAlt="" title="タイトル" />
      記事詳細
    </SectionLayout>
  )
}
