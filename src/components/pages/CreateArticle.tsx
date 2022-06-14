import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

import { useAppDispatch } from '../../app/hooks'
import { toggleEdit } from '../../app/slices/articleSlice'
import { Form } from '../molecules/Form'
import { IconButton } from '../molecules/IconButton'
import { SectionLayout } from '../templates/SectionLayout'

type Forms = {
  title: string
  content: string
}

export const CreateArticle = () => {
  const dispatch = useAppDispatch()
  const { register } = useForm<Forms>()

  useEffect(() => {
    dispatch(toggleEdit(true))

    return () => {
      dispatch(toggleEdit(false))
    }
  }, [])

  return (
    <SectionLayout sectionName="create-article">
      <div className="p-section_content">
        <div className="p-section_content_forms">
          <Form type="text" placeholder="Title..." />
          <div className="p-section_content_forms_contents">
            <Form type="textarea" placeholder="write in Markdown..." />
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
