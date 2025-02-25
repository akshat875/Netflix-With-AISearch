import { useDispatch, useSelector } from "react-redux";
import { addTrailerVideo } from "../utils/moviesSlice";
import { useEffect } from "react";
import { API_OPTIONS } from "../utils/constants";

const useMovieTrailer = (movieId) => {

    const dispatch = useDispatch();
    
    const trailerVideo = useSelector((store)=> store.movies.trailerVideo);
    
   
  //fetch movie trailer video && updating the movie store

  const getMoviesVideos = async () => {
    const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`, API_OPTIONS);

    const json = await data.json();
    
    
    const filterData = json.results?.filter((video) => video.type === "Trailer");
    const trailer = filterData.length ? filterData[1] : json.results[0]; 
    
    dispatch(addTrailerVideo(trailer));

  };
  useEffect(()=>{
    getMoviesVideos();

  },[]);


}

export default useMovieTrailer;