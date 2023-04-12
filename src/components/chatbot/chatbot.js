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
            trigger: 'submit-message',
            
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