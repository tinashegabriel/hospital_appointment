import React, { Component } from 'react';
import ChatBot from 'react-simple-chatbot';

class Chatbot extends Component {
  render() {
    return (
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
              "url('https://cdn.pixabay.com/photo/2021/10/11/17/37/doctor-6701410_960_720.jpg')",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat"
            }}
          >
          </div>
      <ChatBot className="grid justify-items-center"
       steps={[
        {
            id:'intro', 
            message:'Hello. What is your name?', 
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
            message:'Great!Provide your Email address and password to login', 
            trigger:'pass',
           },
           {
            id:'pass', 
            user:true,
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
            end:true,
           },
           {
            id:'no', 
            message:'Okay. How may i help you?', 
           },
         ]}
      />
      
    </section>
      </main>
    );
  }
       
}

export default Chatbot;