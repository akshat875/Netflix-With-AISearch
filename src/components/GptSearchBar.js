import React, { useRef } from 'react'
import lang from '../utils/languageConstants';
import { useSelector } from 'react-redux';
import openai from '../utils/openai';

const GptSearchBar = () => {

    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);

    const handleGptSearchClick = async ()=>{
       console.log(searchText.current.value);
       
       // making here API Calls for Movie Results

       const gptQuery = "Act as a movie recomendation sysytem and suggests some movie for the query :"  + searchText.current.value + ". only give me names of 10 movies , coma seperated like the example result given ahed. Example result: Gadar, Sholey , Don";

       const gptResults =  await openai.chat.completions.create({
        messages: [{ role: 'user', content:gptQuery  }],
        model: 'gpt-3.5-turbo',
      }); 

    console.log(gptResults.choices);
    }

  return (
           
           

    <div className='px-8 py-4  flex justify-center items-center min-h-screen -mt-24 bg-gradient-to-b from-black'>
      <form className='flex items-center  border border-gray-700 rounded-full -mt-[10%]' onSubmit={(e)=>e.preventDefault()}>
        <input 
          ref = {searchText}
          type="text" 
          className='px-4 py-2 w-80 text-white bg-black placeholder-white rounded-l-full focus:outline-none ' 
          placeholder={lang[langKey].gptSearchPlaceHolder}
        />
        <button 
          className='text-white bg-red-700 rounded-r-full px-4 py-2 hover:bg-red-600 focus:outline-none'
          onClick={handleGptSearchClick}>
           🔍{lang[langKey].search}
        </button>
      </form>
    </div>
  )
}

export default GptSearchBar;
