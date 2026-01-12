export default function InfoCard({ label, value }) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-gray-600 text-sm font-medium">{label}</h2>
      <p className="mt-1 text-gray-800 font-semibold break-all">{value}</p>
    </div>
  );
}
