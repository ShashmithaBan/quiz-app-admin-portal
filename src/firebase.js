import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, setLogLevel } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyBS5txntQfjjbXHbI1XSVidQnFRplikbmE",
  authDomain: "quiz-61741.firebaseapp.com",
  databaseURL: "https://quiz-61741-default-rtdb.europe-west1.firebasedatabase.app/",
  projectId: "quiz-61741",
  storageBucket: "quiz-61741.firebasestorage.app",
  messagingSenderId: "674694245638",
  appId: "1:674694245638:web:c0a1f4291ba2dc6d420287",
  measurementId: "G-ZJZNQVJFEX"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app); 
const auth = getAuth(app);  




export { db, auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };