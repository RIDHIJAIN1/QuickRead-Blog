// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  
    apiKey: "AIzaSyBb6hm8fqXhv_02ZahKroEKv5Vund5jwh8",
    authDomain: "blog-267d8.firebaseapp.com",
    projectId: "blog-267d8",
    storageBucket: "blog-267d8.appspot.com",
    messagingSenderId: "744557192300",
    appId: "1:744557192300:web:3bef899b7270d60704a449",
    measurementId: "G-SYEV4RV8N7"
  
};

// Initialize Firebase
initializeApp(firebaseConfig);

export const db = getFirestore();
