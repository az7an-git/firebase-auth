export const Input = ({
  type = "text",
  label,
  value,
  onChange,
  placeholder,
  required = false,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div>
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
          {required && <span className="text-red-500 ml-0.5">*</span>}
        </label>
      )}
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition-colors ${
          error ? "border-red-300 focus:ring-red-500" : "border-gray-300"
        } ${className}`}
        {...rest}
      />
    </div>
  );
};
