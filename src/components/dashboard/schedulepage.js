import { Scheduler } from "@aldabil/react-scheduler";
import React,{useState,useEffect } from 'react';
import axios from 'axios';
import swal from 'sweetalert';
import { EVENTS } from "../events";

function ScheduleApp() {
    const [patients, setPatients] = React.useState([]);

    useEffect(() => {
        const getUser = async () => {
              try {
    
                console.log(localStorage.getItem('accessToken'))         
    
                const options = {
                    method: 'GET',
                    url: '/doctor/calender',
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
                    let data = [];
                    console.log(resp_data.payload.result)
                    resp_data.payload.result.forEach(item => {
                        console.log(item.event_id);

                        const newData = [{
                            event_id: item.event_id,
                            title: item.title,
                            start: new Date(2023, 3, 2, 10, 0),
                            end: new Date(2023, 3, 2, 10, 45),
                            admin_id: 2,
                            color: "#900000"
                            },];

                        data.push(...newData);

                      })
                      console.log(data)
                  setPatients(data)

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

      }, []);

      useEffect(() => {
        console.log(patients);
      }, [patients]);
    
    return <Scheduler events={EVENTS} />;
}

export default ScheduleApp;


// [
//     {
// event_id: 1,
// title: "Event 1",
// start: new Date(new Date(new Date().setHours(9)).setMinutes(0)),
// end: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
// disabled: true,
// admin_id: [1, 2, 3, 4]
// },
// {
// event_id: 2,
// title: "Event 2",
// start: new Date(new Date(new Date().setHours(10)).setMinutes(0)),
// end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
// admin_id: 2,
// color: "#50b500"
// },
// {
// event_id: 3,
// title: "Event 3",
// start: new Date(new Date(new Date().setHours(11)).setMinutes(0)),
// end: new Date(new Date(new Date().setHours(12)).setMinutes(0)),
// admin_id: 1,
// editable: false,
// deletable: false
// },
// {
// event_id: 4,
// title: "Event 4",
// start: new Date(
// new Date(new Date(new Date().setHours(9)).setMinutes(30)).setDate(
// new Date().getDate() - 2
// )
// ),
// end: new Date(
// new Date(new Date(new Date().setHours(11)).setMinutes(0)).setDate(
// new Date().getDate() - 2
// )
// ),
// admin_id: 2,
// color: "#900000"
// },
// {
// event_id: 5,
// title: "Event 5",
// start: new Date(
// new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
// new Date().getDate() - 2
// )
// ),
// end: new Date(
// new Date(new Date(new Date().setHours(14)).setMinutes(0)).setDate(
// new Date().getDate() - 2
// )
// ),
// admin_id: 2,
// editable: true
// },
// {
// event_id: 6,
// title: "Event 6",
// start: new Date(
// new Date(new Date(new Date().setHours(10)).setMinutes(30)).setDate(
// new Date().getDate() - 4
// )
// ),
// end: new Date(new Date(new Date().setHours(14)).setMinutes(0)),
// admin_id: 2
// }
// ]