import {Event} from "@material-ui/icons";
import {useState, React} from 'react';
import { Select, Option, Radio } from "@material-tailwind/react"
import AdminSidebar from "../adminSidebar";
import Topbar from "../Topbar";
import axios from 'axios';
import swal from 'sweetalert';



export default function AddPatient (){
    const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailAddress, setEmailAddress] =useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [token, setToken] = useState('');

  const onCreateAccount = async () => {

    try {

        const data = {
            FirstName: firstName,
            LastName: lastName,
            EmailAddress: emailAddress,
            Password: password
        };
        

        const options = {
            method: 'POST',
            url: '/auth/register',
            headers: { 'Content-Type': 'application/json' },
            data
        };


        let resp = await axios
            .request(options)

        let resp_data = resp.data
        console.log(resp_data)

        if (resp_data.code == 200) {

            swal({
                title: "Thank you!",
                text: "Account created",
                icon: "success",
                button: "Proceed",
              }).then((value) => {
                console.log("We are trying to navigate")
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


        console.log("null")

        return null

    } catch (error) {

        console.log("Exception")
        console.log(error)

        return null;
    }
    

};

    
const [isOpenSidebar, setIsOpenSidebar] = useState(false)

const toggleSidebar = () => {
  setIsOpenSidebar(!isOpenSidebar)
}


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
                            <input type="email" name="email" id="emails"
                            placeholder="example@gmail.com"
                            onChange={(e) => {
                                setEmailAddress(e.target.value);
                              }}  
                            className="max-w-lg block w-72 h-128 md:h-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border border-solid border-gray-300 rounded-md"/>
                            </div>
                    </div>

                    <div className="relative w-full mb-3">
                        <label
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2 h-10"></div>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                          }}
                        />
                      </div>
                    <div className="pt-5">
                        <div className="flex justify-center">
                           <button
                         className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => onCreateAccount()}
                          
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
