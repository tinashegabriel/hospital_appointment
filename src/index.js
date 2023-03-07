import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './components/signup/Signup';
import Layout from './components/dashboard/Layout';
import Admin from './components/dashboard/admin';
import Form from './components/dashboard/Form';
import AboutUs from './components/aboutus';
import Calendar from './components/dashboard/Calendar';
import Doctor from './components/dashboard/doctor';
import Chatbot from './components/chatbot/chatbot';
import DoctorAvailable from './components/dashboard/DocsAvailable';
import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
} from "react-router-dom";
import Appointments from './components/dashboard/Appointments';
import DoctorAppointment from './components/dashboard/doctorappointment';
import PatientMedicalForm from './components/dashboard/Patientmedicalform';

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
    ,
  {
    path: "form",
    element: <Form/>
    },
    {
      path: "aboutus",
      element: <AboutUs/>
    },
    {
      path: "calendar",
      element: <Calendar/>
    },
    // {
    //   path: "messages",
    //   element: <Messages/>
    // },
    {
      path: "doctor",
      element: <Doctor/>
    },
    {
      path: "chatbot",
      element: <Chatbot/>
    },
    {
      path: "docappointments",
      element: <DoctorAppointment/>
    },
    {
      path: "docavailable",
      element: <DoctorAvailable/>
    },
    {
      path: "patientmedicalform",
      element: <PatientMedicalForm/>
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


