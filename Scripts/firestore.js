// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';

import { onSnapshot,getFirestore, updateDoc,query,orderBy, where,collection, getDocs,addDoc,Timestamp,doc,deleteDoc } from 'firebase/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKmvNYXDHuc7-3OF_iBDAE8jISI8X1uv4",
  authDomain: "eastern-hawk-400404.firebaseapp.com",
  projectId: "eastern-hawk-400404",
  storageBucket: "eastern-hawk-400404.appspot.com",
  messagingSenderId: "85545090702",
  appId: "1:85545090702:web:00ae8f0f935f9cdb9d53df"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db=getFirestore(app);
console.log(app);
console.log(db);
export {db,onSnapshot,getFirestore,updateDoc,query,orderBy,where, collection, getDocs,addDoc,Timestamp,doc,deleteDoc};