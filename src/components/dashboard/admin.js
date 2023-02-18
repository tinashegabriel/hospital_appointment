import React from "react";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import { Link } from 'react-router-dom'
import { EventAvailable, Person, PostAdd, PersonAdd  } from '@material-ui/icons'
import { colorsClass } from './color'
import Card from "./Card";


export default function Admin() {
    return(
        <>
        <Topbar/>
        <Sidebar/>
        <ul>
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
                 to="/"
                 className="inline-flex items-center w-full text-sm font-semibold"
               >
                 <PostAdd />
                 <span className="ml-4">Add Appointment</span>
               </Link>
            </li>
            </ul>
            <main>
            <Card
          title="Appointments"
          subtitle="0"
          icon={() => <EventAvailable style={{ color: '#fff', fontSize: 40 }} />}
          bgIcon="bg-red-400"
          button="Open"
          />
            </main>
        </>
            
    )
}