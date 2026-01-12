import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, signInWithGoogle } from "../utils/auth.utils";
import { getUserDoc } from "../utils/user.utils";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/toast";
import {
  Input,
  Button,
  Alert,
  AuthCard,
  AuthFooterLink,
} from "../components/auth/index";

export function Signup() {
  const { refreshUserDoc } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSignup(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setIsLoading(true);
      const credential = await signup(email, password);
      // Wait for userDoc to be created and loaded
      await refreshUserDoc(credential.user.uid);
      const profile = await getUserDoc(credential.user.uid);

      showToast.success("Account created successfully!");
      // Redirect based on onboarding status
      if (!profile || !profile.onboardingComplete) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/signup-success", { replace: true });
      }
    } catch (err) {
      const errorMsg = err.message || "Failed to create account";
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGoogleSignup() {
    try {
      setError("");
      setIsLoading(true);
      const credential = await signInWithGoogle();
      // Wait for userDoc to be created and loaded
      await refreshUserDoc(credential.user.uid);
      const profile = await getUserDoc(credential.user.uid);

      showToast.success("Signed up with Google successfully!");
      // Redirect based on onboarding status
      if (!profile || !profile.onboardingComplete) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/signup-success", { replace: true });
      }
    } catch (err) {
      const errorMsg = err.message || "Google sign-in failed";
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <AuthCard
      title="Sign Up"
      footer={
        <AuthFooterLink
          text="Already have an account?"
          linkText="Sign in"
          to="/login"
        />
      }
    >
      <Alert type="error" message={error} />

      <form onSubmit={handleSignup} className="space-y-4">
        <Input
          type="email"
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          required
        />
        <Input
          type="password"
          label="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          required
        />
        <Input
          type="password"
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          required
        />
        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={isLoading}
          className="w-full"
        >
          {isLoading ? "Creating account..." : "Sign Up"}
        </Button>
      </form>

      <div className="flex items-center my-4 text-gray-400 text-sm">
        <span className="flex-1 border-t"></span>
        <span className="px-2">or</span>
        <span className="flex-1 border-t"></span>
      </div>

      <Button
        type="button"
        variant="outline"
        size="md"
        onClick={handleGoogleSignup}
        disabled={isLoading}
        className="w-full flex items-center justify-center gap-2"
      >
        {isLoading ? "Signing in..." : "Sign up with Google"}
      </Button>
    </AuthCard>
  );
}
