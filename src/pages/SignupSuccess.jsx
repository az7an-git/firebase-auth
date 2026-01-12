import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/auth/index";

export function SignupSuccess() {
  const navigate = useNavigate();
  const { userDoc } = useAuth();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Account Created Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Your account has been created. {userDoc?.onboardingComplete ? "You're all set!" : "Let's complete your profile."}
        </p>
        <div className="space-y-2">
          {!userDoc?.onboardingComplete && (
            <Button
              onClick={() => navigate("/onboarding")}
              variant="primary"
              size="md"
              className="w-full"
            >
              Start onboarding
            </Button>
          )}
          <Button
            onClick={() => navigate("/dashboard")}
            variant={userDoc?.onboardingComplete ? "primary" : "outline"}
            size="md"
            className="w-full"
          >
            {userDoc?.onboardingComplete ? "Go to Dashboard" : "Skip for now"}
          </Button>
        </div>
      </div>
    </div>
  );
}
