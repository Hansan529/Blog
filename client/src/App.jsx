import { createBrowserRouter } from 'react-router-dom';
import { RouterProvider } from 'react-router-dom';

import Home from './components/screen/Home';
import Login from './components/screen/Login';
import Join from './components/screen/Join';

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
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
