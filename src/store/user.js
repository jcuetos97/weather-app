import { createSlice } from '@reduxjs/toolkit';

const initialUserState = {
  userEmail: '',
  userName: '',
  userRole: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUserState,
  reducers: {
    setUserData(state, action) {
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
