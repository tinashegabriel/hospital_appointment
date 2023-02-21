import React from "react"
import {useState} from 'react'
import { Link } from 'react-router-dom'
import { EventAvailable, Person, PostAdd, PersonAdd,HomeRounded, AssignmentOutlined, Event,Chat  } from '@material-ui/icons'
import { colorsClass } from './color'
import Topbar from "./Topbar";
import Card from "./Card";


const Admin = ({props }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar)
  }

  let [toggleForm, setToggleForm] = useState(false);
  
  return (
      <>
          <div className="flex h-screen bg-gray-200">
          <aside className="z-20 hidden md:block w-64 bg-white overflow-y-auto flex-shrink-0">
      <div className="py-4 text-gray-500">
        <Link to="/" className="ml-6 text-lg font-bold text-gray-800">
          Home
        </Link>
        <ul className="mt-6 text-gray-800">
          <li
            className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
            />
            <Link
              to="/"
              className="inline-flex items-center w-full text-sm font-semibold"
            >
              <HomeRounded />
              <span className="ml-4">Dashboard</span>
            </Link>
          </li>
          <li
            className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
          >
            <Link
              to="/"
              className="inline-flex items-center w-full text-sm font-semibold"
            >
              <AssignmentOutlined />
              <span className="ml-4">Medical Aid Forms</span>
            </Link>
          </li>
          <li
            className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
            />
            <Link
              to="/calendar"
              className="inline-flex items-center w-full text-sm font-semibold"
            >
              <Event />
              <span className="ml-4">Calendar</span>
            </Link>
          </li>
          <li
            className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
            />
            <Link
              to="/messages"
              className="inline-flex items-center w-full text-sm font-semibold"
            >
              <Chat />
              <span className="ml-4">Messages</span>
            </Link>
          </li>
          <li
            className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
            />
            <Link
              to="/appointments"
              className="inline-flex items-center w-full text-sm font-semibold"
            >
              <EventAvailable />
              <span className="ml-4">Appointments</span>
            </Link>
          </li>
          <li
            className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
          >
            <span
              className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
            />
            <Link
              to="/"
              className="inline-flex items-center w-full text-sm font-semibold"
            >
              <Person />
              <span className="ml-4">Doctors Available</span>
            </Link>
          </li>
          
          
        {/* </ul>
        <ul> */}
            <li
             className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
             >
               <span
                 className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
               />
               <Link
                 to="/"
                 className="inline-flex items-center w-full text-sm font-semibold"
               >
                 <Person />
                 <span className="ml-4">Patient List</span>
               </Link>
            </li>
            <li
             className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
             >
               <span
                 className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
               />
               <Link
                 to="/"
                 className="inline-flex items-center w-full text-sm font-semibold"
               >
                 <PersonAdd />
                 <span className="ml-4">Add Doctor</span>
               </Link>
            </li>
            <li
             className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
             >
               <span
                 className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
               />
               <Link
                 to="/"
                 className="inline-flex items-center w-full text-sm font-semibold"
               >
                 <PersonAdd />
                 <span className="ml-4">Add Patient</span>
               </Link>
            </li>
            <li
             className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
             >
               <span
                 className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
               />
               <Link
                 to=""
                 onClick={e => (<div>TEST</div>)}
                 className="inline-flex items-center w-full text-sm font-semibold"
               >
                 <PostAdd />
                 <span className="ml-4">Add Appointment</span>
               </Link>
            </li>
            </ul>
            </div>
            </aside>
            
            <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

            <main className="flex flex-col h-full overflow-y-auto">
        {/* {props.children} */}
          <div className="flex flex-wrap mt-8 mx-8">
           
        <Card
          title="Appointments"
          subtitle="0"
          icon={() => <EventAvailable style={{ color: '#fff', fontSize: 40 }} />}
          bgIcon="bg-red-400"
          />
        <Card
          title="Doctors Available"
          subtitle="0"
          icon={() => (
            <Person style={{ color: '#fff', fontSize: 40 }} />
          )}
          bgIcon="bg-orange-400"
        />
        <Card
          title="Calendar"
          subtitle=""
          icon={() => (
            <Event style={{ color: '#fff', fontSize: 40 }} />
          )}
          bgIcon="bg-teal-400"
        />
      </div>
            </main>
            </div>
            </div>
        </>
            
    )
}
export default Admin;