import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

type EditContents = {
  title: string
  content: string
}

export interface ArticleState {
  isEdit: boolean
  id: string
  imageUrl: string
  form: EditContents
}

interface InitialState {
  article: ArticleState
}

const initialState: InitialState = {
  article: {
    isEdit: false,
    id: '',
    imageUrl: '',
    form: {
      title: '',
      content: '',
    },
  },
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    toggleEdit: (state, action: PayloadAction<boolean>) => {
      state.article.isEdit = action.payload
    },
    setEditTitle: (state, action: PayloadAction<string>) => {
      state.article.form.title = action.payload
    },
    setEditContent: (state, action: PayloadAction<string>) => {
      state.article.form.content = action.payload
    },
    setImageUrl: (state, action: PayloadAction<string>) => {
      state.article.imageUrl = action.payload
    },
  },
})

export const { toggleEdit, setEditTitle, setEditContent, setImageUrl } =
  articleSlice.actions

export const selectArticle = (state: RootState) => state.article

export default articleSlice.reducer
