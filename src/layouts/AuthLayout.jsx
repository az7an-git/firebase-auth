import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Spinner } from "../components/common";

export default function AuthLayout() {
  const { currentUser, userDoc, isLoading } = useAuth();
  const location = useLocation();
  const onSignupSuccessPage = location.pathname === "/signup-success";

  if (isLoading) return <Spinner label="Preparing sign in..." />;

  // Allow signup-success page to show even if user is logged in
  if (onSignupSuccessPage && currentUser) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
        <Outlet />
      </div>
    );
  }

  // If user is logged in and not on signup-success, check onboarding
  if (currentUser) {
    if (userDoc && userDoc.onboardingComplete === false) {
      return <Navigate to="/onboarding" replace />;
    }
    if (userDoc && userDoc.onboardingComplete) {
      return <Navigate to="/dashboard" replace />;
    }
    // If userDoc is not loaded yet, wait
    if (!userDoc) {
      return <Spinner label="Loading your profile..." size="sm" />;
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <Outlet />
    </div>
  );
}
