// src/pages/Login.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login, signInWithGoogle } from "../utils/authServices";
import { getUserDoc } from "../utils/userServices";
import { useAuth } from "../context/AuthContext";
import { showToast } from "../utils/toast";
import {
  AuthCard,
  AuthFooterLink,
  Input,
  Alert,
  Button,
} from "../components/auth/index";

export function Login() {
  const { refreshUserDoc } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // EMAIL/PASSWORD LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const credential = await login(email, password);
      const profile = await getUserDoc(credential.user.uid);
      await refreshUserDoc(credential.user.uid);

      showToast.success("Signed in successfully!");
      // Redirect based on onboarding
      if (!profile || !profile.onboardingComplete) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      const errorMsg = err.message || "Failed to sign in";
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  // GOOGLE LOGIN
  const handleGoogleLogin = async () => {
    try {
      setError("");
      setLoading(true);
      const credential = await signInWithGoogle();
      const profile = await getUserDoc(credential.user.uid);
      await refreshUserDoc(credential.user.uid);

      showToast.success("Signed in with Google successfully!");
      // Redirect based on onboarding
      if (!profile || !profile.onboardingComplete) {
        navigate("/onboarding", { replace: true });
      } else {
        navigate("/dashboard", { replace: true });
      }
    } catch (err) {
      const errorMsg = err.message || "Google sign-in failed";
      setError(errorMsg);
      showToast.error(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthCard
      title="Sign In"
      footer={
        <AuthFooterLink
          text="Don't have an account?"
          linkText="Sign up"
          to="/signup"
        />
      }
    >
      {error && <Alert type="error" message={error} />}

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          type="email"
          label="Email"
          value={email}
          placeholder="Enter your email"
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <Button
          type="submit"
          variant="primary"
          size="md"
          disabled={loading}
          className="w-full"
        >
          {loading ? "Signing in..." : "Sign In"}
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
        onClick={handleGoogleLogin}
        disabled={loading}
        className="w-full flex items-center justify-center gap-2"
      >
        {loading ? "Signing in..." : "Sign in with Google"}
      </Button>
    </AuthCard>
  );
}
