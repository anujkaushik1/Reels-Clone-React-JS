// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth';
import 'firebase/compat/storage';
import 'firebase/compat/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAZdEalj4k0jPycW4vFsv3YSNYELEh-riw",
    authDomain: "reels-clone-dae17.firebaseapp.com",
    projectId: "reels-clone-dae17",
    storageBucket: "reels-clone-dae17.appspot.com",
    messagingSenderId: "532168881541",
    appId: "1:532168881541:web:57e4f798a148c55c4040ec",
    measurementId: "G-H0W2NSNMJ6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

const firestore = firebase.firestore();
export const database = {
  users : firestore.collection('users'),
  posts : firestore.collection('posts'),
  getTimeStamp : firebase.firestore.FieldValue.serverTimestamp
}

export const storage = firebase.storage();