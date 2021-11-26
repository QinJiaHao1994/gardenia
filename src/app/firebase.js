import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAokcXqTuzRvnCFiO4QSAu5sOmqPFvFCHE",
  authDomain: "gardenia-98643.firebaseapp.com",
  projectId: "gardenia-98643",
  storageBucket: "gardenia-98643.appspot.com",
  messagingSenderId: "300187231326",
  appId: "1:300187231326:web:3617f372cc922a6e1500cf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);

export { app, storage, db };
