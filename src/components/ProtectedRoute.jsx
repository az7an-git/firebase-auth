import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "./common";

export default function ProtectedRoute({
  children,
  allowedRoles = null,
  requireOnboardingComplete = true,
}) {
  const { currentUser, userDoc, isLoading } = useAuth();

  if (isLoading) return <Spinner label="Checking your session..." />;

  if (!currentUser) return <Navigate to="/login" replace />;

  if (allowedRoles) {
    if (!userDoc) return <Spinner label="Loading your profile..." />;
    if (!allowedRoles.includes(userDoc.role)) {
      return <Navigate to="/dashboard" replace />;
    }
  }

  if (!requireOnboardingComplete && userDoc?.onboardingComplete) {
    return <Navigate to="/dashboard" replace />;
  }

  if (
    requireOnboardingComplete &&
    userDoc &&
    userDoc.onboardingComplete === false
  ) {
    return <Navigate to="/onboarding" replace />;
  }

  return children;
}
