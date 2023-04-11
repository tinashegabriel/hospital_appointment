import React, { useState,useEffect } from 'react'
import PropTypes from 'prop-types'
import { MenuRounded, CloseRounded } from '@material-ui/icons'
import axios from 'axios';
import swal from 'sweetalert';

const Topbar= ({ isOpenSidebar, toggleSidebar }) => {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [emailAddress, setEmailAddress] = React.useState('');
  const [phone_number, setPhone] = React.useState('');
  const [date_of_birth, setDateOfBirth] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [city, setCity] = React.useState('');
  const [isOpenDropdownProfile, setIsOpenDropdownProfile] = useState(false)

  useEffect(() => {
    const getUser = async () => {
          try {       

            const options = {
                method: 'GET',
                url: '/patient',
                headers: { 
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem('accessToken')}` 
                }
            };


            let resp = await axios
                .request(options)

            let resp_data = resp.data

            if (resp_data.code == 200) {

              setFirstName(resp_data.payload.result[0].firstName)
              setLastName(resp_data.payload.result[0].lastName)
              setEmailAddress(resp_data.payload.result[0].emailAddress)
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

            return null

          } catch (error) {

              console.log("Exception")
              console.log(error)

              return null;
          }
        };
        getUser();
  }, []);

  return (
    <header className="z-10 py-4 bg-white shadow-md">
      <div className="container flex items-center justify-between px-6 mx-auto">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-1 mr-5 rounded-md focus:outline-none"
        >
          {isOpenSidebar ? <CloseRounded /> : <MenuRounded />}
        </button>
        <div />
        <ul className="flex items-center flex-shrink-0 space-x-6">
          <li className="relative">
            <button
              onClick={() => setIsOpenDropdownProfile(!isOpenDropdownProfile)}
              className="align-middle rounded-full focus:shadow-outline-purple focus:outline-none"
              aria-label="Account"
              aria-haspopup="true"
            >
              <img
                className="object-cover w-8 h-8 rounded-full"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcSoF0Pt1oegHvExPj4v8NRYvkKTrCX0WlYIFA&usqp=CAU"
                alt=""
                aria-hidden="true"
              />
            </button>
            <div
              className={`${
                !isOpenDropdownProfile && 'hidden'
              } origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg`}
            >
              <div className="rounded-md bg-white shadow-xs">
                <div
                  className="py-1"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="options-menu"
                >
                  <p href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent">
                    <div class="mr-3">
                      <svg class="h-6 w-6 text-black"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <span>{firstName} {lastName}</span>
                  </p>
                  
                  <p href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent">
                    <div class="mr-3">
                      <svg class="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <rect x="3" y="5" width="18" height="14" rx="2" />  <polyline points="3 7 12 13 21 7" /></svg>
                    </div>
                    <span>{emailAddress}</span>
                  </p>
                  <p href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent">
                    <div class="mr-3">
                      <svg class="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /></svg>
                    </div>
                    <span>+263 771 234 567</span>
                  </p>
                  <p href="#" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent">
                    <div class="mr-3">
                      <svg class="h-6 w-6 text-black"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <polyline points="5 12 3 12 12 3 21 12 19 12" />  <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />  <path d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6" /></svg>
                    </div>
                    <span>123 K Byo</span>
                  </p>
                  <hr class="dark:border-gray-700"></hr>
                  <a href="/" class="flex items-center transform transition-colors duration-200 border-r-4 border-transparent hover:border-red-600">
                    <div class="mr-3 text-red-600">
                      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                    </div>
                    Logout
                  </a>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </header>
  )
}

export default Topbar

Topbar.propTypes = {
  isOpenSidebar: PropTypes.bool.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
}