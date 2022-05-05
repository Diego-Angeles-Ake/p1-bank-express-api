import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: null,
  error: null,
};

const userSlice = createSlice({
  initialState,
  name: 'users',
  reducers: {
    login(state, action) {
      console.log(action.payload);
      state.isAuth = true;
      state.user = action.payload;
    },
    logout(state) {
      state.isAuth = false;
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;
