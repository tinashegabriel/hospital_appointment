import React,  { useState,useEffect }from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import PropTypes from 'prop-types'
import { HomeRounded, AssignmentOutlined, Event,Chat, EventAvailable, Person  } from '@material-ui/icons'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
} from "@material-tailwind/react";
import { Button } from "@material-tailwind/react";
import axios from 'axios';
import swal from 'sweetalert';


const Layout = (props) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [phone_number, setPhone] = React.useState('');
  const [date_of_birth, setDateOfBirth] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [appointments, setAppointments] = React.useState('');
  const [doctors, setDoctors] = React.useState('');

  
  useEffect(() => {
    const getUser = async () => {
          try {

            console.log(localStorage.getItem('accessToken'))         

            const options = {
                method: 'GET',
                url: '/appointment',
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

  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar)
  }
  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

        <main className="flex flex-col h-full overflow-y-auto">
          {props.children}
          <div className="flex flex-wrap mt-8 mx-8">
           
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
                   Total Doctors 
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
                   Calendar 
                  </Typography>
                  <Typography>
                    Show all available events
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
      </div>
        </main>
      </div>
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.any,
}