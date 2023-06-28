import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    set: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { set } = projectSlice.actions;

export default projectSlice.reducer;
