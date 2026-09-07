import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKHaUNGha1X6aDprQa-RH7nGaeMW_S_yI",
  authDomain: "verbatim-5fe9b.firebaseapp.com",
  projectId: "verbatim-5fe9b",
  storageBucket: "verbatim-5fe9b.firebasestorage.app",
  messagingSenderId: "1088594976030",
  appId: "1:1088594976030:web:eeeb41ce94495b1df7fd0f",
  measurementId: "G-3CH1Q680P6"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
