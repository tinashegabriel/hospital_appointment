import {Event} from "@material-ui/icons";
import {useState} from 'react';
import { Select, Option, Radio } from "@material-tailwind/react"
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import DoctorCard from './DoctorCard';



const DoctorProfile = () => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const toggleSidebar = () => {
      setIsOpenSidebar(!isOpenSidebar)
    }
    const doctor = {
        name: 'Dr. John Doe',
        email: 'johndoe@example.com',
        type: 'General Practitioner',
        image: 'https://randomuser.me/api/portraits/men/1.jpg'
      };
   
    return (
        <>
            <div className="flex h-screen bg-gray-200">
      <Sidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

        <main className="flex flex-col h-full overflow-y-auto">

            <div className="flex flex-wrap mt-8 mx-8">
            <div className="container mx-auto mt-8">
                <DoctorCard {...doctor} />
                </div>
            </div>
        </main>
      </div>
    </div>
        
        </>
    )
}

export default DoctorProfile;