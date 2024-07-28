import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userId: null,
  userEmail: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.userId = action.payload.userId;
      state.userEmail = action.payload.userEmail;
    },
    clearUser: (state) => {
      state.userId = null;
      state.userEmail = null;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;

export const selectUserId = (state) => state.user.userId;
export const selectUserEmail = (state) => state.user.userEmail;

export default userSlice.reducer;