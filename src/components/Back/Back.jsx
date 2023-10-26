import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const Back = ({ backLinkLocationRef }) => {
  return (
    <div className="mb-3">
      <Link to={backLinkLocationRef} className="btn btn-outline-dark btn-md">
        <FaArrowLeft className="fs-4" />
        <span> Go back</span>
      </Link>
    </div>
  );
};
