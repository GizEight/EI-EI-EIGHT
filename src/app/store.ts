import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'

import toastReducer from './slices/toastSlice'

export const store = configureStore({
  reducer: {
    toast: toastReducer,
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
