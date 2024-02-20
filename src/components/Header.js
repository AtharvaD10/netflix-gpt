import {React, useEffect} from 'react'
import { auth } from '../utils/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { netflixLogo, userIcon } from '../utils/constants'
import {toggleGptSearchView} from '../utils/gptSlice'

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);
  const handleSignOut = ()=>{
    signOut(auth)
    .then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate('/error')
    });
  };

  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
  if (user) {
    const {uid, email, displayName, photoURL} = user;
    dispatch(addUser(
        {   uid:uid, 
            email: email, 
            displayName: displayName,
            photoURL: photoURL
          })
       );
        navigate('/browse');
    
} else {
            dispatch(removeUser());    
            navigate('/');
  }
    });
},[]);

const handleGptSearchClick = () =>{
    dispatch(toggleGptSearchView());
}

   return (
    
    <div className='fixed w-screen  px-8 py-1 bg-gradient-to-b from-black  z-10 
        flex justify-between'>
        <img
        className='w-36 ml-6 mt-5 '
         src={netflixLogo}
        alt='netfilxlogo' />
        
          {user && (
            <div className='flex p-2'>
            <button className='py-2 px-3 my-1 mx-4 bg-red-600 text-white rounded-lg 
            ' onClick={handleGptSearchClick}>
            GPT Search</button>
              <img className='w-10 h-10'src={userIcon} alt='usericon' />
                 <button onClick={handleSignOut} className='font-bold text-white '>(Sign Out) </button>     
            </div> 
          )}
    </div>
  );
 };


export default Header