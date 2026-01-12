import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHPiGxTrPVi9BK4HE9vJ_gNUHwxttmu7Y",
  authDomain: "react-firebase-app-bbf62.firebaseapp.com",
  projectId: "react-firebase-app-bbf62",
  storageBucket: "react-firebase-app-bbf62.appspot.com",
  messagingSenderId: "4643476748",
  appId: "1:4643476748:web:fa3053cdee44212b4ba529",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
