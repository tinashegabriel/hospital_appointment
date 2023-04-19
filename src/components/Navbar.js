import React from "react";
import { Link } from "react-router-dom";
import {Close, MenuOpen} from '@material-ui/icons' 

export default function Navbar (props) {
  const [navbarOpen, setNavbarOpen] = React.useState(false)
  // const [nav1, setNav] = React.useState(false)
  return (
    <>
      <nav
        className={
          (props.transparent
            ? "top-0 absolute z-50 w-full"
            : "relative shadow-lg bg-white shadow-lg") +
          "flex flex-wrap items-center justify-between px-2 py-3 "
        }
      >
       <div onClick={() => setNavbarOpen (!navbarOpen) } className="md:hidden">
              {!navbarOpen ? <MenuOpen size = {20}/> : <Close size = {20}/>}
        </div>
        <div className={`container px-4 flex flex-wrap items-center justify-between ${navbarOpen ? 'top-20': 'top-[]-490px'}`}>
          <div className="hidden md:flex">
        <div className="hidden md:flex w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start font-medium">
            <Link
              className={
                (props.transparent ? "text-gray-900" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              to="/sign-up"
            >
              Create Account
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-gray-900" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          {/* <Link
              className={
                (props.transparent ? "text-gray-900" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              to="/appointments"
            >
              Book Appointment
            </Link> */}
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
              className={
                (props.transparent ? "text-gray-900" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              to="/dlogin"
            >
              Doctor
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          <div className="w-full relative flex justify-between lg:w-auto lg:static lg:block lg:justify-start">
          <Link
              className={
                (props.transparent ? "text-gray-900" : "text-gray-800") +
                " text-sm font-bold leading-relaxed inline-block mr-4 py-2 whitespace-nowrap uppercase"
              }
              to="/alogin"
            >
              Admin
            </Link>
            <button
              className="cursor-pointer text-xl leading-none px-3 py-1 border border-solid border-transparent rounded bg-transparent block lg:hidden outline-none focus:outline-none"
              type="button"
              onClick={() => setNavbarOpen(!navbarOpen)}
            >
              <i
                className={
                  (props.transparent ? "text-" : "text-gray-800") +
                  " fas fa-bars"
                }
              ></i>
            </button>
          </div>
          </div>
          <div
            className={
              "lg:flex flex-grow items-center bg-white lg:bg-transparent lg:shadow-none" +
              (navbarOpen ? " block rounded shadow-lg" : " hidden")
            }
            id="example-navbar-warning"
          >
            {/* <ul className="flex flex-col lg:flex-row list-none mr-auto">
              <li className="flex items-center">
                <Link
                  className={
                    (props.transparent
                      ? "lg:text-gray-900 lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  to="/chatbot"
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " far fa-file-alt text-lg leading-lg mr-2"
                    }
                  />{" "}
                  Chat
                </Link>
              </li>
            </ul> */}
            <ul className="flex flex-col lg:flex-row list-none lg:ml-auto">
              <li className="flex items-center">
                <Link
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  to="/sign-up"
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " fab fa-facebook text-lg leading-lg "
                    }
                  />
                  <span className="lg:hidden inline-block ml-2">Create Account</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  to="/dlogin"
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " fab fa-twitter text-lg leading-lg "
                    }
                  />
                  <span className="lg:hidden inline-block ml-2">Doctor</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link
                  className={
                    (props.transparent
                      ? "lg:text-white lg:hover:text-gray-300 text-gray-800"
                      : "text-gray-800 hover:text-gray-600") +
                    " px-3 py-4 lg:py-2 flex items-center text-xs uppercase font-bold"
                  }
                  to="/alogin"
                >
                  <i
                    className={
                      (props.transparent
                        ? "lg:text-gray-300 text-gray-500"
                        : "text-gray-500") +
                      " fab fa-github text-lg leading-lg "
                    }
                  />
                  <span className="lg:hidden inline-block ml-2">Admin</span>
                </Link>
              </li>

              <li className="flex items-center">
                <Link to ="/aboutus">
                <button
                  className={
                    (props.transparent
                      ? "bg-white text-gray-800 active:bg-gray-100"
                      : "bg-pink-500 text-white active:bg-pink-600") +
                    " text-xs font-bold uppercase px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none lg:mr-1 lg:mb-0 ml-3 mb-3"
                  }
                  type="button"
                  style={{ transition: "all .15s ease" }}
                >
                  <i className="fas fa-arrow-alt-circle-down">
                    </i> About Us
                </button>
                </Link>
              </li>
            </ul>
          </div>
        </div>
        {/* <div onClick={() => setNav (!nav1) } className="md:hidden">
              {!nav1 ? <Close size = {20}/> : <MenuOpen size = {20}/>}
            </div>
            <div className="md:hidden">
            <ul className= {`fixed left-0 top-0 w-[60%] h-full md:static ${nav1 ? 'top-20': 'top-[]-490px'}`}>
                  <li className = "p-2 border-b border-gray-600">Create Account</li>
                  <li className = "p-2 border-b border-gray-600">Doctor</li>
                  <li className = "p-2 border-b border-gray-600">Admin</li>
                  <li className = "p-2 border-b border-gray-600">About Us</li>
            </ul>
            </div> */}
      </nav>
    </>
  );
}