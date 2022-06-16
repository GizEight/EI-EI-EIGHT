import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNil, isEmpty } from 'lodash'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import { Forms } from '../../@types/view'
import { useAppDispatch } from '../../app/hooks'
import {
  toggleEdit,
  setEditContent,
  setEditTitle,
} from '../../app/slices/articleSlice'
import { useArticleImage } from '../../scripts/hooks/useArticleImage'
import { useContentsImage } from '../../scripts/hooks/useContentsImage'
import { Form } from '../molecules/Form'
import { IconButton } from '../molecules/IconButton'
import { ImageInput } from '../molecules/ImageInput'
import { PreviewMarkdown } from '../organisms/PreviewMarkdown'
import { SectionLayout } from '../templates/SectionLayout'
import { Input } from '../atoms/Forms/Textarea'

export const CreateArticle = () => {
  /*
   * Hooks
   */
  const dispatch = useAppDispatch()
  const { register, watch, setValue, getValues } = useForm<Forms>()
  const {
    contentImage,
    setContentImage,
    onChangedContentImage,
    getContentsImageUrl,
  } = useContentsImage()
  const { onChangedArticleImageUrl } = useArticleImage()

  /*
   * State
   */
  const [showMarkDown, setShowMarkDown] = useState(false)

  /*
   * GET contents image url
   */
  useEffect(() => {
    let isMounted = true
    getContentsImageUrl().then((url) => {
      if (isEmpty(url)) {
        return
      }
      setValue('content', `${getValues('content')}\n![Image](${url}\n)`)
    })
    if (isMounted) {
      setContentImage(null)
    }
    return () => {
      isMounted = false
    }
  }, [contentImage])

  /*
   * Store set form values
   */
  useEffect(() => {
    dispatch(toggleEdit(true))
    const subscription = watch((value, { name }) => {
      if (!isNil(name)) {
        switch (name) {
          case 'title':
            dispatch(setEditTitle(value.title || ''))
            break

          case 'content':
            dispatch(setEditContent(value.content || ''))
            break
          default:
            break
        }
      }
    })

    return () => {
      dispatch(toggleEdit(false))
      subscription.unsubscribe()
    }
  }, [watch])

  return (
    <SectionLayout sectionName="create-article">
      <div className="p-section_content">
        <div className="p-section_content_forms">
          <Form>
            <Input />
          </Form>
          <div className="p-section_content_forms_contents">
            {showMarkDown ? (
              <PreviewMarkdown markdown={watch('content')} />
            ) : (
              <Form
                type="textarea"
                placeholder="write in Markdown..."
                register={register}
                name="content"
                required
              />
            )}
            <div className="p-section_content_forms-buttons">
              <ImageInput
                id="articleImage"
                icon={['far', 'images']}
                onChange={onChangedArticleImageUrl}
              />
              <div className="c-icon-btn-double">
                <IconButton
                  className={!showMarkDown ? 'is-bg' : ''}
                  onClick={() => setShowMarkDown(false)}
                >
                  <FontAwesomeIcon icon={['fas', 'pen-to-square']} size="lg" />
                </IconButton>
                <IconButton
                  className={showMarkDown ? 'is-bg' : ''}
                  onClick={() => setShowMarkDown(true)}
                >
                  <FontAwesomeIcon icon={['fas', 'caret-right']} size="lg" />
                </IconButton>
              </div>
              <ImageInput
                id="contentImage"
                icon={['fas', 'image']}
                onChange={onChangedContentImage}
              />
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
