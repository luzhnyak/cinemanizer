import { Loader } from 'components/Loader/Loader';
import { Gallery } from 'components/Gallery/Gallery';
import { useFetchTopMoviesQuery } from 'redux/api';
import toast from 'react-hot-toast';
import { useEffect } from 'react';

const HomePage = () => {
  const { data, isLoading, error } = useFetchTopMoviesQuery();

  const movies = data?.results ?? [];

  // Виводимо помилку
  useEffect(() => {
    if (error) toast.error(error.data.message);
  }, [error]);

  return (
    <div>
      {isLoading && <Loader />}
      {movies.length !== 0 && <Gallery movies={movies} />}
    </div>
  );
};

export default HomePage;
