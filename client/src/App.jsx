// Package
import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

// Components
import Home from './components/screen/Home';
import Login from './components/screen/Login';
import Join from './components/screen/Join';
import Upload from './components/screen/Upload';
import DetailProject from './components/screen/DetailProject';

// Config
import LoginCallback from './components/config/LoginCallback';

// CSS
import './styles/global/css/App.css';
import { useDispatch } from 'react-redux';
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
    path: '/projects/:id',
    element: <DetailProject />,
  },
]);

function App() {
  const dispatch = useDispatch();

  // * 관리자 이미지 State에 저장하기
  useEffect(() => {
    dispatch(getAdminAvatar());
  }, [dispatch]);

  return <RouterProvider router={router} />;
}

export default App;
