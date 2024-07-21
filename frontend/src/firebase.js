import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import {getFirestore} from "firebase/firestore"

const firebaseConfig = {
    apiKey: "AIzaSyAx9QwLd5CWF3bLN60Fmcn0TLaqRbDLbPI",
    authDomain: "mmgarments-75c29.firebaseapp.com",
    projectId: "mmgarments-75c29",
    storageBucket: "mmgarments-75c29.appspot.com",
    messagingSenderId: "318111478166",
    appId: "1:318111478166:web:5fa0ce720918d1b686adb7",
    measurementId: "G-QMXBSVSDX3"
  };

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage(app);
export const db = getFirestore();