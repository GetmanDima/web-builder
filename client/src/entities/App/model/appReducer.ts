import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface AppSlice {
  page: string,
  error: string,
  loading: boolean
}

const initialState: AppSlice = {
  page: '',
  error: '',
  loading: false
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPage(state, action: PayloadAction<string>) {
      state.page = action.payload;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
});

export const {
  setPage,
  setError,
  setLoading
} = appSlice.actions;
export default appSlice.reducer;
