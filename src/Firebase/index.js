// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage"
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAaQHd24hoRyBUZ7SY4sI9Ao-pfSdZ928k",
    authDomain: "my-portfolio-c96e4.firebaseapp.com",
    projectId: "my-portfolio-c96e4",
    storageBucket: "my-portfolio-c96e4.appspot.com",
    messagingSenderId: "726649519746",
    appId: "1:726649519746:web:ef23537df95fe587ab3e9b",
    measurementId: "G-7YNT680CDJ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app)
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
export const storage = getStorage(app)