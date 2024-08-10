import React from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState, } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, PROFILE, SUPPORTED_LANGUAGES } from '../utils/constants';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const user = useSelector((store)=> store.user);
  const dispatch = useDispatch();
  const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
  

  const handleSignOut = () =>{

    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
      
    });
  }

  useState(()=>{
    
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid, email , displayName , photoURL} = user.uid;
        
        dispatch(addUser({uid: uid, email: email, displayName: displayName, photoURL: photoURL,}));
        navigate("/browse");
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/");
        
      }
    });
    // unsubscribe when component unmounts
    return () => unsubscribe();
  
  }, []);

  const handleGptSearchClick = () => {
    //Toggle GPT Search
    dispatch(toggleGptSearchView());
  }

  const handleLanguageChange = (e) => {

    dispatch(changeLanguage(e.target.value))

  }

  return (
    <div className='absolute w-screen px-10 py-8 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between'>
        <img className='w-44 -mt-7 mx-auto md:mx-0 md:mt-24' src={LOGO}
        alt="logo"
        />
       { user &&( <div className='flex px-16 py-8 pr-2 space-x-1 -mt-24 md:mt-5'>

          {showGptSearch && (<select className='px-2 py-1 mt-16 m-2 bg-gray-900 text-white rounded-full 'onChange={handleLanguageChange}>
            {SUPPORTED_LANGUAGES.map(lang => <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>)}
            
           
          </select>)} 

          <button className='mt-16 h-8 px-3 text-sm bg-purple-950 text-white rounded-full '
          onClick={handleGptSearchClick}
          >{showGptSearch ? "👀 HomePage" : "✨AI Search"}</button>
          <img 
          className='7 w-7 mt-12 rounded-full py-4 '
          alt="user-icon"
          src={PROFILE}/>
          <button onClick={handleSignOut}
          className='font-bold text-white mt-12 '>Sign Out</button>
        </div>
)}
    </div>
  )
}

export default Header;