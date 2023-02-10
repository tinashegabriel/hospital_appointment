import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MenuRounded, CloseRounded } from '@material-ui/icons'

const Topbar= ({ isOpenSidebar, toggleSidebar }) => {
  const [isOpenDropdownProfile, setIsOpenDropdownProfile] = useState(false)

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
                  <a
                    href="/"
                    className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                    role="menuitem"
                  >
                    Log out
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