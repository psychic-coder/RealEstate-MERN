// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-bfa63.firebaseapp.com",
  projectId: "mern-estate-bfa63",
  storageBucket: "mern-estate-bfa63.appspot.com",
  messagingSenderId: "588570660467",
  appId: "1:588570660467:web:064d4f039fd18ae01c6406"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);