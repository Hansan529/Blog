import { configureStore } from '@reduxjs/toolkit';
import ProjectReducer from './_reducer/ProejctSlice';
import InfoReducer from './_reducer/InfoSlice';
import FetchDataReducer from './_reducer/fetchSlice';

// reducer의 이름을 설정한 값을 참조하게 됨, state.login
export default configureStore({
  reducer: {
    project: ProjectReducer,
    info: InfoReducer,
    fetchData: FetchDataReducer,
  },
});
