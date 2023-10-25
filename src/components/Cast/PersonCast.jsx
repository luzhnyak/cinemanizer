import { Card } from 'components/Card/Card';
import { Loader } from 'components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { useFetchCombinedCreditsByIdQuery } from 'redux/api';

const PersonCast = () => {
  const { personId } = useParams();

  const { data, isLoading, error } = useFetchCombinedCreditsByIdQuery(
    personId,
    {
      skip: !personId,
    }
  );

  console.log(data);

  const credits = data?.cast ?? {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="mt-3 mb-3">Cast</h3>

      <div className="row g-2">
        {credits.map(movie => {
          return <Card key={movie.id} movie={movie} />;
        })}
        {credits.length === 0 && (
          <p>We don't have any actors for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default PersonCast;
