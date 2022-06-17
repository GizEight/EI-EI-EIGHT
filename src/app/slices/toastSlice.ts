import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ToastType } from '../../@types/view'
import { RootState } from '../store'

export interface Toast {
  isShow: boolean
  type: ToastType
  message: string
}

export interface LoadingToast {
  isShow: boolean
}

interface InitialState {
  toast: Toast
  loadingToast: LoadingToast
}

const initialState: InitialState = {
  toast: {
    isShow: false,
    type: 'success',
    message: '',
  },
  loadingToast: {
    isShow: false,
  },
}

export const toastSlice = createSlice({
  name: 'toast',
  initialState,
  reducers: {
    setToast: (state, action: PayloadAction<Toast>) => {
      state.toast = action.payload
    },
    resetToast: (state) => {
      state.toast = initialState.toast
    },
    closeToast: (state) => {
      state.toast.isShow = false
      state.loadingToast.isShow = false
    },
    setLoadingToastIsShow: (state, action: PayloadAction<boolean>) => {
      state.loadingToast.isShow = action.payload
    },
  },
})

export const { setToast, resetToast, closeToast, setLoadingToastIsShow } =
  toastSlice.actions

export const selectToast = (state: RootState) => state.toast

export default toastSlice.reducer
