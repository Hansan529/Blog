import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import Home from './components/screen/Home';
import Login from './components/screen/Login';
import Join from './components/screen/Join';
import Upload from './components/screen/Upload';
import DetailProject from './components/screen/DetailProject';

import './styles/global/css/App.css';
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
  return <RouterProvider router={router} />;
}

export default App;
