import { useNavigate } from "react-router-dom";
import { Button } from "../components/auth/index";

export function SignupSuccess() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Account Created Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Your account has been created. You can now sign in now with your
          credentials.
        </p>
        <Button
          onClick={() => navigate("/login")}
          variant="primary"
          size="md"
          className=""
        >
          Go to login
        </Button>
      </div>
    </div>
  );
}
