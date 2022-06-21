import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { RootState } from '../store'

interface User {
  userId: string
  photoUrl: string
  name: string
}

interface InitialState {
  user: User
}

const initialState: InitialState = {
  user: {
    userId: '',
    photoUrl: '',
    name: '',
  },
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.user = action.payload
    },
    logout: (state) => {
      state.user = {
        userId: '',
        photoUrl: '',
        name: '',
      }
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
