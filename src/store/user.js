import { createSlice } from '@reduxjs/toolkit';
import { Cookies } from 'react-cookie';

const cookies = new Cookies();
const initialState = {
  username: cookies.get('username') || '',
  loggedIn: !!cookies.get('username'),
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUsername: (state, action) => {
      state.username = action.payload;
      state.loggedIn = true;
      cookies.set('username', action.payload, { path: '/' });
    },
    logout: (state) => {
      state.username = '';
      state.loggedIn = false;
      cookies.remove('username', { path: '/' });
    },
  },
});

export const { setUsername, logout } = userSlice.actions;
export default userSlice.reducer;
