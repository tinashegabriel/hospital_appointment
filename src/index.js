import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Signup from './components/signup/Signup';
import Layout from './components/dashboard/Layout';
import Admin from './components/dashboard/admin';
import Form from './components/dashboard/Form';
import Formadmin from './components/dashboard/adminsidebar/Formadmin';
import AboutUs from './components/aboutus';
import Calendar from './components/dashboard/Calendar';
import Doctor from './components/dashboard/doctor';
import Chatbot from './components/chatbot/chatbot';
import DoctorAvailable from './components/dashboard/doctoravailable';
import DocAvailable from './components/dashboard/DocsAvailable';
import DoctorAvailableadmin from './components/dashboard/adminsidebar/docAvailable';
import PatientList from './components/dashboard/adminsidebar/patientlist';
import Alogin from './components/login/Alogin';
import ScheduleApp from './components/dashboard/schedulepage';
import Dlogin from './components/login/Dlogin';

import {
  createBrowserRouter,
  RouterProvider,
  BrowserRouter,
  Route,
} from "react-router-dom";
import Appointments from './components/dashboard/Appointments';
import DoctorProfile from './components/dashboard/Viewdoc';
import AddAppointments from './components/dashboard/adminsidebar/addappointment';
import AddPatient from './components/dashboard/adminsidebar/addpatient';
import AddDoctor from './components/dashboard/adminsidebar/adddoctor';
import Appointment from './components/dashboard/adminsidebar/appointments';
import DoctorAppointment from './components/dashboard/doctorappointment';
import PatientMedicalForm from './components/dashboard/Patientmedicalform';
import DocSchedule from './components/schedules/docSchedule';
import UserSchedule from './components/schedules/userSchedule';



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
    path: "view",
    element: <DoctorProfile/>
    },
  {
    path: "addappointments",
    element: <AddAppointments/>
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
      path: "appointment",
      element: <Appointment/>
      },
    {
      path: "aboutus",
      element: <AboutUs/>
    },
    {
      path: "calendar",
      element: <Calendar/>
    },
    {
      path: "patientlist",
      element: <PatientList/>
    },
    {
      path: "addpatient",
      element: <AddPatient/>
    },
    {
      path: "adddoctor",
      element: <AddDoctor/>
    },
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
      path: "davailable",
      element: <DocAvailable/>
    },
    {
      path: "doctoravailable",
      element: <DoctorAvailableadmin/>
    },
    {
      path: "patientmedicalform",
      element: <PatientMedicalForm/>
    },
    {
      path: "alogin",
      element: <Alogin/>
    },
    {
      path: "schedule",
      element: <ScheduleApp/>
    },
    {
      path: "dlogin",
      element: <Dlogin/>
    },
    {
      path: "docschedule",
      element: <DocSchedule/>
    },
    {
      path: "userSchedule",
      element: <UserSchedule/>
    },

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


