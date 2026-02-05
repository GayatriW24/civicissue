import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8084", // API Gateway
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * REQUEST INTERCEPTOR
 * Attaches auth + context headers
 */
// api.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem("token");
//     const role = localStorage.getItem("role");
//     const departmentId = localStorage.getItem("departmentId");
//     const aadhaar = localStorage.getItem("aadhaar");

//     // ✅ JWT
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }

//     // ✅ Context headers (only if present)
//     if (role) {
//       config.headers.role = role;
//     }

//     if (departmentId) {
//       config.headers.departmentId = departmentId;
//     }

//     if (aadhaar) {
//       config.headers["X-CITIZEN-AADHAAR"] = aadhaar;
//     }

//     return config;
//   },
//   (error) => Promise.reject(error)
// );



api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // 🔒 citizen-only context
  if (role === "CITIZEN") {
    const aadhaar = localStorage.getItem("aadhaar");
    if (aadhaar) {
      config.headers["X-CITIZEN-AADHAAR"] = aadhaar;
    }
  }

  // 🏢 department-scoped roles only
  if (role === "ADMIN" || role === "DEPT_ADMIN") {
    const departmentId = localStorage.getItem("departmentId");
    if (departmentId) {
      config.headers.departmentId = departmentId;
    }
  }

  return config;
});

/**
 * RESPONSE INTERCEPTOR
 * Handles auth errors gracefully
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // ❗ session expired or invalid token
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("departmentId");
      localStorage.removeItem("aadhaar");

      // ❌ NO hard redirect here
      // Let PrivateRoute / UI decide what to do
    }

    return Promise.reject(error);
  }
);

export default api;
