import {HomeRounded, Event,Chat, EventAvailable, Person} from "@material-ui/icons";
import {useState} from 'react';
import { CSSTransition } from 'react-transition-group'
import { colorsClass } from "../dashboard/color";
import Topbar from "../dashboard/Topbar";
import DocSidebar from "../dashboard/DocSidebar";
import { Link } from 'react-router-dom'
import ScheduleApp from "../dashboard/schedulepage";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";


const DocSchedule = ({props }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const toggleSidebar = () => {
      setIsOpenSidebar(!isOpenSidebar)
    }

    let [toggleForm, setToggleForm] = useState(false);
    
    return (
        <>
            <div className="flex h-screen bg-gray-200">
            <DocSidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
 
        <main className="flex flex-col h-full overflow-y-auto">

        <ScheduleApp/>
        
        </main>
      </div>
    </div>
       
        </>
    )
}

export default DocSchedule;