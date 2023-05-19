import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { Select, Option, Radio } from "@material-tailwind/react"
import Login from "../../login/Login";



export default function Formadmin() {
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [emailAddress, setEmailAddress] = React.useState('');
    const [phone_number, setPhone] = React.useState('');
    const [date_of_birth, setDateOfBirth] = React.useState('');
    const [address, setAddress] = React.useState('');
    const [city, setCity] = React.useState('');
    const [applied_before, setApplied] = React.useState('');
    const [procedure, setProcedure] = React.useState('');
    const [appointment_date, setAppointmentDate] = React.useState('');
    const [appointment_time, setAppointmentTime] = React.useState('');
    const [symptoms, setSymptoms] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    const [token, setToken] = React.useState('');
    const [doctors,setDoctors] = useState([]);
    const [docID, setdocId] = React.useState('');

    useEffect(() => {
            const getDoctors = async () => {
              try {
    
                console.log(localStorage.getItem('accessToken'))         
    
                const options = {
                    method: 'GET',
                    url: '/doctors',
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
                    console.log(resp_data.payload.result)
                  setDoctors(resp_data.payload.result)
                  console.log(doctors)
                } else if (resp_data.code == 400) {
    
                    swal({
                        title: "Oops.., Sorry!!!",
                        text: "Failed to lget the data !!!",
                        icon: "error",
                        button: "Cancel",
                      });
                    // return res;
                }
    
                return null
    
              } catch (error) {
    
                  console.log("Exception")
                  console.log(error)
    
                  return null;
              }
            };
            getDoctors();
      }, []);
    
      const handleChange = (procedure) => {
        console.log('value:', procedure);
        setProcedure(procedure);
      };

      const handleDocChange = (docID) => {
        console.log('value:', docID);
        setdocId(docID);
      };

      const handleTimeChange = (appointment_time) => {
        console.log('value:', appointment_time);
        setAppointmentTime(appointment_time);
      };

    const onCreateBookingAdmin = async () => {

        try {
            setToken(localStorage.getItem('accessToken'))

            const data = {
                docIds: docID,
              FirstName: firstName,
              LastName: lastName,
              EmailAddress: emailAddress,
              Phonenumber: phone_number,
              D_O_B: date_of_birth,
              Address: address,
              City: city,
              Applied_before: applied_before,
              Procedure: procedure,
              Appointment_date: appointment_date,
              Appointment_time: appointment_time,
              Symptoms: symptoms
            };
            
            console.log(data)
    
            const options = {
                method: 'POST',
                url: '/admin/appointment',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                },
                data
            };
    
    
            let resp = await axios
                .request(options)
    
            let resp_data = resp.data
    
            if (resp_data.code == 200) {
    
                swal({
                    title: "Thank you!",
                    text: "We have sent an email for the scheduled appointment",
                    icon: "success",
                    button: "Proceed",
                  }).then((value) => {

                    window.location.href = "/";
                  })
               
                // return res;
            } else if (resp_data.code == 400) {
    
                swal({
                    title: "Oops.., Sorry!!!",
                    text: "Failed to loging, wrong username or password",
                    icon: "error",
                    button: "Retry",
                  });
                // return res;
            }

            return null
    
        } catch (error) {
    
            console.log("Exception")
            console.log(error)
    
            return null;
        }
    
    };
    
    const results = [];
    
    const doctorsDropDown = () => {
        // console.log(doctors)
        // doctors.forEach((doctor, index) => {
        //     results.push(
        //         <Option key={index} value={doctor.id} >{doctor.first_name}</Option>,
        //     );
        //   });
       
        return (<Select label="Please Select Doctor" value={docID} onChange={handleDocChange}>
        
                    {doctors.map((doctor) => (
                        <Option key={doctor.id} value={doctor.id} >{doctor.first_name} {doctor.last_name}</Option>
                    ))}
                    
                </Select>
        );
      };

    return (
        <>
          <main>
                <div>
                <div className="pl-32 pr-4 pb-4 justify-center">
            
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            First Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="FirstName" id="FirstName"
                                   
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"
                                   onChange={(e) => {
                                    setFirstName(e.target.value);
                                  }}
                                  />
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Last Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="LastName" id="LastName"
                                   onChange={(e) => {
                                    setLastName(e.target.value);
                                  }}
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Gender
                        </label>
                            <div className="w-72 mt-1 sm:mt-0 sm:col-span-2">
                                <Select label="Select Gender">
                                    <Option>Male</Option>
                                    <Option>Female</Option>
                                    <Option>Other</Option>
                                </Select>
                                </div>

                        </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Email
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="email" name="email" id="email"
                            placeholder="example@gmail.com"
                            onChange={(e) => {
                                setEmailAddress(e.target.value);
                              }}  
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                            </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Date of Birth
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="date" name="dob" id="dob"
                            onChange={(e) => {
                                setDateOfBirth(e.target.value);
                              }}
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Address
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="address" id="address"
                                   onChange={(e) => {
                                    setAddress(e.target.value);
                                  }}
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            City
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="city" id="city"
                                   onChange={(e) => {
                                    setCity(e.target.value);
                                  }}
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> 
                     
                    <p  className="block text-sm text-left font-medium text-gray-700 sm:mt-px sm:pt-2 ">Have you ever applied to our facility before?</p>
                        <div className="flex gap-10 font-medium">
                        <Radio id="yes" name="type" value="yes" label="Yes" onChange={(e) => {
                                    setApplied(e.target.value);
                                  }}/>
                        <Radio id="no" name="type" value="no" label="No"  onChange={(e) => {
                                    setApplied(e.target.value);
                                  }} />
                        </div>
                    </div> 
                    <div className="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Which procedure do you want to make an appointment for?
                        </label>
                            <div className="w-72 mt-1 sm:mt-0 sm:col-span-2">
                                <Select label="Please Select" value={procedure} onChange={handleChange}>
                                    <Option value="Medical Examination" >Medical Examination</Option>
                                    <Option value="Doctor Check" >Doctor Check</Option>
                                    <Option value="Result Analysis" >Result Analysis</Option>
                                    <Option value="Check Up" >Check Up</Option>
                                    <Option value="X-Ray/Scan" >X-Ray/Scan</Option>
                                </Select>
                                </div>

                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Doctor
                        </label>
                            <div className="w-72 mt-1 sm:mt-0 sm:col-span-2">
                                {/* <Select label="Please Select Doctor" value={procedure} onChange={handleChange}> */}
                                {/* <Option value="X-Ray/Scan" >X-Ray/Scan</Option> */}
                                {doctorsDropDown()}
                                   
                                {/* </Select> */}
                                </div>

                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Preferred Appointment Date
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="date" name="aptDate" id="aptDate"
                                   onChange={(e) => {
                                    setAppointmentDate(e.target.value);
                                  }}
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>        
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Preferred Apointment Time
                        </label>
                        <div className="w-72 mt-1 sm:mt-0 sm:col-span-2">
                            {/* <input type="time" name="aptTime" id="aptTime"
                                   onChange={(e) => {
                                    setAppointmentTime(e.target.value);
                                  }}
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/> */}
                                   <Select label="Please Select" value={appointment_time} onChange={handleTimeChange}>
                                    <Option value="09:00" >09:00 AM</Option>
                                    <Option value="10:00" >10:00 AM</Option>
                                    <Option value="11:00" >11:00 AM</Option>
                                    <Option value="12:00" >12:00 PN</Option>
                                    <Option value="02:00" >02:00 PM</Option>
                                    <Option value="03:00" >03:00 PN</Option>
                                    <Option value="04:00" >04:00 PM</Option>


                                </Select>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Symptoms
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea id="aptNotes" name="aptNotes" rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-80 sm:text-sm border border-solid border-gray-300 rounded-md"
                        placeholder="Detailed comments about symptoms"
                        onChange={(e) => {
                            setSymptoms(e.target.value);
                          }}
                        >

                        </textarea>
                        </div>
                    </div>

                   
                </div>
                    <div className="pt-5">
                        <div className="flex justify-center">
                            <button type="submit"
                            onClick={() => onCreateBookingAdmin()}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
          </main>
        </>
  );
}