import { createSlice } from "@reduxjs/toolkit";
import { signIn } from "./authThunk";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userName: "",
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null,
  },
  reducers: (create) => ({
    setTokens: create.reducer((state, action) => {
      const { accessToken, refreshToken } = action.payload;
      state.accessToken = accessToken;
      state.refreshToken = refreshToken;
    }),
    setAccessToken: create.reducer((state, action) => {
      state.accessToken = action.payload.accessToken;
    }),
    setRefreshToken: create.reducer((state, action) => {
      state.refreshToken = action.payload.refreshToken;
    }),
  }),
  extraReducers: (buider) => {
    buider
      .addCase(signIn.pending, (state) => {
        state.loading = true;
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.loading = false;
        state.accessToken = action.payload.token.accessToken;
        state.refreshToken = action.payload.token.refreshToken;
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

//export const { actions, reducer } = authSlice;
export const { actions, reducer } = authSlice;

export default authSlice.reducer;

/*
setAccessToken: create((state, action) => {
    const { accessToken } = action.payload;
    state.accessToken = accessToken;
}),
setRefreshToken: create.reducer((state, action) => {
    const { refreshToken } = action.payload;
    state.refreshToken = refreshToken;
}),
*/
