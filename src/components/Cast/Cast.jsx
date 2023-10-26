import { CardActor } from 'components/Card/CardActor';
import { Loader } from 'components/Loader/Loader';
import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import { useFetchMovieCreditsByIdQuery } from 'redux/api';

const Cast = () => {
  const { movieId } = useParams();

  const { data, isLoading, error } = useFetchMovieCreditsByIdQuery(movieId, {
    skip: !movieId,
  });

  // Виводимо помилку
  useEffect(() => {
    if (error) toast.error(error.data.message);
  }, [error]);

  const credits = data?.cast ?? {};

  if (isLoading) {
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
