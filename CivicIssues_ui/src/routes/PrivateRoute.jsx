import { isAuthenticated, getRole } from "../utils/authauth";
import AuthError from "../components/AuthError";

function PrivateRoute({ children, allowedRoles }) {
  if (!isAuthenticated()) {
    return (
      <AuthError
        title="Not Logged In"
        message="You must log in to access this page."
        actionText="Go to Login"
        actionPath="/login"
      />
    );
  }

  if (allowedRoles && !allowedRoles.includes(getRole())) {
    return (
      <AuthError
        title="Access Denied"
        message="You do not have permission to access this page."
        actionText="Go to Dashboard"
        actionPath={getRole() === "ADMIN" ? "/admin" : "/citizen"}
      />
    );
  }

  return children;
}

export default PrivateRoute;
