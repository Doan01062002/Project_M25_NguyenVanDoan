// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAtJscsd1bwCkTXyPgW_YhiqJAeaU5VgXI",
  authDomain: "projectm25-63aa5.firebaseapp.com",
  projectId: "projectm25-63aa5",
  storageBucket: "projectm25-63aa5.appspot.com",
  messagingSenderId: "306293141934",
  appId: "1:306293141934:web:24d9c54020047cfca9d83f",
  measurementId: "G-SX33B2MXXS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
