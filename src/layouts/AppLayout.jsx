import { Outlet, Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logout } from "../services/authService";

export default function AppLayout() {
  const { currentUser, isLoading } = useAuth();
  const navigate = useNavigate();
  if (isLoading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  if (!currentUser) {
    return <Navigate to="/login" replace />;
  }
  async function handleLogout() {
    await logout();
    navigate("/login");
  }
  return (
    <div className="min-h-screen flex-1 flex flex-col bg-gray-100">
      <header className="flex items-center justify-between w-full gap-4 bg-white shadow-md px-4 h-16 md:px-6">
        <h1 className="text-lg font-bold text-gray-800 truncate">Welcome</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
        >
          Logout
        </button>
      </header>

      <main className="flex-1 overflow-auto p-6 md:p-8">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
