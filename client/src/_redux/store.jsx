import { configureStore } from '@reduxjs/toolkit';
import DBReducer from './_reducer/DBSlice';
import InfoReducer from './_reducer/InfoSlice';
import FetchDataReducer from './_reducer/fetchSlice';

// reducer의 이름을 설정한 값을 참조하게 됨, state.login
export default configureStore({
  reducer: {
    db: DBReducer,
    info: InfoReducer,
    fetchData: FetchDataReducer,
  },
});
