import { CardReview } from 'components/Card/CardReview';
import { Loader } from 'components/Loader/Loader';
import { useParams } from 'react-router-dom';
import { useFetchMovieReviewsByIdQuery } from 'redux/api';

const Reviews = () => {
  const { movieId } = useParams();

  const { data, isLoading, error } = useFetchMovieReviewsByIdQuery(movieId, {
    skip: !movieId,
  });

  console.log(data);

  const reviews = data?.results ?? {};

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <h3 className="mt-3 mb-3">Reviews</h3>

      <div className="row g-2">
        {reviews.map(review => {
          return <CardReview review={review} key={review.id} />;
        })}
        {reviews.length === 0 && (
          <p>We don't have any reviews for this movie.</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;
