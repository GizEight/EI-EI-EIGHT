import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { ToastType } from '../../@types/view'
import { RootState } from '../store'

export interface Toast {
  isShow: boolean
  type: ToastType
  message: string
}

interface InitialState {
  toast: Toast
}

const initialState: InitialState = {
  toast: {
    isShow: false,
    type: 'success',
    message: '',
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
    },
  },
})

export const { setToast, resetToast, closeToast } = toastSlice.actions

export const selectToast = (state: RootState) => state.toast

export default toastSlice.reducer
