import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface InitialState {
  user: {
    userId: string
  }
}

const initialState: InitialState = {
  user: {
    userId: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<string>) => {
      state.user.userId = action.payload
    },
    logout: (state) => {
      state.user.userId = initialState.user.userId
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
