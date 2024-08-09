import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
  // Get the list of movies from the Redux store
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  
  // If no movies are available, return null or a loading indicator
  if (!movies || movies.length === 0) return <div>No movies available</div>;

  // Destructure the first movie from the movies array
  const mainMovie = movies[0];

  // Check if mainMovie is valid and has the necessary properties
  if (!mainMovie || !mainMovie.original_title || !mainMovie.id) {
    return <div>Error: Movie data is not available</div>;
  }

  // Destructure properties with fallback values
  const { original_title = 'No Title Available', overview = 'No Overview Available', id } = mainMovie;

  return (
    <div>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
