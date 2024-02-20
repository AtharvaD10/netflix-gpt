import Header from './Header'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer'
import useNowPlayingMovies from '../hooks/useNowPlayingMovies';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import { useSelector } from 'react-redux';

import GptPage from './GptPage';

const Browse = () => {
    
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch);

  useNowPlayingMovies();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div>    
    <Header/>
    {
      showGptSearch ?( <GptPage/>) :
       (<>
                      <MainContainer/>
                  <SecondaryContainer/>
      </>
       )
    }
    </div>
  )
}

export default Browse