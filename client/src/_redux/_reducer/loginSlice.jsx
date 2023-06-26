import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: true,
};

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    check: (state, action) => {
      // dispatch에서 받은 값을 payload에서 붙여넣는다.
      state.value = action.payload;
    },
  },
});

// reducers 안에 있는 함수를 내보낸다. (action을 자동으로 만듬)
// export const loginActions = loginSlice.actions;
export const { check } = loginSlice.actions;

// 여러가지의 함수를 하나로 합쳤다. (check, @@, @@, @@)
export default loginSlice.reducer;
