import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import articleSlice from './slices/articleSlice'
import toastReducer from './slices/toastSlice'
import userReducer from './slices/userSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
    user: userReducer,
    article: articleSlice,
  },
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
