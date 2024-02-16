import { initializeApp } from "firebase/app";
//import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAkEBq6hkRiF7Giu6UJTPCihrBK0QeG46E",
  authDomain: "proyecto-f21b6.firebaseapp.com",
  projectId: "proyecto-f21b6",
  storageBucket: "proyecto-f21b6.appspot.com",
  messagingSenderId: "142019119422",
  appId: "1:142019119422:web:d15fb66a92636a29ad046f",
  measurementId: "G-P5WLPBG40L"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);

