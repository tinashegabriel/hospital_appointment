import React from 'react';

const DoctorCard = ({ name, email, type, image }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={image} alt={name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base mb-2">{email}</p>
        <p className="text-gray-700 text-base">{type}</p>
      </div>
    </div>
  );
};

export default DoctorCard;
