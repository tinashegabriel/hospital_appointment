import {HomeRounded, Event,Chat, EventAvailable, Person} from "@material-ui/icons";
import {useState} from 'react';
import { CSSTransition } from 'react-transition-group'
import { colorsClass } from "../dashboard/color";
import Topbar from "../dashboard/Topbar";
import Sidebar from "../dashboard/Sidebar";
import { Link } from 'react-router-dom'
import UserScheduleApp from "../dashboard/userSchedulepage";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";


const UserSchedule = ({props }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const toggleSidebar = () => {
      setIsOpenSidebar(!isOpenSidebar)
    }

    let [toggleForm, setToggleForm] = useState(false);
    
    return (
        <>
            <div className="flex h-screen bg-gray-200">
            <Sidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
 
        <main className="flex flex-col h-full overflow-y-auto">

        <UserScheduleApp/>
        
        </main>
      </div>
    </div>
       
        </>
    )
}

export default UserSchedule;