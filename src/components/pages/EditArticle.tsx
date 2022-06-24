import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import clsx from 'clsx'
import { isNil, isEmpty, size } from 'lodash'
import { useEffect, useState, useCallback, ChangeEvent } from 'react'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { ArticleForms } from '../../@types/view'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import {
  selectArticle,
  toggleEdit,
  setIsValid,
  setEditArticle,
  setEditContent,
  setEditTitle,
  setThumbUrl,
} from '../../app/slices/articleSlice'
import { useGetImageUrl } from '../../scripts/hooks/useGetImageUrl'
import { useQueryArticles } from '../../scripts/hooks/useQueryArticles'
import { ERROR_CODES } from '../../scripts/lib/error'
import { ErrorMessage } from '../atoms/ErrorMessage'
import { Input } from '../atoms/Forms/Input'
import { Textarea } from '../atoms/Forms/Textarea'
import { Loading } from '../atoms/Loading'
import { Form } from '../molecules/Form'
import { IconButton } from '../molecules/IconButton'
import { ImageInput } from '../molecules/ImageInput'
import { PreviewMarkdown } from '../molecules/PreviewMarkdown'
import { SectionLayout } from '../template/SectionLayout'

export const EditArticle = () => {
  /* 
  ? Get ArticleData
   */
  const params = useParams<{ id: string }>()
  const {
    data: articleData,
    isLoading,
    isError,
  } = useQueryArticles({
    page: 0,
    filter: `id[equals]${params.id}`,
  })

  /*
   * Hooks
   */
  const dispatch = useAppDispatch()
  const { article } = useAppSelector(selectArticle)
  const {
    register,
    watch,
    setValue,
    getValues,
    setError,
    clearErrors,
    formState: { errors },
  } = useForm<ArticleForms>({
    criteriaMode: 'all',
  })
  const { onChangedImageUrl } = useGetImageUrl()

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
  const onChangedContentImage = (e: ChangeEvent<HTMLInputElement>) => {
    onChangedImageUrl(e, 'content', (url) => {
      if (isEmpty(url)) {
        return
      }
      setValue('content', `${getValues('content')}\n![Image](${url}\n)`)
    })
  }

  /*
   * Set Edit Article
   */
  useEffect(() => {
    let isMounted = true
    if (isMounted && !isNil(articleData) && !isEmpty(articleData.contents)) {
      dispatch(
        setEditArticle({
          id: articleData.contents[0].id,
          thumbUrl: articleData.contents[0].thumbUrl,
          title: articleData.contents[0].title,
          content: articleData.contents[0].content,
        })
      )
      setValue('title', articleData.contents[0].title)
      setValue('content', articleData.contents[0].content)
    }
    return () => {
      isMounted = false
    }
  }, [articleData])

  /*
   ? Headerの状態を変えたい
   */
  useEffect(() => {
    dispatch(toggleEdit(true))
    return () => {
      dispatch(toggleEdit(false))
    }
  }, [])

  /*
   * Store set form values
   */
  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (!isNil(name)) {
        switch (name) {
          case 'title':
            clearErrors('title')
            dispatch(setEditTitle(value.title || ''))
            break

          case 'content':
            clearErrors('content')
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
      {isLoading && <Loading />}
      {!isLoading && isError && (
        <ErrorMessage>{ERROR_CODES.INTERNAL_SERVER_ERROR.errMsg}</ErrorMessage>
      )}
      {!isNil(articleData) &&
        articleData.errCode !== ERROR_CODES.NORMAL_NOOP.errCode && (
          <ErrorMessage>{articleData.errMsg}</ErrorMessage>
        )}
      {!isLoading &&
        !isError &&
        !isNil(articleData) &&
        articleData.errCode === ERROR_CODES.NORMAL_NOOP.errCode && (
          <div className="p-section_forms">
            <Form errorMsg={errors.title?.message || ''}>
              <Input
                value={article.form.title}
                placeholder="Title..."
                {...register('title', { maxLength: 256, required: true })}
                onBlur={validateTitle}
                isBg={false}
              />
            </Form>
            <div className="p-section_forms_contents">
              {showMarkDown ? (
                <div className="c-form-form_textarea preview">
                  <PreviewMarkdown markdown={watch('content')} />
                </div>
              ) : (
                <Form errorMsg={errors.content?.message || ''}>
                  <Textarea
                    value={article.form.content}
                    placeholder="write in Markdown..."
                    {...register('content', { required: true })}
                    onBlur={validateContent}
                    isBg={false}
                  />
                </Form>
              )}
              <div className="p-section_forms-buttons">
                {!isEmpty(article.thumbUrl) && (
                  <img src={article.thumbUrl} alt={article.form.title} />
                )}
                <ImageInput
                  id="articleThumb"
                  icon={['far', 'images']}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    onChangedImageUrl(e, 'article', (url) =>
                      dispatch(setThumbUrl(url))
                    )
                  }
                />
                <div className="c-icon-btn-double">
                  <IconButton
                    className={clsx(!showMarkDown && 'is-bg')}
                    onClick={() => setShowMarkDown(false)}
                  >
                    <FontAwesomeIcon
                      icon={['fas', 'pen-to-square']}
                      size="lg"
                    />
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
        )}
    </SectionLayout>
  )
}
