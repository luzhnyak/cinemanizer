import { Suspense, useEffect, useRef } from 'react';
import { Outlet, useParams, NavLink, useLocation } from 'react-router-dom';

import { Back } from 'components/Back/Back';
import { Loader } from 'components/Loader/Loader';

import noPoster from '../images/no-poster.jpg';
import { useFetchMovieByIdQuery } from 'redux/api';
import toast from 'react-hot-toast';
import { Button } from 'react-bootstrap';

import { getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { app } from '../firebase-api';
import { useDispatch, useSelector } from 'react-redux';
import { addMovie, deleteMovie } from 'redux/watchlistSlice';

function writeUserData(movies) {
  const db = getDatabase();
  const auth = getAuth(app);
  const userId = auth?.currentUser?.uid;
  // console.log('add start', userId);

  set(ref(db, 'users/' + userId), {
    movies: movies,
  });
  // console.log('add end');
}

const MovieDetails = () => {
  const dispatch = useDispatch();
  const { movieId } = useParams();
  const location = useLocation();

  const backLinkLocationRef = useRef(location.state?.from ?? '/movies');

  const { data, isLoading, error } = useFetchMovieByIdQuery(movieId, {
    skip: !movieId,
  });
  const movie = data ?? {};

  const { movies } = useSelector(state => state.watchlist);

  // console.log('watchlist', movies);

  const isWatchlist = movies?.some(m => m.id === movie.id);

  // console.log('isWatchlist', isWatchlist);

  // Виводимо помилку
  useEffect(() => {
    if (error) toast.error(error.data.message);
  }, [error]);

  useEffect(() => {
    if (movies) {
      writeUserData(movies);
    }
  }, [movies]);

  const { title, poster_path, vote_average, overview, genres, release_date } =
    movie;

  const handleAddToWatchlist = () => {
    if (isWatchlist) {
      dispatch(deleteMovie(movie.id));
    } else {
      dispatch(addMovie(movie));
    }
    // readUserData();
  };

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
              poster_path
                ? `https://image.tmdb.org/t/p/w300/${poster_path}`
                : noPoster
            }
            className="card-img-top"
            alt={title}
          />
          <Button className="mt-3" onClick={handleAddToWatchlist}>
            {isWatchlist ? 'Remove from watchlist' : 'Add to watchlist'}
          </Button>
        </div>
        <div className="col-8">
          <h1>{title}</h1>
          <p>
            <b>User Score:</b> {Math.round(vote_average * 10)} %
          </p>
          <p>
            <b>Release date:</b> {release_date}
          </p>

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
        <li className="nav-item">
          <NavLink className="nav-link" aria-current="page" to="videos">
            Videos
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
