import { createSlice } from '@reduxjs/toolkit';

const deliverySlice = createSlice({
    name: 'delivery',
    initialState: {delivery: true},
    reducers: {
      setDelivery: (state, action) => {
        state.delivery = action.payload;
      },
    },
  });
  

export const { setDelivery } = deliverySlice.actions;

export default deliverySlice.reducer;
