import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface EditContents {
  title: string
  content: string
  imageUrl?: string
}
export interface ArticleState {
  isEdit: boolean
  id: string
  title: string
  content: string
  imageUrl?: string
}

interface InitialState {
  article: ArticleState
}

const initialState: InitialState = {
  article: {
    isEdit: false,
    id: '',
    title: '',
    content: '',
    imageUrl: '',
  },
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    toggleEdit: (state, action: PayloadAction<boolean>) => {
      state.article.isEdit = action.payload
    },
    setEditContents: (state, action: PayloadAction<EditContents>) => {
      const { title, content, imageUrl } = action.payload
      state.article = {
        ...state.article,
        title,
        content,
        imageUrl,
      }
    },
  },
})

export const { toggleEdit } = articleSlice.actions

export const selectArticle = (state: RootState) => state.article

export default articleSlice.reducer
