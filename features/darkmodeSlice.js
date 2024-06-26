import { createSlice } from '@reduxjs/toolkit';

const darkmodeSlice = createSlice({
    name: 'darkmode',
    initialState: {darkmode: false},
    reducers: {
      setdarkmode: (state, action) => {
        state.darkmode = action.payload;
      },
    },
  });
  

export const { setdarkmode } = darkmodeSlice.actions;

export default darkmodeSlice.reducer;
