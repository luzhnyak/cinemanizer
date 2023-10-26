import { Back } from 'components/Back/Back';
import { Loader } from 'components/Loader/Loader';
import React, { Suspense, useEffect, useRef } from 'react';
import { NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { useFetchPersonByIdQuery } from 'redux/api';
import noPoster from '../images/no-poster.jpg';
import toast from 'react-hot-toast';

const PersonDetailsPage = () => {
  const { personId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/people');

  const { data, isLoading, error } = useFetchPersonByIdQuery(personId, {
    skip: !personId,
  });

  // Виводимо помилку
  useEffect(() => {
    if (error) toast.error(error.data.message);
  }, [error]);

  const person = data ?? {};

  const { name, birthday, place_of_birth, profile_path, biography } = person;

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="mb-4">
      <Back backLinkLocationRef={backLinkLocationRef.current} />
      <div className="row">
        <div className="col-4">
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w300/${profile_path}`
                : noPoster
            }
            className="card-img-top"
            alt={name}
          />
        </div>
        <div className="col-8">
          <h1>{name}</h1>
          <p>
            <b>Birthday:</b> {birthday}{' '}
          </p>
          <p>
            <b>Place of birth:</b> {place_of_birth}{' '}
          </p>
          <h3>Biography</h3>
          <p>{biography}</p>
          {/* <h3>Genres</h3>
          <div>
            {genres &&
              genres.map(({ id, name }) => {
                return <span key={id}>{name} </span>;
              })}
          </div> */}
        </div>
      </div>

      <h2 className="mt-3 mb-3">Additional Information</h2>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="cast">
            Cast
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default PersonDetailsPage;
