/**
 * Check if user is authenticated (JWT exists)
 */
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return typeof token === "string" && token.length > 0;
};

/**
 * Get logged-in user role
 * Returns: "ADMIN" | "CITIZEN" | null
 */
export const getRole = () => {
  return localStorage.getItem("role");
};

/**
 * Safe logout
 * - Clears storage
 * - DOES NOT force redirect
 * - Caller decides where to navigate
 */
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  localStorage.removeItem("departmentId");
  localStorage.removeItem("aadhaar");
};

/**
 * Optional helper (recommended)
 * Explicit logout + redirect
 */
export const logoutAndRedirect = (navigate, path = "/login") => {
  logout();
  navigate(path, { replace: true });
};
