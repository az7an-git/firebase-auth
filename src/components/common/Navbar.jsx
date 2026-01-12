import { useAuth } from "../../context/AuthContext";

export default function Navbar() {
  const { currentUser, userDoc } = useAuth();

  const displayName =
    userDoc?.fullName ||
    currentUser?.displayName ||
    currentUser?.email ||
    "User";

  const photoURL = userDoc?.photoURL || currentUser?.photoURL;

  return (
    <nav className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Left: Profile Picture */}
        <div className="flex items-center gap-4">
          {photoURL ? (
            <img
              src={photoURL}
              alt={displayName}
              className="w-12 h-12 rounded-full object-cover border-2 border-indigo-100 shadow-sm"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-indigo-500 flex items-center justify-center text-white font-semibold text-lg shadow-sm">
              {displayName.charAt(0).toUpperCase()}
            </div>
          )}
        </div>

        {/* Right: User Name */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="font-semibold text-gray-800 text-lg">{displayName}</p>
            {userDoc?.company && (
              <p className="text-sm text-gray-500">{userDoc.company}</p>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

