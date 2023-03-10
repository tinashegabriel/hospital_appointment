import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';
import { Select, Option, Radio } from "@material-tailwind/react"



export default function Form() {
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
                                   
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Last Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="LastName" id="LastName"
                                   
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
                                   
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                            </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Date of Birth
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="date" name="dob" id="dob"

                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Address
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="address" id="address"
                                   
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            City
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="text" name="city" id="city"
                                   
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5"> 
                     
                    <p  className="block text-sm text-left font-medium text-gray-700 sm:mt-px sm:pt-2 ">Have you ever applied to our facility before?</p>
                        <div className="flex gap-10 font-medium">
                        <Radio id="yes" name="type" label="Yes" />
                        <Radio id="no" name="type" label="No"  />
                        </div>
                    </div> 
                    <div className="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Which procedure do you want to make an appointment for?
                        </label>
                            <div className="w-72 mt-1 sm:mt-0 sm:col-span-2">
                                <Select label="Please Select">
                                    <Option>Medical Examination</Option>
                                    <Option>Doctor Check</Option>
                                    <Option>Result Analysis</Option>
                                    <Option>Check Up</Option>
                                    <Option>X-Ray/Scan</Option>
                                </Select>
                                </div>

                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptDate" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Preferred Appointment Date
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="date" name="aptDate" id="aptDate"
                                   
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>        
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Preferred Apointment Time
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="time" name="aptTime" id="aptTime"
                                   
                                   className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Appointment Notes
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                        <textarea id="aptNotes" name="aptNotes" rows="3"
                        className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-80 sm:text-sm border border-solid border-gray-300 rounded-md"
                        placeholder="Detailed comments about symptoms"
                        >

                        </textarea>
                        </div>
                    </div>

                   
                </div>
                    <div className="pt-5">
                        <div className="flex justify-center">
                            <button type="submit"
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