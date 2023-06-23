import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  token: string,
  isAuth: boolean,
}

const initialState: UserState = {
  token: '',
  isAuth: false,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    updateAuth: (state, action: PayloadAction<{token: string, isAuth: boolean}>) => {
      state.token = action.payload.token;
      state.isAuth = action.payload.isAuth;
    },
  }
})

export const { updateAuth } = userSlice.actions
export default userSlice.reducer