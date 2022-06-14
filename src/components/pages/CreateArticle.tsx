import { useEffect } from 'react'
import { useAppDispatch } from '../../app/hooks'
import { toggleEdit } from '../../app/slices/articleSlice'
export const CreateArticle = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(toggleEdit(true))

    return () => {
      dispatch(toggleEdit(false))
    }
  }, [])

