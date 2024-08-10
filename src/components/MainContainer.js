import React from 'react';
import { useSelector } from 'react-redux';
import VideoTitle from './VideoTitle';
import VideoBackground from './VideoBackground';

const MainContainer = () => {
 
  const movies = useSelector((store) => store.movies?.nowPlayingMovies);
  
 
  if (!movies || movies.length === 0) return <div>No movies available</div>;

  
  const mainMovie = movies[0];

  
  if (!mainMovie || !mainMovie.original_title || !mainMovie.id) {
    return <div>Error: Movie data is not available</div>;
  }

  // Destructure properties with fallback values
  const { original_title = 'No Title Available', overview = 'No Overview Available', id } = mainMovie;

  return (
    <div className='pt-[50%] md:pt-0 sm:w-fit bg-black'>
      <VideoTitle title={original_title} overview={overview} />
      <VideoBackground movieId={id} />
    </div>
  );
};

export default MainContainer;
