import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

export const createUserDoc = async (user) => {
  if (!user) return;
  const userRef = doc(db, "users", user.uid);
  const snap = await getDoc(userRef);

  if (!snap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      email: user.email,
      fullName: user.displayName ?? "",
      photoURL: user.photoURL ?? "",
      company: "",
      role: "user",
      onboardingComplete: false,
      createdAt: serverTimestamp(),
    });
  }
};

export const getUserDoc = async (uid) => {
  const ref = doc(db, "users", uid);
  const snap = await getDoc(ref);
  return snap.exists() ? snap.data() : null;
};

export const updateUserDoc = async (uid, data) => {
  if (!uid || !data) return;
  const ref = doc(db, "users", uid);
  await setDoc(ref, data, { merge: true });
};
