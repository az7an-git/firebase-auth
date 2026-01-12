import { useAuth } from "../context/AuthContext";

export function Dashboard() {
  const { currentUser, userDoc } = useAuth();

  const displayName =
    userDoc?.fullName ||
    currentUser?.displayName ||
    currentUser?.email ||
    "User";

  return (
    <div className="space-y-6">
      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-lg shadow-sm p-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <div>
            <p className="font-semibold text-green-800 text-lg">
              You are successfully logged in!
            </p>
            <p className="text-sm text-green-600 mt-1">
              Welcome back, {displayName}
            </p>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Your Information
        </h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-3 border-b border-gray-100">
            <span className="text-sm font-medium text-gray-600">Name</span>
            <span className="text-sm font-semibold text-gray-800">
              {displayName}
            </span>
          </div>
          {userDoc?.company && (
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <span className="text-sm font-medium text-gray-600">Company</span>
              <span className="text-sm font-semibold text-gray-800">
                {userDoc.company}
              </span>
            </div>
          )}
          <div className="flex items-center justify-between py-3">
            <span className="text-sm font-medium text-gray-600">Email</span>
            <span className="text-sm font-semibold text-gray-800">
              {currentUser?.email}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
