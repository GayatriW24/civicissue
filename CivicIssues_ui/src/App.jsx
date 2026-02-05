import { Routes, Route } from "react-router-dom";

import Intro from "./pages/Intro";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";


import Admindashboard from "./pages/admin/Admindashboard";
import AddCategories from "./pages/admin/AddCategories";
import Citizendashboard from "./pages/admin/Citizendashboard";
import ReportIssue from "./pages/admin/ReportIssue";
import MyComplaints from "./pages/complaint/MyComplaints";
import SuperAdminDashboard from "./pages/superadmin/SuperAdminDashboard";
import ComplaintList from "./pages/superadmin/ComplaintList";
import PrivateRoute from "./routes/PrivateRoute";
import AdminList from "./pages/admin/AdminList";
import DepartmentList from "./pages/admin/DepartmentList";



function AppRoutes() {
  return (
    <Routes>

      {/*  PUBLIC ROUTES */}
      <Route path="/" element={<Intro />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
     

      {/*  CITIZEN ROUTES */}
      <Route
        path="/citizen"
        element={
          <PrivateRoute allowedRoles={["CITIZEN"]}>
            <Citizendashboard />
          </PrivateRoute>
        }
      />

      <Route
  path="/super-admin"
  element={
    <PrivateRoute allowedRoles={["SUPER_ADMIN"]}>
      
      <ComplaintList />
    </PrivateRoute>
  }
/>


      <Route
        path="/citizen/report"
        element={
          <PrivateRoute allowedRoles={["CITIZEN"]}>
            <ReportIssue />
          </PrivateRoute>
        }
      />

      <Route
        path="/citizen/mycomplaint"
        element={
          <PrivateRoute allowedRoles={["CITIZEN"]}>
            <MyComplaints />
          </PrivateRoute>
        }
      />

      {/*  ADMIN ROUTES */}
      <Route
        path="/admin"
        element={
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <Admindashboard />
          </PrivateRoute>
        }
      />


      <Route
        path="/admin/categories"
        element={
          <PrivateRoute allowedRoles={["ADMIN"]}>
            <AddCategories />
          </PrivateRoute>
        }
      />


      <Route
  path="/super-admin/admins"
  element={
    <PrivateRoute allowedRoles={["SUPER_ADMIN"]}>
      <AdminList />
    </PrivateRoute>
  }
/>


 <Route
  path="/super-admin/departments"
  element={
    <PrivateRoute allowedRoles={["SUPER_ADMIN"]}>
      <DepartmentList />
    </PrivateRoute>
  }
/>

<Route
  path="/super-admin/more"
  element={
    <PrivateRoute allowedRoles={["SUPER_ADMIN"]}>
      <SuperAdminDashboard />
    </PrivateRoute>
  }
/>

    </Routes>
  );
}

export default AppRoutes;
