import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userEmail: null,
  userName:null
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
      state.userName = action.payload.userName; 
    },
    clearUser: (state) => {
      state.userId = null;
      state.userEmail = null;
      state.userName = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;
export const selectUserEmail = (state) => state.user.userEmail;
export const selectUserName = (state) => state.user.userName;

export default userSlice.reducer;