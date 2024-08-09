import React, { useState, useRef } from 'react';
import Header from './Header';
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { BG_URL } from '../utils/constants';


const Login = () => {
    
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    // console.log(name.current, email.current, name.current);

    const handleButtonClick = (e) => {
        e.preventDefault(); // Prevent default form submission

        // Check if refs are not null
        const emailValue = email.current?.value || '';
        const passwordValue = password.current?.value || '';
        const nameValue = name.current?.value || '';

        // console.log("button click");
        // console.log(email.current.value, "emailcurrent");

       

        // Sign in or signup logic
        if (!isSignInForm) {
            // Sign up logic
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed up
                    const user = userCredential.user;

                    updateProfile(user, {
                      displayName: nameValue, photoURL: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                    }).then(() => {
                      // Profile updated!
                    
                    }).catch((error) => {
                      // An error occurred
                      setErrorMessage(error.message);
                    });


                   
                })
                .catch((error) => {
                  const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(`${errorCode} ${errorMessage}`);
                    
                    
                });
        } else {
            // Sign in logic
            signInWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    
                    
                })
                .catch((error) => {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  setErrorMessage(`${errorCode} ${errorMessage}`);
                    
                });
        }
    }

    const toggleSignInForm = () => {
        setIsSignInForm(!isSignInForm);
    }

    return (
        <div>
            <Header />

            <div className='absolute'>
                <img 
                    src={BG_URL}
                    alt="logo"
                />     
            </div>
            <form className='w-3/12 absolute p-8 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80'>
                <h1 className='font-bold text-3xl py-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm && (
                    <input 
                        ref={name} 
                        type="text" 
                        placeholder="Full Name" 
                        className="p-2 my-4 w-full bg-gray-800" 
                    />
                )}

                <input 
                    ref={email} 
                    type="text" 
                    placeholder="Email Address" 
                    className="p-2 my-4 w-full bg-gray-800" 
                />

                <input 
                    ref={password} 
                    type="password" 
                    placeholder="Password" 
                    className="p-2 my-4 w-full bg-gray-800" 
                />

                  <p className='text-red-600 font-bold'>{errorMessage}</p>

                <button 
                    className='p-2 my-6 bg-red-700 w-full rounded-lg'
                    onClick={handleButtonClick} // Correctly reference the function
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className='py-4 hover:cursor-pointer' onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered! Sign In Now"}
                </p>
            </form>
        </div>
    )
}

export default Login;
