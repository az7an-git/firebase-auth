import { Link } from "react-router-dom";

export function AuthFooterLink({ text, linkText, to }) {
  return (
    <p className="text-center text-sm text-gray-600">
      {text}{" "}
      <Link
        to={to}
        className="text-indigo-600 hover:text-indigo-800 font-medium"
      >
        {linkText}
      </Link>
    </p>
  );
}
