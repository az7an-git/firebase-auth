import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup, logout, signInWithGoogle } from "../services/authService";
import {
  Input,
  Button,
  Alert,
  AuthCard,
  AuthFooterLink,
} from "../components/auth/index";

export function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (password !== confirmPassword) {
      return setError("Passwords do not match");
    }

    try {
      setError("");
      setisLoading(true);
      await signup(email, password);
      await logout();
      navigate("/signup-success");
    } catch (err) {
      setError("Failed to create account: " + err.message);
    } finally {
      setisLoading(false);
    }
  }

  // google handler
  async function handleGoogleSignup() {
    try {
      setError("");
      setisLoading(true);
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (err) {
      setError("Google sign-in failed: " + err.message);
    } finally {
      setisLoading(false);
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

      <form onSubmit={handleSubmit} className="space-y-4">
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

export default Signup;

//         <p className="mt-4 text-center text-sm text-gray-600">
//           Already have an account?{" "}
//           <Link
//             to="/login"
//             className="text-indigo-600 hover:text-indigo-800 font-medium"
//           >
//             Sign in
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// }
