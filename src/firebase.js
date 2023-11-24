import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAy9ihb2cByk0J1zJSPQF80ZECg9Q4m4SE",
  authDomain: "twitterclone-d765b.firebaseapp.com",
  projectId: "twitterclone-d765b",
  storageBucket: "twitterclone-d765b.appspot.com",
  messagingSenderId: "383713385045",
  appId: "1:383713385045:web:72ec3a225dcca2a09012dc"
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
