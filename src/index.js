import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './components/signup/Signup';
import Layout from './components/dashboard/Layout';
import Admin from './components/dashboard/admin';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
} from "react-router-dom";
import Appointments from './components/dashboard/Appointments';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>
  },
  {
    path: "sign-up",
    element: <Signup/>
  },
  {
    path: "dashboard",
    element: <Layout/>
  },
  {
  path: "appointments",
  element: <Appointments/>
  },
  {
    path: "admin",
    element: <Admin/>
    }
])
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  //   <App />
  // </React.StrictMode>
  <RouterProvider router={router} />
);

// ReactDOM.render((
//   <BrowserRouter>
//     <App /> {/* The various pages will be displayed by the `Main` component. */}
//   </BrowserRouter>
//   ), document.getElementById('root')
// );


