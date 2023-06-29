import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: false,
};

const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {
    init: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { init } = homeSlice.actions;

export default homeSlice.reducer;
