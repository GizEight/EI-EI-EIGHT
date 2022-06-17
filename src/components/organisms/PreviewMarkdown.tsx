import { isEmpty } from 'lodash'
import { FC, memo } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

type Props = {
  markdown: string
}

export const PreviewMarkdown: FC<Props> = memo((props: Props) => {
  const { markdown } = props
  return (
    <div className="c-form-form_textarea preview">
      {isEmpty(markdown) ? (
        <p className="c-form-form_textarea_message">コンテンツがありません。</p>
      ) : (
        <ReactMarkdown remarkPlugins={[remarkGfm]} unwrapDisallowed={false}>
          {markdown}
        </ReactMarkdown>
      )}
    </div>
  )
})
