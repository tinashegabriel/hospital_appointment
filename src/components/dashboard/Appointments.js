import {Event} from "@material-ui/icons";
import {useState} from 'react';
import { Select, Option, Radio } from "@material-tailwind/react"

const Appointments = ({onSendAppointment, lastId }) => {
    const clearData = {
        FirstName: '',
        LastName: '',
        aptDate: '',
        aptTime: '',
        aptNotes: '',
        address: '',
        city: '',
    };
    let [toggleForm, setToggleForm] = useState(false);
    let [formData, setFormData] = useState(clearData)

    function formDataPublish() {
        const appointmentInfo = {
            id: lastId + 1,
            FirstName: formData.FirstName,
            LastName: formData.LastName,
            dob: formData.dob,
            aptDate: formData.aptDate + ' ' + formData.aptTime,
            aptNotes: formData.aptNotes,
            address: formData.address,
            city: formData.city
        }
        onSendAppointment(appointmentInfo);
        setFormData(clearData);
        setToggleForm(!toggleForm);
    }
    const [selected,setSelected] = useState("");
    const[open, setOpen] = useState("false");

    return (
        <div>
            <button onClick={() => {
                setToggleForm(!toggleForm)
            }}
                    className={`bg-gray-400 text-white px-2 py-3 w-full text-left rounded-t-md
                    ${toggleForm ? 'rounded-t-md' : 'rounded-md'}`}>
                <div><Event className="inline-block align-text-top"/> Add Appointment</div>
            </button>
            {
                toggleForm &&
                <form>
                <div className="border-r-2 border-b-2 border-l-2 border-light-blue-500 rounded-b-md pl-4 pr-4 pb-4">
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="FirstName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            First Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="FirstName" id="FirstName"
                                   onChange={(event) => {
                                       setFormData({...formData, FirstName: event.target.value})
                                   }}
                                   value={formData.FirstName}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="LastName" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Last Name
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="LastName" id="LastName"
                                   onChange={(event) => {
                                       setFormData({...formData, LastName: event.target.value})
                                   }}
                                   value={formData.LastName}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
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
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="email" name="email" id="email"
                            placeholder="example@gmail.com"
                                   onChange={(event) => {
                                       setFormData({...formData, email: event.target.value})
                                   }}
                                   value={formData.city}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="dob" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Date of Birth
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="date" name="dob" id="dob"
                                   onChange={(event) => {
                                       setFormData({...formData, dob: event.target.value})
                                   }}
                                   value={formData.dob}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Address
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="address" id="address"
                                   onChange={(event) => {
                                       setFormData({...formData, address: event.target.value})
                                   }}
                                   value={formData.address}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="city" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            City
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="text" name="city" id="city"
                                   onChange={(event) => {
                                       setFormData({...formData, city: event.target.value})
                                   }}
                                   value={formData.city}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
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
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="date" name="aptDate" id="aptDate"
                                   onChange={(event) => {
                                       setFormData({...formData, aptDate: event.target.value})
                                   }}
                                   value={formData.aptDate}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>        
                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptTime" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Preferred Apointment Time
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
                            <input type="time" name="aptTime" id="aptTime"
                                   onChange={(event) => {
                                       setFormData({...formData, aptTime: event.target.value})
                                   }}
                                   value={formData.aptTime}
                                   className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"/>
                        </div>
                    </div>

                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start  sm:pt-5">
                        <label htmlFor="aptNotes" className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2">
                            Appointment Notes
                        </label>
                        <div className="mt-1 sm:mt-0 sm:col-span-2">
            <textarea id="aptNotes" name="aptNotes" rows="3"
                      className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 mt-1 block w-full sm:text-sm border-gray-300 rounded-md"
                      placeholder="Detailed comments about symptoms"
                      onChange={(event) => {
                          setFormData({...formData, aptNotes: event.target.value})
                      }}
                      value={formData.aptNotes}></textarea>
                        </div>
                    </div>

                    <div className="pt-5">
                        <div className="flex justify-end">
                            <button type="submit"
                                    onClick={formDataPublish}
                                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-black  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
                </form>
            }
        </div>
        
    )
}

export default Appointments;