import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNil } from 'lodash'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { Forms } from '../../@types/view'
import { useAppDispatch } from '../../app/hooks'
import {
  toggleEdit,
  setEditContent,
  setEditTitle,
} from '../../app/slices/articleSlice'
import { Form } from '../molecules/Form'
import { IconButton } from '../molecules/IconButton'
import { SectionLayout } from '../templates/SectionLayout'

export const CreateArticle = () => {
  const dispatch = useAppDispatch()
  const { register, watch } = useForm<Forms>()

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
            <Form
              type="textarea"
              placeholder="write in Markdown..."
              register={register}
              name="content"
              required
            />
            <div className="p-section_content_forms-buttons">
              <div className="c-icon-btn-double">
                <IconButton onClick={() => console.log}>
                  <FontAwesomeIcon icon={['fas', 'pen-to-square']} size="lg" />
                </IconButton>
                <IconButton onClick={() => console.log}>
                  <FontAwesomeIcon icon={['fas', 'caret-right']} size="lg" />
                </IconButton>
              </div>
              <IconButton onClick={() => console.log}>
                <FontAwesomeIcon icon={['fas', 'image']} size="lg" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </SectionLayout>
  )
}
