import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedIn: !!Cookies.get('XSRF-TOKEN')
  },
  reducers: {
    login: (state) => {
      state.loggedIn = true;
    },
    logout: (state) => {
      state.loggedIn = false;
      Cookies.remove('XSRF-TOKEN');
    }
  }
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;