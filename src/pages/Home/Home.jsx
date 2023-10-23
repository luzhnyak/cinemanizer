import { useState } from 'react';
import { useEffect } from 'react';

import { fetchTopMovies } from 'services/movie-api';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from 'components/Gallery/Gallery';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getMovies() {
      try {
        setLoading(true);
        const topMovies = await fetchTopMovies();
        setMovies(topMovies.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.error('Something went wrong. Try again.');
        }
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, []);

  return (
    <div>
      {loading && <Loader />}
      {movies.length !== 0 && <Gallery movies={movies} />}
    </div>
  );
};

export default Home;
