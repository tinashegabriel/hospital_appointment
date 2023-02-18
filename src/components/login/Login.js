import React,{ useState }  from "react";
import {Link, Navigate } from "react-router-dom";
import { Redirect} from "react-router";
import axios from 'axios';
import swal from 'sweetalert';
import Layout from '../dashboard/Layout';


export default function Login() {
    const [username, setName] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [token, setToken] = React.useState('');


    const onClickLogin = async () => {

        try {

            console.log(username)

            const user = {
                username: username
            };


            const payload = {
                username: username,
                password: password
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
                setToken(resp_data.payload.token)
                console.log(res)

                swal({
                    title: "Welcome",
                    text: "You have successfully logged in!",
                    icon: "success",
                    button: "Proceed",
                  }).then((value) => {
                    console.log("We are trying to navigate")
                    window.location.href = "/dashboard";
                  })
               
                // return res;
            } else if (resp_data.code == 400) {

                swal({
                    title: "Oops.., Sorry!!!",
                    text: "Failed to loging, wrong username or password",
                    icon: "error",
                    button: "Retry",
                  });
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


  return (
    <>
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
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Sign in
                      </h6>
                      
                      <img class="w-24 h-24 rounded-full mx-auto" 
                          alt="..."
                          className="w-5 mr-1"
                          src={require('../../assets/img/image.png')}
                        />
                    </div>
                    
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-gray-500 text-center mb-3 font-bold">
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          onChange={(e) => {
                            setName(e.target.value);
                          }}
                          
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                        />
                      </div>
                      <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-gray-800 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                      
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => onClickLogin()}
                          
                        >
                          Sign In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-white"
                    >
                      <small>Forgot password?</small>
                    </a>
                  </div>
                  <div className="w-1/2 text-right">
                    <a
                      href="#pablo"
                      onClick={e => e.preventDefault()}
                      className="text-gray-900"
                    >
                      <small>Create new account</small>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}