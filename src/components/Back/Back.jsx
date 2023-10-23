import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

export const Back = ({ backLinkLocationRef }) => {
  return (
    <div className="mb-3">
      <Link to={backLinkLocationRef} className="btn btn-outline-dark btn-sm">
        <FaArrowLeft className="align-text-top mt-1" />
        <span> Go back</span>
      </Link>
    </div>
  );
};
