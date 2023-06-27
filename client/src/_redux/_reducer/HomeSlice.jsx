import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    load: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { load } = homeSlice.actions;

export default homeSlice.reducer;
