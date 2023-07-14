import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: null,
};

const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {
    projectData: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { projectData } = projectSlice.actions;

export default projectSlice.reducer;
