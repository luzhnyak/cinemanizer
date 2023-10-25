import { Loader } from 'components/Loader/Loader';
import { Gallery } from 'components/Gallery/Gallery';
import { useFetchTopMoviesQuery } from 'redux/api';

const Home = () => {
  const { data, isLoading, error } = useFetchTopMoviesQuery();

  const movies = data?.results ?? [];

  return (
    <div>
      {isLoading && <Loader />}
      {movies.length !== 0 && <Gallery movies={movies} />}
    </div>
  );
};

export default Home;
