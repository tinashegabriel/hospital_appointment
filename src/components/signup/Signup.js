import React from "react";
import { Link } from "react-router-dom";
import axios from 'axios';
import swal from 'sweetalert';



export default function Signup() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordConfirm, setPasswordConfirm] = React.useState('');
  const [token, setToken] = React.useState('');

  const onCreateAccount = async () => {

    try {

        const data = {
            FirstName: firstName,
            LastName: lastName,
            EmailAddress: emailAddress,
            Password: password
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

            swal({
                title: "Thank you!",
                text: "You can now log in",
                icon: "success",
                button: "Proceed",
              }).then((value) => {
                console.log("We are trying to navigate")
                window.location.href = "/";
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
        console.log(error)

        return null;
    }

};

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            class="contrast-20"
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
                      <h6 className="text-gray-600 text-2xl font-bold">
                        Sign UP
                      </h6>
                    </div>
           <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    
                    <div className="text-gray-500 text-center mb-3 font-bold">
                    </div>
                    <form>
                      <div className="relative w-full mb-3">
                      <div class="flex flex-wrap -mx-3 mb-6">
                      <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                        First Name
                      </label>
                      <input class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                      id="grid-first-name" 
                      type="text" 
                      placeholder="First Name"
                      onChange={(e) => {
                        setFirstName(e.target.value);
                      }}
                      />
                    </div>
                    <div class="w-full md:w-1/2 px-3">
                      <label class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-last-name">
                        Last Name
                      </label>
                      <input class="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full" 
                      id="grid-last-name" 
                      type="text" 
                      placeholder="Last Name"
                      onChange={(e) => {
                        setLastName(e.target.value);
                      }}
                      />
                    </div>
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => {
                            setEmailAddress(e.target.value);
                          }}
                        />
                    </div>
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
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                        />
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Confirm Password"
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => {
                            setPasswordConfirm(e.target.value);
                          }}
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
                            I accept the Terms of Use and Privacy Policy
                          </span>
                        </label>
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => onCreateAccount()}
                          
                        >
                          Create Account
                        </button>

                        <div class="flex items-center  space-x-4"> 
                        <h6>Already have an account?</h6>
                        <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"  to="/"> 
                        <h6>LOGIN</h6>
                        </Link>
                        <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"  to="/admin"> 
                        <h6>Admin</h6>
                        </Link>
                        </div>
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
                      <small>Forgot Password?</small>
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