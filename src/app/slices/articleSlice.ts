import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

type EditContents = {
  title: string
  content: string
}

export interface ArticleState {
  isEdit: boolean
  id: string
  thumbUrl: string
  form: EditContents
}

interface InitialState {
  article: ArticleState
}

const initialState: InitialState = {
  article: {
    isEdit: false,
    id: '',
    thumbUrl: '',
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
    setThumbUrl: (state, action: PayloadAction<string>) => {
      state.article.thumbUrl = action.payload
    },
  },
})

export const { toggleEdit, setEditTitle, setEditContent, setThumbUrl } =
  articleSlice.actions

export const selectArticle = (state: RootState) => state.article

export default articleSlice.reducer
