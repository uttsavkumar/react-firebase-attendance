// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getDatabase} from 'firebase/database';
import {getStorage} from 'firebase/storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBj6eY-qTq_9OKrOStqbuKee1bs2WWHIyQ",
  authDomain: "attendance-2bd30.firebaseapp.com",
  projectId: "attendance-2bd30",
  storageBucket: "attendance-2bd30.appspot.com",
  messagingSenderId: "109813410056",
  appId: "1:109813410056:web:19c4409c3d11e7e64a64bd"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const storage = getStorage(app)
const db = getDatabase(app)

export{
    auth,db,storage
}