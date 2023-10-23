import { useState, useEffect, Suspense, useRef } from 'react';
import { Outlet, useParams, NavLink, useLocation } from 'react-router-dom';

import { fetchMovieById } from 'services/movie-api';
import { Back } from 'components/Back/Back';
import { Loader } from 'components/Loader/Loader';

import noPoster from '../../images/no-poster.jpg';

const MovieDetails = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  useEffect(() => {
    async function getMovie() {
      try {
        setLoading(true);
        const searchMovie = await fetchMovieById(movieId);
        setMovie(searchMovie);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.error('Something went wrong. Try again.');
        }
      } finally {
        setLoading(false);
      }
    }

    getMovie();
  }, [movieId]);

  const { title, poster_path, vote_average, overview, genres } = movie;

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="mb-4">
      <Back backLinkLocationRef={backLinkLocationRef.current} />
      <div className="row">
        <div className="col-4">
          <img
            src={
              poster_path
                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                : noPoster
            }
            className="card-img-top"
            alt={title}
          />
        </div>
        <div className="col-8">
          <h1>{movie.title}</h1>
          <p>User Score: {Math.round(vote_average * 10)} %</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <div>
            {genres &&
              genres.map(({ id, name }) => {
                return <span key={id}>{name} </span>;
              })}
          </div>
        </div>
      </div>

      <h2 className="mt-3 mb-3">Additional Information</h2>

      <ul className="nav nav-tabs">
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="cast">
            Cast
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="reviews">
            Reviews
          </NavLink>
        </li>
      </ul>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
