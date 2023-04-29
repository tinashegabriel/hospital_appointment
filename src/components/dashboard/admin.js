import React,  { useState,useEffect }from "react";
import { Link } from 'react-router-dom'
import { EventAvailable, Person, PostAdd, PersonAdd,HomeRounded, AssignmentOutlined, Event,Chat  } from '@material-ui/icons'
import { colorsClass } from './color'
import Topbar from "./Topbar";
import AdminSidebar from "./adminSidebar";
// import Card from "./Card";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import axios from 'axios';
import swal from 'sweetalert';



const Admin = ({props }) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)
  const [appointments, setAppointments] = React.useState('');
  const [doctors, setDoctors] = React.useState('');

  useEffect(() => {
    const getUser = async () => {
          try {

            console.log(localStorage.getItem('accessToken'))         

            const options = {
                method: 'GET',
                url: '/admin/appointments',
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
        const getDoctor = async () => {
          try {

            console.log(localStorage.getItem('accessToken'))         

            const options = {
                method: 'GET',
                url: '/admin/doctors',
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

              setDoctors(resp_data.payload.result.length)
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
        getDoctor();
  }, []);

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar)
  }

  let [toggleForm, setToggleForm] = useState(false);
  
  return (
      <>
           <div className="flex h-screen bg-gray-200">
            <AdminSidebar isOpen={isOpenSidebar} />
            <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

            <main className="flex flex-col h-full overflow-y-auto">
        {/* {props.children} */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 align-items-center">
           
          <Card className="w-96 mx-auto align-items-center w-100 h-100">
                <CardHeader >  
                </CardHeader>
                <CardBody className="text-center">
                  <EventAvailable style={{ fontSize: 70}}/>
        
                  <Typography variant="h5" className="mb-2">
                   Total Appointments 
                  </Typography>
                  <Typography>
                  {appointments}
                  </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                  <Typography variant="small">Hospital</Typography>
                  <Typography variant="small" color="gray" className="flex gap-1">
                    <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                    Zimbabwe
                  </Typography>
                </CardFooter>
              </Card>
              <Card className="w-96 mx-auto align-items-center w-100 h-100">
                <CardHeader >  
                </CardHeader>
                <CardBody className="text-center">
                  <Person style={{ fontSize: 70}}/>
        
                  <Typography variant="h5" className="mb-2">
                   Total Doctors Available 
                  </Typography>
                  <Typography>
                  {doctors}
                  </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                  <Typography variant="small">Hospital</Typography>
                  <Typography variant="small" color="gray" className="flex gap-1">
                    <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                    Zimbabwe
                  </Typography>
                </CardFooter>
              </Card>
              
              <Card className="w-96 mx-auto align-items-center w-100 h-100">
                <CardHeader >  
                </CardHeader>
                <CardBody className="text-center">
                  <Person style={{ fontSize: 70}}/>
        
                  <Typography variant="h5" className="mb-2">
                   Total Patients Available 
                  </Typography>
                  <Typography>
                    0
                  </Typography>
                </CardBody>
                <CardFooter divider className="flex items-center justify-between py-3">
                  <Typography variant="small">Hospital</Typography>
                  <Typography variant="small" color="gray" className="flex gap-1">
                    <i className="fas fa-map-marker-alt fa-sm mt-[3px]" />
                    Zimbabwe
                  </Typography>
                </CardFooter>
              </Card>
        {/* <Card
          title="Doctors Available"
          subtitle="0"
          icon={() => (
            <Person style={{ color: '#fff', fontSize: 40 }} />
          )}
          bgIcon="bg-orange-400"
        />
        <Card
          title="Calendar"
          subtitle=""
          icon={() => (
            <Event style={{ color: '#fff', fontSize: 40 }} />
          )}
          bgIcon="bg-teal-400"
        /> */}
      </div>
      <div className="flex flex-wrap mt-8 mx-8">
     
      </div>
            </main>
            </div>
           </div>
        </>
            
    )
}
export default Admin;