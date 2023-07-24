import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  project: null,
  info: null,
};

const dbSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    projectData: (state, action) => {
      state.project = action.payload;
    },
    infoData: (state, action) => {
      state.info = action.payload;
    },
  },
});

export const { projectData, infoData } = dbSlice.actions;

export default dbSlice.reducer;
