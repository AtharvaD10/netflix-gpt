import {React, useEffect} from 'react'
import { auth } from '../utils/firebase'
import { signOut, onAuthStateChanged } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addUser, removeUser } from '../utils/userSlice'

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
    
    <div className='absolute px-8 py-2 bg-gradient-to-b from-black  z-10 
        w-screen flex justify-between'>
        <img
        className='w-44 ml-6 mt-5 bg-gradient-to-b from-black'
         src='https://assets.nflxext.com/en_us/layout/ecweb/common/logo-shadow2x.png'
        alt='netfilxlogo' />
        
          
          <div className='flex p-2'>
            <img className='w-12 h-12'
             src='https://occ-0-2890-2186.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABTZ2zlLdBVC05fsd2YQAR43J6vB1NAUBOOrxt7oaFATxMhtdzlNZ846H3D8TZzooe2-FT853YVYs8p001KVFYopWi4D4NXM.png?r=229'
              alt='usericon' />
            <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)
         </button>     
          </div> 
         
          
     </div>
  );
};


export default Header