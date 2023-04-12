
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getStorage} from 'firebase/storage';
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  
  apiKey: "AIzaSyCWlux9msRAg7h7L9bSkmCJqRfwjBin6DM",
  authDomain: "placid-5ff78.firebaseapp.com",
  projectId: "placid-5ff78",
  storageBucket: "placid-5ff78.appspot.com",
  messagingSenderId: "261360857245",
  appId: "1:261360857245:web:266d6b5beb65bbdb70e474",
  
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const storage = getStorage();
export const db = getFirestore();

