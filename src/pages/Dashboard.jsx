import { useAuth } from "../context/AuthContext";
import InfoCard from "../components/dashboard-ui/InfoCard";

export function Dashboard() {
  const { currentUser } = useAuth();

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <InfoCard label="Email" value={currentUser?.email} />
        <InfoCard label="User ID" value={currentUser?.uid} />
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <p className="font-semibold text-green-600">You are successfully logged in.</p>
      </div>
    </div>
  );
}
