import { createSlice, PayloadAction } from '@reduxjs/toolkit'

import { User } from '../../@types/user.d'
import { RootState } from '../store'

interface InitialState {
  user: User
}

const initialState: InitialState = {
  user: {
    name: '',
    photoUrl: '',
    description: '',
    twitterUrl: '',
    facebookUrl: '',
    firebaseId: '',
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
      state.user = initialState.user
    },
  },
})

export const { login, logout } = userSlice.actions

export const selectUser = (state: RootState) => state.user

export default userSlice.reducer
