import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "../firebase/firebase";
import { createUserDoc } from "./userServices";

const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });

export const signup = async (email, password) => {
  const res = await createUserWithEmailAndPassword(auth, email, password);
  await createUserDoc(res.user);
  return res;
};

export const signInWithGoogle = async () => {
  const res = await signInWithPopup(auth, googleProvider);
  await createUserDoc(res.user);
  return res;
};

export const login = (email, password) =>
  signInWithEmailAndPassword(auth, email, password);

export const logout = () => signOut(auth);
