import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import axios from 'axios';
import swal from 'sweetalert';

class Review extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fullname: '',
      email: '',
      upassword: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { fullname, email, upassword } = steps;

    this.setState({ fullname, email, upassword });

    console.log(fullname)
    console.log(email)
    console.log(upassword)

    const myArray = fullname.value.split(" ")

    let firstName = myArray[0]
    let lastName = myArray[1]

    const onCreateAccount = async () => {

      try {
  
          const data = {
              FirstName: firstName,
              LastName: lastName,
              EmailAddress: email.value,
              Password: upassword.value
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
  
             console.log("Thanks! Your data was submitted successfully!")
              // return res;
          } else if (resp_data.code == 400) {
  
 
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

  onCreateAccount();
  }

  render() {
    const { fullname, email, upassword } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Summary</h3>
        <table>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{fullname.value}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{email.value}</td>
            </tr>
            <tr>
              <td>Password</td>
              <td>{upassword.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

Review.propTypes = {
  steps: PropTypes.object,
};

Review.defaultProps = {
  steps: undefined,
};

class ReviewLogin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginemail: '',
      loginpass: '',
    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { loginemail, loginpass } = steps;

    this.setState({ loginemail, loginpass });

    console.log(loginemail)
    console.log(loginpass)

    const onClickLogin = async () => {

      try {


          const user = {
              username: loginemail.value
          };


          const payload = {
              username: loginemail.value,
              password: loginpass.value
          };

          const options = {
              method: 'POST',
              url: '/auth/login',
              headers: { 'Content-Type': 'application/json' },
              data: { ...payload }
          };

          let resp = await axios
              .request(options)

          let resp_data = resp.data
          console.log(resp_data)

          if (resp_data.code == 200) {

              let res = {
                  token: resp_data.payload.token,
                  user,
              };
              // setToken(resp_data.payload.token)
              console.log(res)
             
              localStorage.setItem('accessToken', resp_data.payload.token);
              // return res;
          } else if (resp_data.code == 400) {
            console.log("Failed to loging, wrong username or password")
              // return res;
          }


          console.log("null")

          return null

      } catch (error) {

          console.log("Exception")
          //console.log(error)

          return null;
      }

      

  };

  onClickLogin();

  }

  render() {
    const { loginemail, loginpass } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Logged in using the following</h3>
        <table>
          <tbody>
            <tr>
              <td>{loginemail.value}</td>
            </tr>
            <tr>
              <td>{loginpass.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ReviewLogin.propTypes = {
  steps: PropTypes.object,
};

ReviewLogin.defaultProps = {
  steps: undefined,
};

class ReviewAppointment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      bfullname: '',
      gender: '',
      bemail: '',
      birth: '',
      homeaddress: '',
      city: '',
      applied: '',
      procedure: '',
      bdate: '',
      btime: '',
      symptoms: '',

    };
  }

  componentWillMount() {
    const { steps } = this.props;
    const { bfullname, gender, bemail, birth, homeaddress, city, applied, procedure, bdate, btime, symptoms } = steps;

    this.setState({ bfullname, gender, bemail, birth, homeaddress, city, applied, procedure, bdate, btime, symptoms });

    console.log(bfullname)
    console.log(gender)
    console.log(bemail)
    console.log(birth)
    console.log(homeaddress)
    console.log(city)
    console.log(applied)
    console.log(procedure)
    console.log(bdate)
    console.log(btime)
    console.log(symptoms)

    const myArray = bfullname.value.split(" ")

    let firstName = myArray[0]
    let lastName = myArray[1]
    
    const onCreateBooking = async () => {

      try {

          const data = {
              docIds: 1,
            FirstName: firstName,
            LastName: lastName,
            EmailAddress: bemail.value,
            Phonenumber: "0772450254",
            D_O_B: birth.value,
            Address: homeaddress.value,
            City: city.value,
            Applied_before: applied.value,
            Procedure: procedure.value,
            Appointment_date: bdate.value,
            Appointment_time: btime.value,
            Symptoms: symptoms.value
          };
          
          console.log(data)
  
          const options = {
              method: 'POST',
              url: '/appointment',
              headers: { 
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
              },
              data
          };
  
  
          let resp = await axios
              .request(options)
  
          let resp_data = resp.data
  
          if (resp_data.code == 200) {
            console.log('We have sent an email for the scheduled appointment')
              // return res;
          } else if (resp_data.code == 400) {
  
              // return res;
          }

          return null
  
      } catch (error) {
  
          console.log("Exception")
          console.log(error)
  
          return null;
      }
  
  };
  
  onCreateBooking();

  }

  render() {
    const { bfullname, gender, bemail, birth, homeaddress, city, applied, procedure, bdate, btime, symptoms } = this.state;
    return (
      <div style={{ width: '100%' }}>
        <h3>Appointment Datails</h3>
        <table>
          <tbody>
            <tr>
              <td>{bfullname.value}</td>
            </tr>
            <tr>
              <td>{gender.value}</td>
            </tr>
            <tr>
              <td>{bemail.value}</td>
            </tr>
            <tr>
              <td>{birth.value}</td>
            </tr>
            <tr>
              <td>{homeaddress.value}</td>
            </tr>
            <tr>
              <td>{city.value}</td>
            </tr>
            <tr>
              <td>{applied.value}</td>
            </tr>
            <tr>
              <td>{procedure.value}</td>
            </tr>
            <tr>
              <td>{bdate.value}</td>
            </tr>
            <tr>
              <td>{btime.value}</td>
            </tr>
            <tr>
              <td>{symptoms.value}</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

ReviewAppointment.propTypes = {
  steps: PropTypes.object,
};

ReviewAppointment.defaultProps = {
  steps: undefined,
};

class Chatbot extends Component {
  render() {
    return (
      <main>
        <section class="form-container">
          
      <ChatBot className="grid justify-items-center"
       steps={[
        {
            id:'intro', 
            message:'Hi, thanks for your visit, can we help you in any way?', 
            trigger:'intro-user',
           },
           {
            id:'intro-user', 
            user:true,
            trigger:'bot'
           },
        {
            id:'bot', 
            message:'Do you already have an account?', 
            trigger:'user',
           },
           {
            id:'user', 
            options:[
              {value:'y', label:'Yes', trigger:'yes-response'},
              {value:'n', label:'No', trigger:'no-response'},
            ] 
           },
           {
            id:'yes-response', 
            message:'Great! Provide your Email address', 
            trigger:'loginemail',
           },
           {
            id:'loginemail', 
            user:true,
            trigger: 'pass-response',
           },
           {
            id:'pass-response', 
            message:'Great! Provide your password', 
            trigger:'loginpass',
           },
           {
            id:'loginpass', 
            user:true,
            trigger: 'verify-review',
           },
           {
            id: 'verify-review',
            component: <ReviewLogin />,
            asMessage: true,
            trigger: 'submit-login',
            
          },
          {
            id:'submit-login', 
            message:'Welcome !!!. You can now book an appointment', 
            trigger: 'bqn1'
           },
           {
            id: 'bqn1',
            message: 'What is your fullname? Example Ruvimbo Bumhudza',
           trigger: 'bfullname',
          },
          {
            id: 'bfullname',
            user: true,
            trigger: 'bqn2',
          },
          {
            id: 'bqn2',
            message: 'Hi {previousValue}! What is your gender?',
           trigger: 'gender',
          },
          {
            id: 'gender',
            options: [
              { value: 'male', label: 'Male', trigger: 'bqn3' },
              { value: 'female', label: 'Female', trigger: 'bqn3' },
            ],
          },
          {
            id: 'bqn3',
            message: 'What is your email address? ',
           trigger: 'bemail',
          },
          {
            id: 'bemail',
            user: true,
            trigger: 'bqn4',
          },
          {
            id: 'bqn4',
            message: 'Date of Birth',
           trigger: 'birth',
          },
          {
            id: 'birth',
            user: true,
            trigger: 'bqn5',
          },
          {
            id: 'bqn5',
            message: 'Home Address ?',
           trigger: 'homeaddress',
          },
          {
            id: 'homeaddress',
            user: true,
            trigger: 'bqn6',
          },
          {
            id: 'bqn6',
            message: 'City?',
           trigger: 'city',
          },
          {
            id: 'city',
            user: true,
            trigger: 'bqn7',
          },
          {
            id: 'bqn7',
            message: 'Have you ever applied to our facility before?',
           trigger: 'applied',
          },
          {
            id:'applied', 
            options:[
              {value:'yes', label:'Yes', trigger:'bqn8'},
              {value:'no', label:'No', trigger:'bqn8'},
            ] 
           },
           {
            id: 'bqn8',
            message: 'Which procedure do you want to make an appointment for?',
           trigger: 'procedure',
          },
          {
            id:'procedure', 
            options:[
              {value:'Medical Examination', label:'Medical Examination', trigger:'bqn9'},
              {value:'Doctor Check', label:'Doctor Check', trigger:'bqn9'},
              {value:'Result Analysis', label:'Result Analysis', trigger:'bqn9'},
              {value:'Check Up', label:'Check Up', trigger:'bqn9'},
              {value:'X-Ray/Scan', label:'X-Ray/Scan', trigger:'bqn9'},
            ] 
           },
           {
            id: 'bqn9',
            message: 'Preferred Appointment Date in this format dd/mm/yyyy?',
           trigger: 'bdate',
          },
          {
            id: 'bdate',
            user: true,
            trigger: 'bqn10',
          },
          {
            id: 'bqn10',
            message: 'Preferred Apointment Time?',
           trigger: 'btime',
          },
          {
            id:'btime', 
            options:[
              {value:'09:00', label:'09:00 AM', trigger:'bqn11'},
              {value:'10:00', label:'10:00 AM', trigger:'bqn11'},
              {value:'11:00', label:'11:00 AM', trigger:'bqn11'},
              {value:'12:00', label:'12:00 AM', trigger:'bqn11'},
              {value:'02:00', label:'02:00 PM', trigger:'bqn11'},
              {value:'03:00', label:'03:00 PM', trigger:'bqn11'},
              {value:'04:00', label:'04:00 PM', trigger:'bqn11'},
            ] 
           },
           {
            id: 'bqn11',
            message: 'Symptoms',
            trigger: 'symptoms'
            
          },
          {
            id: 'symptoms',
            user: true,
            trigger: 'bqn12',
          },
          {
            id: 'bqn12',
            component: <ReviewAppointment />,
            asMessage: true,
            trigger: 'bqn13',
            
          },
           {
            id: 'bqn13',
            message: 'Thanks! Your data was submitted successfully! You can check the appointment vie the website and we have sent an email for the scheduled appointment.',
            end: true
            
          },
           {
            id:'no-response', 
            message:'Would you like to create an account', 
            trigger:'input'
           },
           {
            id:'input', 
            options:[
              {value:'y', label:'Yes', trigger:'yes'},
              {value:'n', label:'No', trigger:'no'},
            ] 
           },
           {
            id:'yes', 
            message:'Great! Answer the following questions to sign up', 
            trigger: 'qn1',
           },
           {
            id:'no', 
            message:'Okay. How may i help you?', 
           },
           {
            id: 'qn1',
            message: 'What is your fullname? Example Ruvimbo Bumhudza',
           trigger: 'fullname',
          },
          {
            id: 'fullname',
            user: true,
            trigger: 'qn2',
          },
          {
            id: 'qn2',
            message: 'What is your email address? Example ruvimbo.bumhudza@nust.ac.zw',
            trigger: 'email',
          },
          {
            id: 'email',
            user: true,
            trigger: 'qn3',
          },
          {
            id: 'qn3',
            message: 'What is your preffered password?',
            trigger: 'upassword',
          },
          {
            id: 'upassword',
            user: true,
            trigger: 'summary',
          },
          {
            id: 'summary',
            message: 'Great! Check out your summary',
            trigger: 'review',
          },
          {
            id: 'review',
            component: <Review />,
            asMessage: true,
            trigger: 'submit-message',
            
          },
          {
            id: 'submit-message',
            message: 'Thanks! Your data was submitted successfully! You can log in from here if you wish to book an appointment or proceed to login page on the website.',
            trigger: 'login-res'
            
          },
          {
            id:'login-res', 
            message:'Would you like to login?', 
            trigger:'input1'
           },
           {
            id:'input1', 
            options:[
              {value:'y', label:'Yes', trigger:'yes-response'},
              {value:'n', label:'No', trigger:'no'},
            ] 
           },

         ]}
      />
      
    </section>
      </main>
    );
  }
       
}

export default Chatbot;