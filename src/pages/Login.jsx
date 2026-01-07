import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/authService";
import {
  AuthCard,
  AuthFooterLink,
  Input,
  Alert,
  Button,
} from "../components/auth/index";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Failed to sign in: " + err.message);
    } finally {
      setLoading(false);
    }
  }

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
      <Alert type="error" message={error} />

      <form onSubmit={handleSubmit} className="space-y-4">
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
    </AuthCard>
  );
}
