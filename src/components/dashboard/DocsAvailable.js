import react from 'react';
import {useState} from 'react';
import { Link } from "react-router-dom";
import DocSidebar from './DocSidebar';
import Topbar from "./Topbar";



    const DoctorAvailable = ({props }) => {
        const [isOpenSidebar, setIsOpenSidebar] = useState(false)
    
        const toggleSidebar = () => {
          setIsOpenSidebar(!isOpenSidebar)
        }
    
        let [toggleForm, setToggleForm] = useState(false);
        
        return (
            <>
                <div className="flex h-screen bg-gray-200">
                <DocSidebar isOpen={isOpenSidebar} />
    
          <div className="flex flex-col flex-1 w-full">
            <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />
        <main className="flex flex-col h-full overflow-y-auto">
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
                                placeholder="Search Doctor..."
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
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200">
                                    <tr>
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
                                        <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"  to="/">
                                                View
                                                </Link>
                                        </td>
                                        
                                    </tr>
                                    <tr>
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
                                        <Link class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"  to="/">
                                                View
                                                </Link>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
            </div>
        </main>
      </div>
       </div>
        </>
    )
}

export default DoctorAvailable;