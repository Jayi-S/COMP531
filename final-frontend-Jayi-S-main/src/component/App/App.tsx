import React from 'react';
import './App.css';

import Login from '../Login'
import Profile from '../Profile'
import Main from '../Main'
import Register from '../Register'

import {createBrowserHistory, BrowserHistory} from 'history'

import {
  createBrowserRouter,
  createHashRouter,
  RouterProvider,
  Router,
  Route,
  Routes,
  BrowserRouter,
  HashRouter
} from "react-router-dom";

export const history = createBrowserHistory()



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

export interface CustomRouterProps {
  basename?: string;
  children?: React.ReactNode;
  history: BrowserHistory;
}

const CustomRouter = ({
  basename,
  children,
  history,
}: CustomRouterProps) => {
  const [state, setState] = React.useState({
    action: history.action,
    location: history.location,
  });

  React.useLayoutEffect(() => history.listen(setState), [history]);

  return (
    <Router
      basename={basename}
      children={children}
      location={state.location}
      navigationType={state.action}
      navigator={history}
    />
  );
};


function App() {
  return (
    // <RouterProvider router={router} />
    // <Router router={router}/>
      <CustomRouter history={history}>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/main' element={<Main/>}></Route>
          <Route path='/profile' element={<Profile/>}></Route>
        </Routes>
      </CustomRouter>
  );
}

export default App;

