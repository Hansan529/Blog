import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  inital: false,
  logged: false,
  socialLogin: false,
  part: null,
  response: false,
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
    // * 특정 위치로 이동
    linkPart: (state, action) => {
      state.part = action.payload;
    },
    responsive: (state, action) => {
      state.response = action.payload;
    },
  },
});

export const { initial, login, socialLogin, linkPart, responsive } =
  infoSlice.actions;

export default infoSlice.reducer;
