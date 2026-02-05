import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../src/api/axiosInstance";
import MainLayout from "../../src/layouts/MainLayout";

function Login() {
  const navigate = useNavigate();

  const [aadhaar, setAadhaar] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await api.post("/auth/login", { aadhaar, password });

      const { token, role, departmentId } = res.data.data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("aadhaar", aadhaar);

      if (departmentId) {
        localStorage.setItem("departmentId", departmentId);
      } else {
        localStorage.removeItem("departmentId");
      }

      if (role === "SUPER_ADMIN") {
        navigate("/super-admin");
      } else if (role === "ADMIN") {
        navigate("/admin");
      } else {
        navigate("/citizen");
      }

    } catch (err) {
      setError("Invalid Aadhaar or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">

          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Login
          </h2>

          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <form onSubmit={submit} className="space-y-4">

            {/* Aadhaar */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Aadhaar Number
              </label>
              <input
                type="text"
                maxLength={12}
                required
                placeholder="Enter Aadhaar number"
                value={aadhaar}
                onChange={(e) => setAadhaar(e.target.value)}
                className="w-full border rounded-lg px-4 py-2
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <input
                type="password"
                required
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border rounded-lg px-4 py-2
                           focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded-lg
                         hover:bg-indigo-700 transition disabled:opacity-50"
            >
              {loading ? "Logging in..." : "Login"}
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Login;
