import { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../utils/authServices";
import { showToast } from "../utils/toast";
import { Navbar, Modal } from "../components/common";

export default function AppLayout() {
  const { currentUser } = useAuth();
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleConfirmLogout = async () => {
    try {
      await logout();
      showToast.success("Logged out successfully");
    } catch (err) {
      showToast.error("Failed to log out: " + err.message);
    } finally {
      setShowLogoutModal(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white flex flex-col shadow-lg">
        <div className="p-6 text-center text-2xl font-bold border-b border-indigo-600">
          MyApp
        </div>

        <nav className="flex-1 p-4 space-y-2">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-800 font-semibold shadow-md"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Dashboard
          </NavLink>
          <NavLink
            to="/settings"
            className={({ isActive }) =>
              `block px-4 py-2 rounded-lg transition-colors ${
                isActive
                  ? "bg-indigo-800 font-semibold shadow-md"
                  : "hover:bg-indigo-600"
              }`
            }
          >
            Settings
          </NavLink>
        </nav>

        {currentUser && (
          <button
            onClick={() => setShowLogoutModal(true)}
            className="m-4 mt-auto bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg text-white font-semibold transition-colors shadow-md hover:shadow-lg"
          >
            Logout
          </button>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <Navbar />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      {/* Logout Modal */}
      <Modal
        isOpen={showLogoutModal}
        onClose={() => setShowLogoutModal(false)}
        title="Log out of your account?"
        footer={
          <>
            <button
              onClick={() => setShowLogoutModal(false)}
              className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 text-sm font-medium hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirmLogout}
              className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white text-sm font-semibold transition-colors"
            >
              Log out
            </button>
          </>
        }
      >
        <p className="text-sm text-gray-600">
          You can log back in anytime with your email and password or your
          Google account.
        </p>
      </Modal>
    </div>
  );
}
