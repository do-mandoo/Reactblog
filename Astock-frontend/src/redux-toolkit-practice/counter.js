import { createSlice } from '@reduxjs/toolkit';

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    count: 0
  },
  reducers: {
    incre: state => {
      state.count += 1;
    },
    decre: state => {
      state.count -= 1;
    },
    increByAmount: (state, action) => {
      state.count += action.payload;
    }
  }
});

export const { incre, decre, increByAmount } = counterSlice.actions;

export default counterSlice.reducer;
