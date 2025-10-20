// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMokCgbfN7ZNSVGj5vdYSXdpTMuonfos0",
  authDomain: "stylish-marble-art.firebaseapp.com",
  projectId: "stylish-marble-art",
  storageBucket: "stylish-marble-art.appspot.com",
  messagingSenderId: "1044158988455",
  appId: "1:1044158988455:web:9d83eb945cd9fbd46b9b82"
};

// Initialize Firebase
function getFirebaseApp(): FirebaseApp {
    return !getApps().length ? initializeApp(firebaseConfig) : getApp();
}

const app = getFirebaseApp();

export { app };
