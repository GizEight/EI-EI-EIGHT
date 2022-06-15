import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNil } from 'lodash'
import { useEffect, useState, ChangeEvent, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Forms } from '../../@types/view'
import { useAppDispatch } from '../../app/hooks'
import {
  toggleEdit,
  setEditContent,
  setEditTitle,
} from '../../app/slices/articleSlice'
import { getImageUrl } from '../../scripts/lib/firebase/storage'
import { getUniqueChar } from '../../scripts/utils/text'
import { Form } from '../molecules/Form'
import { IconButton } from '../molecules/IconButton'
import { ImageInput } from '../molecules/ImageInput'
import { PreviewMarkdown } from '../organisms/PreviewMarkdown'
import { SectionLayout } from '../templates/SectionLayout'

export const CreateArticle = () => {
  const dispatch = useAppDispatch()
  const { register, watch, setValue, getValues } = useForm<Forms>()

  const [showMarkDown, setShowMarkDown] = useState(false)
  const [articleImage, setArticleImage] = useState<File | null>(null)
  const [contentImage, setContentImage] = useState<File | null>(null)
  const onChangedArticleImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target.files
      !isNil(target) && setArticleImage(target[0])
      e.target.value = ''
    },
    [setArticleImage]
  )
  const onChangedContentImage = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target.files
      !isNil(target) && setContentImage(target[0])
      e.target.value = ''
    },
    [setContentImage]
  )

  useEffect(() => {
    let isMounted = true
    if (!isNil(contentImage)) {
      const imageInsertToContent = async () => {
        const randomChar = getUniqueChar()
        const fileName = `${randomChar}_${contentImage.name}`
        const url = await getImageUrl('article', fileName, contentImage)
        // TODO: 画像処理中のローディング
        setValue('content', `![Image](${getValues('content')}\n${url}\n)`)
      }
      imageInsertToContent()
      if (isMounted) {
        setContentImage(null)
      }
    }
    return () => {
      isMounted = false
    }
  }, [contentImage])

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
          <Form
            type="text"
            placeholder="Title..."
            register={register}
            name="title"
            required
          />
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
                onChange={onChangedArticleImage}
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
