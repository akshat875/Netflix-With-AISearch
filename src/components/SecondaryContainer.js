import React from 'react'
import MovieList from './MovieList';
import { useSelector } from 'react-redux';

const SecondaryContainer = () => {
  const movies = useSelector((store)=> store.movies); 
  return (
    movies.nowPlayingMovies && (
    <div className=' bg-black w-full '>
      <div className='sm:mt-0 md:-mt-52 pl-6 relative z-20'>
      <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/>
      <MovieList title={"Popular"} movies={movies.PopularMovies}/>
      <MovieList title={"Top Rated"} movies={movies.TopRatedMovies}/>
      <MovieList title={"Upcoming"} movies={movies.UpcomingMovies}/>
      {/* <MovieList title={"Now Playing"} movies={movies.nowPlayingMovies}/> */}
      <MovieList title={"Past Top Rated"} movies={movies.PopularMovies}/>
      </div>
    </div>
    )
  );
};

export default SecondaryContainer;