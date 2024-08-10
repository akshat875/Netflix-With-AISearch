import React, { useState, useRef } from 'react';
import Header from './Header';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { BG_URL } from '../utils/constants';
import '../style.css';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);

    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = (e) => {
        e.preventDefault(); // Prevent default form submission

        const emailValue = email.current?.value || '';
        const passwordValue = password.current?.value || '';
        const nameValue = name.current?.value || '';

        if (!isSignInForm) {
            // Sign up logic
            createUserWithEmailAndPassword(auth, emailValue, passwordValue)
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: nameValue, photoURL: "https://wallpapers.com/images/hd/netflix-profile-pictures-1000-x-1000-qo9h82134t9nv0j0.jpg"
                    }).then(() => {
                    }).catch((error) => {
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
       <> <div className='relative min-h-screen flex flex-col items-center md:-mt-20'>
            <Header />

            <div className='absolute inset-0 '>
                <img className='object-cover w-full h-full' src={BG_URL} alt="background" />
            </div>

            <form className='absolute inset-x-0 top-1/4 mx-auto p-8 bg-black text-white rounded-lg bg-opacity-80 
                            min-w-[300px] sm:w-5/12 md:w-4/12 lg:w-3/12 xl:w-2/12'>
                <h1 className='font-bold text-2xl sm:text-3xl py-2'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
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
                    onClick={handleButtonClick} 
                >
                    {isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p className='py-4 hover:cursor-pointer' onClick={toggleSignInForm}>
                    {isSignInForm ? "New to Netflix? Sign Up Now" : "Already Registered! Sign In Now"}
                </p>
            </form>
        </div>

        <div
            className="fixed bottom-0 inset-x-0 text-white text-center h-20 flex items-center justify-center overflow-hidden"
            style={{
                background: 'linear-gradient(45deg, #00f, #ff0, #f0f)',
                backgroundSize: '400% 400%',
                animation: 'gradientAnimation 10s ease infinite'
            }}
        >
            <p className="text-lg font-bold z-10">
                Thanks for coming here for movie recommendations according to your taste
            </p>
        </div>
        </>
        
    )
}

export default Login;
