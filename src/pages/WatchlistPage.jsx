import { Gallery } from 'components/Gallery/Gallery';
// import { Loader } from 'components/Loader/Loader';
import React from 'react';
import { useSelector } from 'react-redux';

const WatchlistPage = () => {
  const movies = useSelector(state => state.watchlist.movies);

  //   // Виводимо помилку
  //   useEffect(() => {
  //     if (error) toast.error(error.data.message);
  //   }, [error]);

  return (
    <div>
      <h1>Watchlist</h1>
      {/* {isLoading && <Loader />} */}
      {movies.length !== 0 && <Gallery movies={movies} />}
    </div>
  );
};

export default WatchlistPage;
