import {React, useEffect} from 'react'
import { auth } from '../utils/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'
import { netflixLogo, userIcon } from '../utils/constants'

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

  return (
    
    <div className='fixed px-8 py-2 bg-gradient-to-b from-black  z-10 
        w-screen flex justify-between'>
        <img
        className='w-44 ml-6 mt-5 bg-gradient-to-b from-black'
         src={netflixLogo}
        alt='netfilxlogo' />
        
          
          <div className='flex p-2'>
            <img className='w-12 h-12'
             src={userIcon}
              alt='usericon' />
            <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)
         </button>     
          </div> 
         
          
     </div>
  );
};


export default Header