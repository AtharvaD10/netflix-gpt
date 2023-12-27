// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAuwZ2j6FvOYMGGB2qlXj8sPhZxNeTWZco",
  authDomain: "netflix-gpt-32f73.firebaseapp.com",
  projectId: "netflix-gpt-32f73",
  storageBucket: "netflix-gpt-32f73.appspot.com",
  messagingSenderId: "497946624107",
  appId: "1:497946624107:web:dbf866c55800996984b12e",
  measurementId: "G-BHMN7YZE4M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();