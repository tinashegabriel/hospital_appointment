import React,{useState,useEffect } from 'react';
import Doctor from './doctor';
import DocSidebar from './DocSidebar';
import Topbar from "./Topbar";
import axios from 'axios';
import swal from 'sweetalert';


    const DoctorAppointment = ({props }) => {
        const [isOpenSidebar, setIsOpenSidebar] = useState(false)
        const [appointments, setAppointments] = React.useState('');
        const [patients, setPatients] = React.useState([]);
    
        const toggleSidebar = () => {
          setIsOpenSidebar(!isOpenSidebar)
        }

        useEffect(() => {
            const getUser = async () => {
                  try {
        
                    console.log(localStorage.getItem('accessToken'))         
        
                    const options = {
                        method: 'GET',
                        url: '/doctor/appointments',
                        headers: { 
                            'Content-Type': 'application/json',
                            'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                        }
                    };
        
        
                    let resp = await axios
                        .request(options)
        
                    let resp_data = resp.data
                    console.log(resp_data)
        
                    if (resp_data.code == 200) {
        
                      setAppointments(resp_data.payload.result.length)
                      setPatients(resp_data.payload.result)
                        // return res;
                    } else if (resp_data.code == 400) {
        
                        swal({
                            title: "Oops.., Sorry!!!",
                            text: "Failed to lget the data !!!",
                            icon: "error",
                            button: "Cancel",
                          });
                        // return res;
                    }
        
        
                    console.log("null")
        
                    return null
        
                  } catch (error) {
        
                      console.log("Exception")
                      console.log(error)
        
                      return null;
                  }
                };
                getUser();
    
          }, []);
    
        let [toggleForm, setToggleForm] = useState(false);

        const patientList = () => {

            console.log(patients)
             return (<tbody className="divide-y divide-gray-200">
             
                     {patients.map((patient) => (
                         <tr>
     
                            <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {patient.id}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {patient.first_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {patient.last_name}
                            </td>
                            <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {patient.email_address}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                    {patient.appointment_date}
                            </td>
                            <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                   {patient.symptoms}
                            </td>
                        </tr>
                         ))}
     
                     </tbody>
             
             );
           };
        
        return (
            <>
                <div className="flex h-screen bg-gray-200">
                <DocSidebar isOpen={isOpenSidebar} />
    
          <div className="flex flex-col flex-1 w-full">
            <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
        <main className="flex flex-col h-full overflow-y-auto">
        <div className="flex flex-wrap mt-8 mx-8">
            <div className="container">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-3 pl-2">
                        <div className="relative max-w-xs">
                            <label htmlFor="hs-table-search" className="sr-only">
                                Search 
                            </label>
                            <input
                                type="text"
                                name="hs-table-search"
                                id="hs-table-search"
                                className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Search Appointment..."
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="h-3.5 w-3.5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* <th scope="col" className="py-3 pl-4">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="checkbox"
                                                    className="sr-only"
                                                >
                                                    Checkbox
                                                </label>
                                            </div>
                                        </th> */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Appointment ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Last Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Date
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Symptoms
                                        </th>
                                    </tr>
                                </thead>
                                {patientList()}
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                {/* <Form /> */}
            </div>
        </main>
      </div>
       </div>
        </>
    )
}

export default DoctorAppointment;