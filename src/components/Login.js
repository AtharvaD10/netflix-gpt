import React, { useState, useRef } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate'
import { auth } from '../utils/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';



const Login = () => {

    const [isSignInForm, setSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const dispatch = useDispatch();

    const email = useRef(null);
    const password = useRef(null);
    const name = useRef(null);


    const handleButttonClick = () => {
        //valiate form data
        const message = checkValidateData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;
        //signUp logic
        if (!isSignInForm) {
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;

                    updateProfile(user, {
                        displayName: name.current.value,
                         photoURL: "https://media.licdn.com/media/AAYQAQSOAAgAAQAAAAAAAB-zrMZEDXI2T62PSuT6kpB6qg.png"
                      }).then(() => {
                        // Profile updated!
                        const {uid, email, displayName, photoURL} = auth.currentUser;
                        dispatch(
                            addUser({
                                    uid:uid,
                                    email:email,
                                    displayName:displayName,
                                    photoURL:photoURL,
                            })
                        );
                        
                      }).catch((error) => {
                        // An error occurred
                        // ...
                        setErrorMessage(errorMessage);
                      });

                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        } else {
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "-" + errorMessage)
                });
        }
    };

    const toggleSignInForm = () => {
        setSignInForm(!isSignInForm);
    };


    return (
        <>
            <Header/>
            
            <div className='absolute'>
                <img src='https://assets.nflxext.com/ffe/siteui/vlv3/ca6a7616-0acb-4bc5-be25-c4deef0419a7/c5af601a-6657-4531-8f82-22e629a3795e/IN-en-20231211-popsignuptwoweeks-perspective_alpha_website_medium.jpg'
                    alt='backgroundlogo' />
            </div>
            <form onSubmit={(e) => e.preventDefault()}
                className=' absolute p-12 bg-black w-3/12 my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>

                {!isSignInForm && (
                    <input
                        ref={name}
                        type='text' placeholder='Full Name'
                        className='p-4 my-2 w-full bg-gray-700' />
                )}
                <input
                    ref={email}
                    type='text' placeholder='Email Address'
                    className='p-4 my-2 w-full bg-gray-700' />

                <input
                    ref={password}
                    type='password'
                    placeholder='Password'
                    className='p-4 my-2 w-full bg-gray-700' />

                <button className='py-4 my-2 bg-red-700 w-full rounded-lg ' onClick={handleButttonClick}>
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>

                <p className='text-red-600 font-bold text-base py-1'>
                    {errorMessage}
                </p>

                <p className='py-4  cursor-pointer' onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Already registered? Sign In Now"}  </p>
            </form>
        </>
    )
}

export default Login