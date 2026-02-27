// src/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB5lzrpJK2_gGNrja0xGaOaga_-cYKkFiI",
  authDomain: "save-the-serve.firebaseapp.com",
  projectId: "save-the-serve",
  storageBucket: "save-the-serve.appspot.com",
  messagingSenderId: "662344227931",
  appId: "1:662344227931:web:2f8af196fb3c0b48fbf37e",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);