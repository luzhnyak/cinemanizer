import { CardActor } from 'components/Card/CardActor';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCreditsById } from 'services/movie-api';

const Cast = () => {
  const [credits, setCredits] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getCreditsMovie() {
      try {
        setLoading(true);
        const _credits = await fetchMovieCreditsById(movieId);
        setCredits(_credits.cast);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.error('Something went wrong. Try again.');
        }
      } finally {
        setLoading(false);
      }
    }

    getCreditsMovie();
  }, [movieId]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="mt-3 mb-3">Cast</h3>

      <div className="row g-2">
        {credits.map(actor => {
          return <CardActor actor={actor} key={actor.cast_id} />;
        })}
        {credits.length === 0 && (
          <p>We don't have any actors for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default Cast;
