import {Event} from "@material-ui/icons";
import React,{useState,useEffect } from 'react';
import { Select, Option, Radio } from "@material-tailwind/react"
import AdminSidebar from "../adminSidebar";
import Topbar from "../Topbar";
import axios from 'axios';
import swal from 'sweetalert';


const AddDoctor = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)
    const [firstName, setFirstName] = React.useState('');
    const [lastName, setLastName] = React.useState('');
    const [gender, setGender] = React.useState('');
    const [emailAddress, setEmailAddress] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [passwordConfirm, setPasswordConfirm] = React.useState('');
    

    const toggleSidebar = () => {
      setIsOpenSidebar(!isOpenSidebar)
    }
    const handleChange = (gender) => {
        console.log('value:', gender);
        setGender(gender);
      };

    const onCreateDoctor = async () => {

        try {
    
            const data = {
                FirstName: firstName,
                LastName: lastName,
                Gender: gender,
                EmailAddress: emailAddress,
                Password: password
            };
            
    
            const options = {
                method: 'POST',
                url: '/doctor',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                },
                data
            };
    
    
            let resp = await axios
                .request(options)
    
            let resp_data = resp.data
            console.log(resp_data)
    
            if (resp_data.code == 200) {
    
                swal({
                    title: "Thank you!",
                    text: "Your data has been saved",
                    icon: "success",
                    button: "Proceed",
                  }).then((value) => {
                    console.log("We are trying to navigate")
                    window.location.href = "/adddoctor";
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
    
    
            console.log("null")
    
            return null
    
        } catch (error) {
    
            console.log("Exception")
            console.log(error)
    
            return null;
        }
    
    };
   
    return (
        <>
            <div className="flex h-screen bg-gray-200">
      <AdminSidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

        <main className="flex flex-col h-full overflow-y-auto">

            <div className="flex flex-wrap mt-8 mx-8">
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
                                <Select label="Select Gender" value={gender} onChange={handleChange}>
                                    <Option value="Male" >Male</Option>
                                    <Option value="Female" >Female</Option>
                                    <Option value="Other" >Other</Option>
                                </Select>
                                </div>

                        </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Email
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="email" name="email" id="emails"
                            placeholder="example@gmail.com"
                            onChange={(e) => {
                                setEmailAddress(e.target.value);
                              }}  
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                            </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Password
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="password" name="password" id="pass" 
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"
                            onChange={(e) => {
                                setPassword(e.target.value);
                              }}
                            />
                            </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Confirm Password
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10">
                            <input type="password" name="password" id="pass"
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"
                            onChange={(e) => {
                                setPasswordConfirm(e.target.value);
                              }}
                            />
                            </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-2 sm:items-start  sm:pt-5">
                        <label htmlFor="type" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Type
                        </label>
                            <div className="w-72 mt-1 sm:mt-0 sm:col-span-2">
                                <Select label="Select Type" >
                                    <Option>General Doctor</Option>
                                    <Option>Radiologist</Option>
                                    <Option>Cardiologist</Option>
                                    <Option>Pediatrician</Option>
                                    <Option>Gynecologist</Option>
                                </Select>
                                </div>

                        </div>

                    <div className="pt-5">
                        <div className="flex justify-center">
                            <button type="submit"
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                                    onClick={() => onCreateDoctor()}
                                    >
                                Create
                            </button>
                        </div>
                    </div>
              </div> 
            </div>
        </main>
      </div>
    </div>
        
        </>
    )
}

export default AddDoctor;