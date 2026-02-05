import { useNavigate } from "react-router-dom";

function AuthError({
  title = "Access Error",
  message = "Something went wrong.",
  actionText = "Go Back",
  actionPath = "/login",
}) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">

        <div className="text-5xl mb-4">⚠️</div>

        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          {title}
        </h2>

        <p className="text-gray-600 mb-6">
          {message}
        </p>

        <button
          onClick={() => navigate(actionPath)}
          className="px-6 py-2 rounded-lg bg-indigo-600 text-white
                     hover:bg-indigo-700 transition"
        >
          {actionText}
        </button>
      </div>
    </div>
  );
}

export default AuthError;
