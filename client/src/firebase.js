import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyDx9h5Sc2NYiRHnziBP64RC6PfxMnHKM90",
  authDomain: "auth-92d9a.firebaseapp.com",
  projectId: "auth-92d9a",
  storageBucket: "auth-92d9a.firebasestorage.app",
  messagingSenderId: "1006629553005",
  appId: "1:1006629553005:web:140f24109aab98f60fd064"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider = new GoogleAuthProvider();

export { auth, provider, signInWithPopup };