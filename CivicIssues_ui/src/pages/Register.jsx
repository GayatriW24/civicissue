import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { registerUser } from "../api/userApi";
import { extractErrorMessage } from "../utils/errorUtils";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    aadhaar: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await registerUser(formData);

      navigate("/login", {
        state: { message: "Registration successful. Please login." },
      });

    } catch (err) {
      setError(extractErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <div className="flex justify-center py-20 px-6">
        <div className="w-full max-w-md bg-white p-8 rounded shadow">
          <h2 className="text-2xl font-bold text-center text-indigo-600 mb-6">
            Citizen Registration
          </h2>

          {error && (
            <p className="mb-4 text-sm text-red-600 text-center">
              {error}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            <input
              name="name"
              placeholder="Full Name"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="phone"
              placeholder="Phone Number"
              pattern="[0-9]{10}"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              name="aadhaar"
              placeholder="Aadhaar Number"
              pattern="[0-9]{12}"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              required
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <input
              type="password"
              name="password"
              placeholder="Password (min 8 characters)"
              minLength={8}
              required
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />

            <button
              disabled={loading}
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 disabled:opacity-50"
            >
              {loading ? "Registering..." : "Register"}
            </button>

          </form>
        </div>
      </div>
    </MainLayout>
  );
}

export default Register;
