// import Redux from "redux";
// import { createStore } from "redux";
// import { useSelector, useDispatch } from "react-redux";
// import { createSlice } from "@reduxjs/toolkit";

// function reducer(state = initialState, action) {
//   let newState = { ...state };
//   console.log("action", action);
//   console.log("action.login", action.login);
//   if (action.type === "LOGIN") {
//     newState.login = action.login;
//   }
//   return newState;
// }

// const store = createStore(
//   rootReducer,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

// export default store;

import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './_reducer/loginSlice';
import homeReducer from './_reducer/HomeSlice';

// reducer의 이름을 설정한 값을 참조하게 됨, state.login
export default configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
  },
});
