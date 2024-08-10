import React from 'react';
import GptSearchBar from './GptSearchBar';
import GptMovieSuggestions from './GptMovieSuggestions';
import { BG_URL } from '../utils/constants';

const GptSearch = () => {
  return (
    <>
      <div className='fixed inset-0 -z-10'>
        <img 
          className='w-full h-full object-cover' 
          src={BG_URL} 
          alt="background" 
        />
      </div>

      <div className='pt-[30%] md:pt-0'>
        <GptSearchBar />
        <GptMovieSuggestions />
      </div>
    </>
  );
}

export default GptSearch;
