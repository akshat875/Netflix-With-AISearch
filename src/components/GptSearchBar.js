import React, { useRef, useState } from 'react';
import lang from '../utils/languageConstants';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { API_OPTIONS, OPENAI_KEY } from '../utils/constants';
import { addGptMovieResult } from '../utils/gptSlice';

const GptSearchBar = () => {
    const dispatch = useDispatch();
    const langKey = useSelector(store => store.config.lang);
    const searchText = useRef(null);
    const [loading, setLoading] = useState(false);

    const searchMovieOnTMDB = async (movie) => {
        const response = await fetch('https://api.themoviedb.org/3/search/movie?query=' + movie + '&include_adult=false&language=en-US&page=1', API_OPTIONS);
        const data = await response.json();
        return data.results;
    };

    const handleGptSearchClick = async () => {
        setLoading(true);
        const genAI = new GoogleGenerativeAI(OPENAI_KEY);
        const query = searchText.current.value;
        console.log(query);

        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const prompt = `Act as a movie recommendation system and suggest some movies for the query: ${query}. Only give me names of 10 movies, comma-separated like the example result given ahead. Example result: Gadar, Sholey, Don`;

        try {
            const gptResults = await model.generateContent(prompt);
            const response = await gptResults.response;
            const text = await response.text(); 

            const moviesArray = text.split(',').map(movie => movie.trim()).filter(movie => movie.length > 0);
            console.log(moviesArray);

            const tmdbResults = await Promise.all(moviesArray.map(movie => searchMovieOnTMDB(movie)));
            console.log(tmdbResults);

            dispatch(addGptMovieResult({
                movieNames: moviesArray, 
                movieResults: tmdbResults 
            }));
        } catch (error) {
            console.error('Error generating content:', error);
        } finally {
            setLoading(false);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        handleGptSearchClick();
    }

    return (
        <div className=' px-4 sm:px-8 py-4 flex justify-center items-center min-h-screen bg-gradient-to-b from-black md:-mt-24 -mt-80'>
            <form className=' flex items-center border border-gray-700 rounded-full w-full max-w-2xl mx-4 sm:mx-0 ' onSubmit={handleSubmit}>
                <input 
                    ref={searchText}
                    type="text" 
                    className='px-4 py-2 flex-grow text-white bg-black placeholder-white rounded-l-full focus:outline-none' 
                    placeholder={lang[langKey].gptSearchPlaceHolder}
                />
                <button 
                    type="submit" 
                    className='text-white bg-red-700 rounded-r-full px-4 py-2 hover:bg-red-600 focus:outline-none'
                    disabled={loading}
                >
                    {loading ? '🔄 Loading...' : `🔍 ${lang[langKey].search}`}
                </button>
            </form>
        </div>
    );
}

export default GptSearchBar;
