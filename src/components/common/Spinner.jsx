export default function Spinner({ label = "Loading...", size = "md" }) {
  const sizeClasses = {
    sm: "w-6 h-6",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          {/* Outer spinning ring */}
          <div
            className={`${sizeClasses[size]} border-4 border-indigo-200 rounded-full`}
          />
          {/* Inner spinning ring */}
          <div
            className={`${sizeClasses[size]} border-4 border-t-indigo-600 border-r-indigo-600 border-b-transparent border-l-transparent rounded-full animate-spin absolute top-0 left-0`}
          />
          {/* Center dot */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-indigo-600 rounded-full" />
        </div>
        {label && (
          <p className="text-sm font-medium text-gray-700 tracking-wide animate-pulse">
            {label}
          </p>
        )}
      </div>
    </div>
  );
}

