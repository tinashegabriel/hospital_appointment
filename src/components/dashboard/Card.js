import React from 'react'
import PropTypes from 'prop-types'

const Card = ({ title, subtitle, icon, bgIcon}) => {
  const Icon = icon
  return (
    <div className="flex items-center bg-white shadow-md m-4 py-3 px-6 w-full md:w-1/3 lg:w-1/4 rounded-md">
      {icon && (
        <div className={`flex-shrink-0 items-center p-2 rounded-full ${bgIcon}`}>
          <Icon />
        </div>
      )}
      <div className="flex flex-col ml-4">
        <p className="text-bold text-2xl lg:text-3xl">{title}</p>
        <p className="font-light text-lg lg:text-xl italic">{subtitle}</p>
      </div>
     
    </div>
  )
}

export default Card

Card.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  icon: PropTypes.any,
  bgIcon: PropTypes.string,
 
}