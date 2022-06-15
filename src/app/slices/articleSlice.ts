import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

type Editable = 'title' | 'content'
type EditContents = {
  [K in Editable]: string
}

export interface ArticleState {
  isEdit: boolean
  id: string
  image: File | null
  form: EditContents
}

interface InitialState {
  article: ArticleState
}

const initialState: InitialState = {
  article: {
    isEdit: false,
    id: '',
    image: null,
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
    setImage: (state, action: PayloadAction<File>) => {
      state.article.image = action.payload
    },
  },
})

export const { toggleEdit, setEditTitle, setEditContent, setImage } =
  articleSlice.actions

export const selectArticle = (state: RootState) => state.article

export default articleSlice.reducer
