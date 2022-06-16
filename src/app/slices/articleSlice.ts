import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

export interface ArticleState {
  isEdit: boolean
  id: string
  thumbUrl: string
  form: {
    isValid: boolean
    title: string
    content: string
  }
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
      isValid: false,
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
    setIsValid: (state, action: PayloadAction<boolean>) => {
      state.article.form.isValid = action.payload
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
    resetForm: (state) => {
      state.article.form = {
        ...state.article.form,
        title: '',
        content: '',
      }
    },
  },
})

export const {
  toggleEdit,
  setIsValid,
  setEditTitle,
  setEditContent,
  setThumbUrl,
  resetForm,
} = articleSlice.actions

export const selectArticle = (state: RootState) => state.article

export default articleSlice.reducer
