import { useSearchParams } from 'react-router-dom';

import { Pagination } from 'components/Pagination/Pagination';
import { Loader } from 'components/Loader/Loader';
import { Gallery } from 'components/Gallery/Gallery';
import { useFetchMoviesQuery } from 'redux/api';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query');
  const page = searchParams.get('page') ?? 1;

  const { data, isLoading, error } = useFetchMoviesQuery(
    { query, page },
    {
      skip: !query,
    }
  );

  const movies = data?.results ?? [];
  const totalPages = data?.total_pages ?? 0;

  const handleSubmit = event => {
    event.preventDefault();
    const form = event.currentTarget;
    setSearchParams({ query: form.elements.query.value, page: 1 });
    form.reset();
  };

  return (
    <div>
      <form className="d-flex mb-3" role="search" onSubmit={handleSubmit}>
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          name="query"
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
      {isLoading && <Loader />}
      {movies.length === 0 && query && (
        <p>Sorry. We can't find movies matching your query "{query}".</p>
      )}

      {movies.length !== 0 && <Gallery movies={movies} />}
      {totalPages > 1 && (
        <Pagination totalPage={totalPages} page={page} query={query} />
      )}
    </div>
  );
};

export default Movies;
