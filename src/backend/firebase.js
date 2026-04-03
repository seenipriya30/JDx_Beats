// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw172DndAns7KKBhBPa0AOG_RjsyO9ZAA",
  authDomain: "jdx-beats.firebaseapp.com",
  projectId: "jdx-beats",
  storageBucket: "jdx-beats.firebasestorage.app",
  messagingSenderId: "519800920602",
  appId: "1:519800920602:web:4fd6b2472aed3a4ed68fa3",
  measurementId: "G-1LCKVEBPKZ"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

export let __AUTH = getAuth(firebaseApp)
export let __DB = getFirestore(firebaseApp);