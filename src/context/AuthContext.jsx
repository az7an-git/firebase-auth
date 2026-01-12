/* eslint-disable react-refresh/only-export-components */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { getUserDoc } from "../utils/userServices";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [userDoc, setUserDoc] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const refreshUserDoc = useCallback(
    async (uid) => {
      const targetUid = uid ?? currentUser?.uid;
      if (!targetUid) return null;
      try {
        const doc = await getUserDoc(targetUid);
        setUserDoc(doc);
        return doc;
      } catch (error) {
        console.error("Failed to refresh user profile:", error);
        return null;
      }
    },
    [currentUser]
  );

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      setIsLoading(true);
      if (!user) {
        setCurrentUser(null);
        setUserDoc(null);
        setIsLoading(false);
        return;
      }
      setCurrentUser(user);
      try {
        const doc = await getUserDoc(user.uid);
        setUserDoc(doc);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        setUserDoc(null);
      } finally {
        setIsLoading(false);
      }
    });

    return unsub;
  }, []);

  const value = {
    currentUser,
    userDoc,
    isLoading,
    refreshUserDoc,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);
