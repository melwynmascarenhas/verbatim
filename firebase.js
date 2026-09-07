import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCw2_NUywaTKJH6ar3xfpQHFJWu0TN2r8o",
  authDomain: "npc-social-media-app.firebaseapp.com",
  projectId: "npc-social-media-app",
  storageBucket: "npc-social-media-app.firebasestorage.app",
  messagingSenderId: "284979995290",
  appId: "1:284979995290:web:ed9efc601f99e44799f523",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { auth, db };
