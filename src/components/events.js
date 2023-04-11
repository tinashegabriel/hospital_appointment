

import axios from 'axios';
import swal from 'sweetalert';

let data = [];

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
          
          console.log(resp_data.payload.result)
          resp_data.payload.result.forEach(item => {
              console.log(item.event_id);

              const newData = [{
                  event_id: item.event_id,
                  title: item.title,
                  start: new Date(2023, 3, Number(item.start_date), Number(item.start_time), 0),
                  end: new Date(2023, 3, Number(item.start_date), Number(item.start_time), 45),
                  admin_id: 2,
                  color: "#900000"
                  },];

              data.push(...newData);

            })
            console.log(data)

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



export const EVENTS =  data
// [{
//     event_id:1,
//     title: "item.title",
//     start: new Date(2023, 3, 2, 10, 0),
//     end: new Date(2023, 3, 2, 10, 45),
//     admin_id: 2,
//     color: "#900000"
//     }]