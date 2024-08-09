import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ title, movies }) => {
  return (
    <>
      <style>
        {`
          .hide-scrollbar::-webkit-scrollbar {
            display: none; /* For Webkit browsers */
          }
          .hide-scrollbar {
            -ms-overflow-style: none; /* For Internet Explorer and Edge */
            scrollbar-width: none; /* For Firefox */
          }
        `}
      </style>
      <div className='p-6'>
        <h1 className='text-xl py-6 text-white'>{title}</h1>
        <div
          style={{ 
            overflowY: 'hidden', 
            whiteSpace: 'nowrap' 
          }}
          className='flex overflow-x-auto hide-scrollbar'
        >
          <div className='flex'>
            {movies?.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MovieList;
