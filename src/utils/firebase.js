// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCx12LXwHyKk9j-odu9JwiHCOQ4GYjTspQ",
  authDomain: "netflixgpt-34c3a.firebaseapp.com",
  projectId: "netflixgpt-34c3a",
  storageBucket: "netflixgpt-34c3a.appspot.com",
  messagingSenderId: "278893670140",
  appId: "1:278893670140:web:f901803376d866d8053179",
  measurementId: "G-VBM5PDS9P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


export const auth = getAuth(app);