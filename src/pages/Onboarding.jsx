import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { updateUserDoc } from "../utils/user.utils";
import { showToast } from "../utils/toast";
import { AuthCard, Input, Button, Alert } from "../components/auth/index";

export function Onboarding() {
  const { currentUser, userDoc, refreshUserDoc } = useAuth();
  const [fullName, setFullName] = useState(userDoc?.fullName ?? "");
  const [company, setCompany] = useState(userDoc?.company ?? "");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!currentUser) return;
    try {
      setError("");
      setIsSubmitting(true);
      await updateUserDoc(currentUser.uid, {
        fullName: fullName.trim(),
        company: company.trim(),
        onboardingComplete: true,
      });
      await refreshUserDoc(currentUser.uid);
      showToast.success("Profile completed successfully!");
      navigate("/dashboard", { replace: true });
    } catch (err) {
      const errorMsg = err.message || "Failed to save your details";
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100 p-4">
      <AuthCard title="Complete your profile">
        <p className="text-sm text-gray-600 mb-4">
          We just need a few more details before taking you to your dashboard.
        </p>

        <Alert type="error" message={error} />

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />

          <Input
            label="Company"
            placeholder="Where do you work?"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />

          <Button
            type="submit"
            variant="primary"
            size="md"
            disabled={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Finishing up..." : "Go to dashboard"}
          </Button>
        </form>
      </AuthCard>
    </div>
  );
}
