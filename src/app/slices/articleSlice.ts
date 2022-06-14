import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

export interface ArticleState {
  isEdit: boolean
}

interface InitialState {
  article: ArticleState
}

const initialState: InitialState = {
  article: {
    isEdit: false,
  },
}

export const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    toggleEdit: (state, action: PayloadAction<boolean>) => {
      state.article.isEdit = action.payload
    },
  },
})

export const { toggleEdit } = articleSlice.actions

export const selectArticle = (state: RootState) => state.article

export default articleSlice.reducer
