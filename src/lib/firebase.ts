// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";

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
let app;
if (!getApps().length) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

export { app };
