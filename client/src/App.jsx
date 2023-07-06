// Package
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// Components
import Home from './components/screen/Home';
import Login from './components/screen/Login';
import Join from './components/screen/Join';
import Upload from './components/screen/Upload';
import DetailProject from './components/screen/DetailProject';
import ProjectEdit from './components/screen/ProjectEdit';

// Config
import LoginCallback from './components/config/LoginCallback';

// CSS
import './styles/global/css/App.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getAdminAvatar } from './_redux/_reducer/fetchSlice';
// import "./App.css";

const router = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/login/callback',
    element: <LoginCallback />,
  },
  {
    path: '/join',
    element: <Join />,
  },
  {
    path: '/upload',
    element: <Upload />,
  },
  {
    path: '/project/:id',
    element: <DetailProject />,
  },
]);

function App() {
  const devAvatar = useSelector((state) => state.fetchData.devAvatar);
  const isLoading = useSelector((state) => state.fetchData.isLoading);
  const error = useSelector((state) => state.fetchData.error);
  const dispatch = useDispatch();

  // * 관리자 이미지 State에 저장하기
  useEffect(() => {
    dispatch(getAdminAvatar());
  }, [dispatch]);

  // * 로딩중이 아니고, 에러가 없으면 이미지 저장
  useEffect(() => {
    if (!isLoading && !error) {
      console.log('data', devAvatar);
    }
  }, [devAvatar, isLoading, error]);

  return <RouterProvider router={router} />;
}

export default App;
