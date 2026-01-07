export function AuthCard({ title, children, footer }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center px-4">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
          {title}
        </h2>

        {children}

        {footer && <div className="mt-4">{footer}</div>}
      </div>
    </div>
  );
}
