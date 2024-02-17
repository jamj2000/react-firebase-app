import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyDPBSmcqPhFRGucE32MfUHsfVViHLWGEGA",
  authDomain: "peliculas-dcaf4.firebaseapp.com",
  projectId: "peliculas-dcaf4",
  storageBucket: "peliculas-dcaf4.appspot.com",
  messagingSenderId: "627389868124",
  appId: "1:627389868124:web:bae0891bffab5febfc1e99"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

