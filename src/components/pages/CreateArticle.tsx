import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { isNil, isEmpty, size } from 'lodash'
import { useEffect, useState, useCallback } from 'react'
import { useForm } from 'react-hook-form'

import { Forms } from '../../@types/view'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectArticle,
  toggleEdit,
  setIsValid,
  setEditContent,
  setEditTitle,
} from '../../app/slices/articleSlice'
import { useArticleThumbnail } from '../../scripts/hooks/useArticleThumbnail'
import { useContentsImage } from '../../scripts/hooks/useContentsImage'
import { ERROR_CODES } from '../../scripts/lib/error'
import { Input } from '../atoms/Forms/Input'
import { Textarea } from '../atoms/Forms/Textarea'
import { Form } from '../molecules/Form'
import { IconButton } from '../molecules/IconButton'
import { ImageInput } from '../molecules/ImageInput'
import { PreviewMarkdown } from '../organisms/PreviewMarkdown'
import { SectionLayout } from '../templates/SectionLayout'

export const CreateArticle = () => {
  /*
   * Hooks
   */
  const dispatch = useAppDispatch()
  const {
    article: { form },
  } = useAppSelector(selectArticle)
  const {
    register,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<Forms>({
    criteriaMode: 'all',
  })
  const {
    loading,
    contentImage,
    setContentImage,
    onChangedContentImage,
    getContentsImageUrl,
  } = useContentsImage()
  const { onChangedArticleThumbUrl } = useArticleThumbnail()

  /*
   * State
   */
  const [showMarkDown, setShowMarkDown] = useState(false)

  /*
   * Validation Title
   */
  const validateTitle = useCallback(() => {
    if (size(getValues('title')) > 256) {
      setError('title', {
        type: 'maxLength',
        message: ERROR_CODES.VALIDATE_TEXT_256.errMsg,
      })
    } else if (isEmpty(getValues('title'))) {
      setError('title', {
        type: 'required',
        message: ERROR_CODES.REQUIRED_TEXT.errMsg,
      })
    } else {
      clearErrors('title')
    }
  }, [])

  /*
   * Validation Content
   */
  const validateContent = useCallback(() => {
    if (isEmpty(getValues('content'))) {
      setError('content', {
        type: 'required',
        message: ERROR_CODES.REQUIRED_TEXT.errMsg,
      })
    } else {
      clearErrors('content')
    }
  }, [])

  /*
   * GET contents image url
   */
  useEffect(() => {
    let isMounted = true
    if (!isNil(contentImage)) {
      getContentsImageUrl().then((url) => {
        if (isEmpty(url)) {
          return
        }
        setValue('content', `${getValues('content')}\n![Image](${url}\n)`)
      })
      if (isMounted) {
        setContentImage(null)
      }
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
        if (isEmpty(value.title) || isEmpty(value.content)) {
          dispatch(setIsValid(true))
        } else {
          dispatch(setIsValid(false))
        }
      }
    })

    return () => {
      dispatch(toggleEdit(false))
      subscription.unsubscribe()
    }
  }, [watch])

  /*
   * Init Page validate
   */
  useEffect(() => {
    if (
      !isEmpty(errors.title) ||
      !isEmpty(errors.content) ||
      isEmpty(getValues('title')) ||
      isEmpty(getValues('content'))
    ) {
      dispatch(setIsValid(true))
    } else {
      dispatch(setIsValid(false))
    }
  }, [])

  return (
    <SectionLayout sectionName="create-article">
      <div className="p-section_content">
        <div className="p-section_content_forms">
          <Form errorMsg={errors.title?.message || ''}>
            <Input
              value={form.title}
              placeholder="Title..."
              {...register('title', { maxLength: 256, required: true })}
              onBlur={validateTitle}
            />
          </Form>
          <div className="p-section_content_forms_contents">
            {showMarkDown ? (
              <PreviewMarkdown markdown={watch('content')} />
            ) : (
              <Form errorMsg={errors.content?.message || ''}>
                <Textarea
                  value={form.content}
                  placeholder="write in Markdown..."
                  {...register('content', { required: true })}
                  onBlur={validateContent}
                />
              </Form>
            )}
            <div className="p-section_content_forms-buttons">
              <ImageInput
                id="articleThumb"
                icon={['far', 'images']}
                onChange={onChangedArticleThumbUrl}
              />
              <div className="c-icon-btn-double">
                <IconButton
                  className={clsx(!showMarkDown && 'is-bg')}
                  onClick={() => setShowMarkDown(false)}
                >
                  <FontAwesomeIcon icon={['fas', 'pen-to-square']} size="lg" />
                </IconButton>
                <IconButton
                  className={clsx(showMarkDown && 'is-bg')}
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
