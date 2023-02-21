import {HomeRounded, Event,Chat, EventAvailable, Person} from "@material-ui/icons";
import {useState} from 'react';
import { CSSTransition } from 'react-transition-group'
import { colorsClass } from './color'
import Topbar from "./Topbar";
import { Link } from 'react-router-dom'
import Card from "./Card";


const Doctor = ({props }) => {
    const [isOpenSidebar, setIsOpenSidebar] = useState(false)

    const toggleSidebar = () => {
      setIsOpenSidebar(!isOpenSidebar)
    }

    let [toggleForm, setToggleForm] = useState(false);
    
    return (
        <>
            <div className="flex h-screen bg-gray-200">
            <aside className="z-20 hidden md:block w-64 bg-white overflow-y-auto flex-shrink-0">
        <div className="py-4 text-gray-500">
          <Link to="/" className="ml-6 text-lg font-bold text-gray-800">
            Home
          </Link>
          <ul className="mt-6 text-gray-800">
            <li
              className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
              />
              <Link
                to="/"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <HomeRounded />
                <span className="ml-4">Dashboard</span>
              </Link>
            </li>
            {/* <li
              className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
            >
              <Link
                to="/"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <AssignmentOutlined />
                <span className="ml-4">Forms</span>
              </Link>
            </li> */}
            <li
              className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
              />
              <Link
                to="/calendar"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <Event />
                <span className="ml-4">Calendar</span>
              </Link>
            </li>
            <li
              className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
              />
              <Link
                to="/messages"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <Chat />
                <span className="ml-4">Messages</span>
              </Link>
            </li>
            <li
              className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
              />
              <Link
                to="/appointments"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <EventAvailable />
                <span className="ml-4">Appointments</span>
              </Link>
            </li>
            <li
              className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
            >
              <span
                className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
              />
              <Link
                to="/"
                className="inline-flex items-center w-full text-sm font-semibold"
              >
                <Person />
                <span className="ml-4">Doctors Available</span>
              </Link>
            </li>
            
            
          </ul>
        </div>
      </aside>

      {/* mobile */}
      <CSSTransition unmountOnExit classNames="mob-sidebar">
        <aside className="mob-sidebar fixed inset-y-0 z-20 w-64 mt-16 bg-white overflow-y-auto flex-shrink-0">
          <div className="py-4 text-gray-500">
            <ul className="mt-6 text-gray-800">
              <li
                className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
              >
                <span
                  className={`absolute inset-y-0 left-0 w-1 bg-${colorsClass.primary} rounded-tr-lg rounded-br-lg`}
                />
                <Link
                  to="/"
                  className="inline-flex items-center w-full text-sm font-semibold"
                >
                  <HomeRounded />
                  <span className="ml-4">Dashboard</span>
                </Link>
              </li>
              {/* <li
                className={`relative px-6 py-3 hover:bg-${colorsClass.primary} hover:text-gray-600 transition-colors duration-500`}
              >
                <Link
                  to="/"
                  className="inline-flex items-center w-full text-sm font-semibold"
                >
                  <AssignmentOutlined />
                  <span className="ml-4">Forms</span>
                </Link>
              </li> */}
            </ul>
          </div>
        </aside>
      </CSSTransition>

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
 
        <main className="flex flex-col h-full overflow-y-auto">
        {/* {props.children} */}
          <div className="flex flex-wrap mt-8 mx-8">
           
        <Card
          title="Appointments"
          subtitle="0"
          icon={() => <EventAvailable style={{ color: '#fff', fontSize: 40 }} />}
          bgIcon="bg-red-400"
          />
        <Card
          title="Doctors Available"
          subtitle="0"
          icon={() => (
            <Person style={{ color: '#fff', fontSize: 40 }} />
          )}
          bgIcon="bg-orange-400"
        />
        <Card
          title="Calendar"
          subtitle=""
          icon={() => (
            <Event style={{ color: '#fff', fontSize: 40 }} />
          )}
          bgIcon="bg-teal-400"
        />
      </div>
            <div className="flex flex-wrap mt-8 mx-8">
            <div className="container">
            <div className="flex flex-col">
                <div className="overflow-x-auto">
                    <div className="py-3 pl-2">
                        <div className="relative max-w-xs">
                            <label htmlFor="hs-table-search" className="sr-only">
                                Search 
                            </label>
                            <input
                                type="text"
                                name="hs-table-search"
                                id="hs-table-search"
                                className="block w-full p-3 pl-10 text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400"
                                placeholder="Search Patient..."
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                                <svg
                                    className="h-3.5 w-3.5 text-gray-400"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    <div className="p-1.5 w-full inline-block align-middle">
                        <div className="overflow-hidden border rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                    <tr>
                                        {/* <th scope="col" className="py-3 pl-4">
                                            <div className="flex items-center h-5">
                                                <input
                                                    id="checkbox-all"
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="checkbox"
                                                    className="sr-only"
                                                >
                                                    Checkbox
                                                </label>
                                            </div>
                                        </th> */}
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Patient ID
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Last Name
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                                        >
                                            Email
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Gender
                                        </th>
                                        <th
                                            scope="col"
                                            className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                                        >
                                            Symptoms
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
                                        {/* <td className="py-3 pl-4">
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="checkbox"
                                                    className="sr-only"
                                                >
                                                    Checkbox
                                                </label>
                                            </div>
                                        </td> */}
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            1
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            Ruvimbo
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            Bumhudza
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            ruvimbobumhudza@gmail.com
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                Female
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                Stomachache
                                        </td>
                                    </tr>
                                    <tr>
                                        {/* <td className="py-3 pl-4">
                                            <div className="flex items-center h-5">
                                                <input
                                                    type="checkbox"
                                                    className="text-blue-600 border-gray-200 rounded focus:ring-blue-500"
                                                />
                                                <label
                                                    htmlFor="checkbox"
                                                    className="sr-only"
                                                >
                                                    Checkbox
                                                </label>
                                            </div>
                                        </td> */}
                                        <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                            2
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            Leo
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            Gabriel
                                        </td>
                                        <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                            leogabriel@gmail.com
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                Male
                                        </td>
                                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                                Cough
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
                {/* <Form /> */}
            </div>
        </main>
      </div>
    </div>
       
        </>
    )
}

export default Doctor;