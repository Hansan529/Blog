import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './_reducer/loginSlice';
import homeReducer from './_reducer/HomeSlice';
import ProjectReducer from './_reducer/ProejctSlice';
import InfoReducer from './_reducer/InfoSlice';

// reducer의 이름을 설정한 값을 참조하게 됨, state.login
export default configureStore({
  reducer: {
    login: loginReducer,
    home: homeReducer,
    project: ProjectReducer,
    info: InfoReducer,
  },
});
