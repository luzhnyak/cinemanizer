import { Loader } from 'components/Loader/Loader';
import React from 'react';
import { useParams } from 'react-router-dom';
import { useFetchMovieVideosByIdQuery } from 'redux/api';
import ReactPlayer from 'react-player';

const Videos = () => {
  const { movieId } = useParams();

  const { data, isLoading, error } = useFetchMovieVideosByIdQuery(movieId, {
    skip: !movieId,
  });

  console.log(data);

  const videos = data?.results ?? [];

  if (isLoading) {
    return <Loader />;
  }

  // Render a YouTube video player

  return (
    <div>
      <h3 className="mt-3 mb-3">Videos</h3>
      <div className="row g-2">
        {videos.map(video => {
          return (
            <ReactPlayer url={`https://www.youtube.com/watch?v=${video.key}`} />
          );
        })}
      </div>
    </div>
  );
};

export default Videos;
