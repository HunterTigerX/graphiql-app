import { createSlice } from '@reduxjs/toolkit';
import { deleteCookie, setCookie } from 'cookies-next';

const initialState = {
  userName: null,
  email: null,
  id: null,
  token: null,
  loading: false,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      setCookie('loginStatus', 'true', { maxAge: 86400 });
      state.userName = action.payload.userName;
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
      state.loading = false;
      state.isAuthenticated = true;
    },
    removeUser(state) {
      deleteCookie('loginStatus');
      state.userName = null;
      state.email = null;
      state.id = null;
      state.token = null;
      state.loading = false;
      state.isAuthenticated = false;
    },
    setLoadingUser: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setUser, removeUser, setLoadingUser } = userSlice.actions;

export default userSlice.reducer;
