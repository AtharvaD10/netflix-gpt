import React, { useEffect } from 'react'
import Header from './Header'
import { API_OPTIONS } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addNowPlayingMovies } from '../utils/movieSlice'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer'

const Browse = () => {
  const dispatch = useDispatch();
    const getNoWPlayingMovies = async() =>{
      const data = await fetch('https://api.themoviedb.org/3/movie/now_playing?page=1',
       API_OPTIONS);
       const json = await data.json();

       dispatch(addNowPlayingMovies(json.results));
    };

    useEffect(()=>{
      getNoWPlayingMovies();
    },[]);

  return (
    <div>    
    <Header/>
   <MainContainer/>
   <SecondaryContainer/>
    </div>
  )
}

export default Browse