import {Event} from "@material-ui/icons";
import {useState} from 'react';
import { Select, Option, Radio } from "@material-tailwind/react"
import AdminSidebar from "../adminSidebar";
import Topbar from "../Topbar";
import Formadmin from "./Formadmin";


const AddAppointments = ({onSendAppointment, lastId }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const toggleSidebar = () => {
      setIsOpenSidebar(!isOpenSidebar)
    }

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
        <>
            <div className="flex h-screen bg-gray-200">
      <AdminSidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

        <main className="flex flex-col h-full overflow-y-auto">

            <div className="flex flex-wrap mt-8 mx-8">
           
                <Formadmin />
            </div>
        </main>
      </div>
    </div>
        
        </>
    )
}

export default AddAppointments;