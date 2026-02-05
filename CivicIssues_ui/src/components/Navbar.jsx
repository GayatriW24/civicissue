import { Link, NavLink } from "react-router-dom";
import logo from "../components/logocivicIssues.jpg";

function Navbar() {
  const role = localStorage.getItem("role");
  return (
    <header className="sticky top-0 z-50">
      <div className="bg-gradient-to-r from-indigo-700 via-purple-600 to-pink-600 shadow-lg">
        <div className="backdrop-blur-md bg-white/10">
          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <Link to="/" className="flex items-center gap-3 group">
              <img
                src={logo}
                alt="CivicIssues Logo"
                className="h-12 w-12 rounded-xl shadow-lg group-hover:rotate-6 transition-transform duration-300"
              />
              <span className="text-2xl font-extrabold tracking-wide text-white drop-shadow-lg">
                CivicIssues
              </span>
            </Link>

            <nav className="flex items-center gap-10 text-sm font-semibold text-white">

              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative transition ${
                    isActive ? "text-yellow-300" : "hover:text-yellow-300"
                  }`
                }
              >
                Home
                <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-yellow-300 transition-all group-hover:w-full"></span>
              </NavLink>




              {localStorage.getItem("role") === "ADMIN" && (
                  <NavLink
                    to="/admin/categories"
                    className={({ isActive }) =>
                      `relative transition ${
                        isActive ? "text-yellow-300" : "hover:text-yellow-300"
                      }`
                    }
                  >
                    Add Categories
                  </NavLink>
                )}
                 


                  {localStorage.getItem("role") === "CITIZEN" && (
                  <NavLink
                    to="/citizen"
                    className={({ isActive }) =>
                      `relative transition ${
                        isActive ? "text-yellow-300" : "hover:text-yellow-300"
                      }`
                    }
                  >
                    Raise Complaint
                  </NavLink>
                )}


              {localStorage.getItem("role") === "SUPER_ADMIN" && (
                  <NavLink
                    to="/super-admin"
                    className={({ isActive }) =>
                      `relative transition ${
                        isActive ? "text-yellow-300" : "hover:text-yellow-300"
                      }`
                    }
                  >
                    My Complaints
                  </NavLink>
                )}



                {localStorage.getItem("role") === "SUPER_ADMIN" && (
                  <NavLink
                    to="/super-admin/departments"
                    className={({ isActive }) =>
                      `relative transition ${
                        isActive ? "text-yellow-300" : "hover:text-yellow-300"
                      }`
                    }
                  >
                    All Departments
                  </NavLink>
                )}


                {localStorage.getItem("role") === "SUPER_ADMIN" && (
                  <NavLink
                    to="/super-admin/admins"
                    className={({ isActive }) =>
                      `relative transition ${
                        isActive ? "text-yellow-300" : "hover:text-yellow-300"
                      }`
                    }
                  >
                    My Admins
                  </NavLink>
                )}
                
              {(role === "CITIZEN" || role === "SUPER_ADMIN") && (
                <NavLink
                  to={
                    role === "CITIZEN"
                      ? "/citizen/mycomplaint"
                      : "/super-admin/more"
                  }
                  className={({ isActive }) =>
                    `relative transition ${
                      isActive ? "text-yellow-300" : "hover:text-yellow-300"
                    }`
                  }
                >
                  {role === "CITIZEN" ? "My Complaints" : "More"}
                </NavLink>
              )}

              <NavLink
                to="/login"
                className={({ isActive }) =>
                  `px-4 py-2 rounded-full transition ${
                    isActive
                      ? "bg-white text-indigo-700"
                      : "hover:bg-white/20"
                  }`
                }
              >
                Login
              </NavLink>

              <NavLink
                to="/register"
                className="relative overflow-hidden px-6 py-2 rounded-full font-bold text-indigo-700 bg-white shadow-lg hover:scale-105 transition-transform"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 hover:opacity-100 transition"></span>
                <span className="relative z-10">Register</span>
              </NavLink>
              <NavLink
  to="#"
  onClick={(e) => {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("role");

    navigate("/login");
  }}
  className="relative overflow-hidden px-6 py-2 rounded-full font-bold text-indigo-700 bg-white shadow-lg hover:scale-105 transition-transform"
>
  <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-pink-400 opacity-0 hover:opacity-100 transition"></span>
  <span className="relative z-10">Logout</span>
</NavLink>


              
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
