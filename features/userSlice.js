import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
    name: 'user',
    initialState: {user: []},
    reducers: {
      setUser: (state, action) => {
        return action.payload;
      },
      clearUser: (state) => {
        state.user = null;
      },
    },
  });
  

export const { setUser, clearUser } = userSlice.actions;

export default userSlice.reducer;
