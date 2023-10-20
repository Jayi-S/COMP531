import React from 'react';
import './App.css';

import Login from '../Login'
import Profile from '../Profile'
import Main from '../Main'
import Register from '../Register'




import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>,
  },
    {
    path: "/register",
    element: <Register/>,
  },
  {
    path: "/main",
    element: <Main/>,
  },
  {
    path: "/profile",
    element: <Profile/>,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
