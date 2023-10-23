import { CardReview } from 'components/Card/CardReview';
import { Loader } from 'components/Loader/Loader';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviewsById } from 'services/movie-api';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    async function getReviewsMovie() {
      try {
        setLoading(true);
        const _reviews = await fetchMovieReviewsById(movieId);
        setReviews(_reviews.results);
      } catch (error) {
        if (error.code !== 'ERR_CANCELED') {
          console.error('Something went wrong. Try again.');
        }
      } finally {
        setLoading(false);
      }
    }

    getReviewsMovie();
  }, [movieId]);
  if (loading) {
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
