import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const infoSlice = createSlice({
  name: 'join',
  initialState,
  reducers: {
    info: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { info } = infoSlice.actions;

export default infoSlice.reducer;
