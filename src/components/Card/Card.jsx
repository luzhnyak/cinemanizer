import React from 'react';
import { Link, useLocation } from 'react-router-dom/dist';
import noPoster from '../../images/no-poster.jpg';

export const Card = ({ movie: { id, title, poster_path } }) => {
  const location = useLocation();

  return (
    <div className="col-lg-3 col-md-4 col-sm-6 col-12">
      <div className="card h-100">
        <Link to={`/movies/${id}`} state={{ from: location }}>
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                : noPoster
            }
            className="card-img-top"
            alt={title}
          />
        </Link>
        <div className="card-body">
          <Link to={`/movies/${id}`} state={{ from: location }}>
            <h5 className="card-title">{title}</h5>
          </Link>
        </div>
      </div>
    </div>
  );
};
