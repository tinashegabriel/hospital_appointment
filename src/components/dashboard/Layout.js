import React,  { useState }from "react";
import { Link } from "react-router-dom";
import Topbar from "./Topbar";
import Sidebar from "./Sidebar";
import PropTypes from 'prop-types'
import { HomeRounded, AssignmentOutlined, Event,Chat, EventAvailable, Person  } from '@material-ui/icons'
import Card from "./Card";


const Layout = (props) => {
  const [isOpenSidebar, setIsOpenSidebar] = useState(false)

  const toggleSidebar = () => {
    setIsOpenSidebar(!isOpenSidebar)
  }
  return (
    <div className="flex h-screen bg-gray-200">
      <Sidebar isOpen={isOpenSidebar} />

      <div className="flex flex-col flex-1 w-full">
        <Topbar isOpenSidebar={isOpenSidebar} toggleSidebar={toggleSidebar} />

        <main className="flex flex-col h-full overflow-y-auto">
          {props.children}
          <div className="flex flex-wrap mt-8 mx-8">
        <Card
          title="Appointments"
          subtitle="0"
          icon={() => <EventAvailable style={{ color: '#fff', fontSize: 40 }} />}
          bgIcon="bg-red-400"
          button="Open"/>
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
        </main>
      </div>
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.any,
}