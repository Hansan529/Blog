import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inital: false,
  logged: false,
  socialLogin: false,
};

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    //* 페이지 렌더링 설정
    initial: (state, action) => {
      state.initial = action.payload;
    },
    // * 로그인 상태
    login: (state, action) => {
      state.logged = action.payload;
    },
    // * 소셜로그인 데이터
    socialLogin: (state, action) => {
      state.socialLogin = action.payload;
    },
  },
});

export const { initial, login, socialLogin } = infoSlice.actions;

export default infoSlice.reducer;
