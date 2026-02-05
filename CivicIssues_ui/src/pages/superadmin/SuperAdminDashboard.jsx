// import { useState,useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosInstance";
// import MainLayout from "../../layouts/MainLayout";

// function SuperAdminDashboard() {
//   const navigate = useNavigate(); 
//   const [form, setForm] = useState({
//     name: "",
//     aadhaar: "",
//     phone: "",
//     email: "",
//     departmentId: "",
//   });

//     const [departments, setDepartments] = useState([]);
//   const [activateId, setActivateId] = useState("");
//   const [deactivateId, setDeactivateId] = useState("");

//   const [message, setMessage] = useState("");
//   const [error, setError] = useState("");
//   const [deptErrors, setDeptErrors] = useState({});

//   const [department, setDepartment] = useState({
//   name: "",
//   description: ""
//   })

// const handleDepartmentChange = (e) => {
//   setDepartment({ ...department, [e.target.name]: e.target.value })
// }

// const createDepartment = async (e) => {
//   e.preventDefault()
//   try {
//     await api.post("/api/departments", department)
//     setMessage("department created successfully")
//     setDepartment({ name: "", description: "" })
//   } catch (err) {
//     setError("failed to create department")
//   }
// }

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

// // const createDepartment = async (e) => {
// //   e.preventDefault();
// //   setDeptErrors({});
// //   setError("");
// //   setSuccess("");

// //   const errors = {};

// //   if (department.name.trim().length < 3) {
// //     errors.name = "Department name must be at least 3 characters";
// //   }

// //   if (department.description.trim().length < 5) {
// //     errors.description = "Description must be at least 5 characters";
// //   }

// //   if (Object.keys(errors).length > 0) {
// //     setDeptErrors(errors);
// //     return;
// //   }

// //   try {
// //     await api.post("/api/departments", department);
// //     setSuccess("Department created successfully 🎉");
// //     setDepartment({ name: "", description: "" });
// //   } catch (err) {
// //     setError(err.response?.data?.message || "Failed to create department");
// //   }
// // };
// useEffect(() => {
//   api.get("/api/departments")
//     .then(res => setDepartments(res.data.data))
//     .catch(() => {});
// }, []);

//   // CREATE ADMIN
//   const createAdmin = async (e) => {
//     e.preventDefault();
//     setMessage("");
//     setError("");

//     try {
//       const res = await api.post("/admin/create-admin", {
//         ...form,
//         departmentId: Number(form.departmentId),
//       });

      
//       setMessage(res.data.message || "Admin created successfully");

      
//       setForm({
//         name: "",
//         aadhaar: "",
//         phone: "",
//         email: "",
//         departmentId: "",
//       });

//       navigate("/super-admin/admins");

//     } catch (err) {
//       setError(
//         err.response?.data?.message ||
//         "Failed to create admin (check SUPER_ADMIN login)"
//       );
//     }
//   };

//   // DEACTIVATE ADMIN
//   const deactivateAdmin = async () => {
//     setMessage("");
//     setError("");

//     try {
//       await api.put(`/admin/deactivate/${deactivateId}`);
//       setMessage("Admin deactivated successfully");
//       setDeactivateId("");
//     } catch {
//       setError("Failed to deactivate admin");
//     }
//   };



//   const activateAdmin = async () => {
//     setMessage("");
//     setError("");

//     try {
//       await api.put(`/admin/activate/${activateId}`);
//       setMessage("Admin activated successfully");
//       setActivateId("");
//     } catch (err) {
//       setError("Failed to activate admin");
//     }
//   };
// {success && <p className="text-green-600 mb-4">{success}</p>}
// {error && <p className="text-red-600 mb-4">{error}</p>}
//   return (
//     <MainLayout>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">


//   {/* CREATE ADMIN */}
//   <div className="bg-white p-6 rounded-xl shadow">
//     <h2 className="text-xl font-semibold mb-4">Create Admin</h2>

//     <form onSubmit={createAdmin} className="space-y-3">
//       <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
//       <input name="aadhaar" placeholder="Aadhaar" value={form.aadhaar} onChange={handleChange} className="w-full border p-2 rounded" required />
//       <input name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} className="w-full border p-2 rounded" required />
//       <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
//       {/* <input name="departmentId" placeholder="Department ID" value={form.departmentId} onChange={handleChange} className="w-full border p-2 rounded" required /> */}
// <select
//   name="departmentId"
//   value={form.departmentId}
//   onChange={handleChange}
//   className="w-full border p-2 rounded"
//   required
// >
//   <option value="">Select Department</option>
//   {departments.map(d => (
//     <option key={d.id} value={d.id}>
//       {d.name}
//     </option>
//   ))}
// </select>

//       <button type="submit" className="bg-indigo-600 text-white px-4 py-2 rounded w-full hover:bg-indigo-700">
//         Create Admin
//       </button>
//     </form>
//   </div>

//   {/* DEACTIVATE ADMIN */}
//   <div className="bg-white p-6 rounded-xl shadow">
//     <h2 className="text-xl font-semibold mb-4">Deactivate Admin</h2>

//     <input
//       placeholder="Admin User ID"
//       value={deactivateId}
//       onChange={(e) => setDeactivateId(e.target.value)}
//       className="w-full border p-2 rounded mb-3"
//     />

//     <button
//       onClick={deactivateAdmin}
//       className="bg-red-600 text-white px-4 py-2 rounded w-full hover:bg-red-700"
//     >
//       Deactivate Admin
//     </button>
//   </div>

//   {/* ACTIVATE ADMIN */}
//   <div className="bg-white p-6 rounded-xl shadow">
//     <h2 className="text-xl font-semibold mb-4">Activate Admin</h2>

//     <input
//       placeholder="Admin User ID"
//       value={activateId}
//       onChange={(e) => setActivateId(e.target.value)}
//       className="w-full border p-2 rounded mb-3"
//     />

//     <button
//       onClick={activateAdmin}
//       className="bg-green-600 text-white px-4 py-2 rounded w-full hover:bg-green-700"
//     >
//       Activate Admin
//     </button>
//   </div>
//   <div className="bg-white p-6 rounded-xl shadow max-w-xl">
//   <h2 className="text-xl font-semibold mb-4">Create Department</h2>

//   <form onSubmit={createDepartment} className="space-y-3">
//     <input
//       name="name"
//       placeholder="Department Name"
//       value={department.name}
//       onChange={handleDepartmentChange}
//       className="w-full border p-2 rounded"
//       required
//     />
//     {deptErrors.name && (
//   <p className="text-red-500 text-sm">{deptErrors.name}</p>
// )}

//     <textarea
//       name="description"
//       placeholder="Department Description"
//       value={department.description}
//       onChange={handleDepartmentChange}
//       className="w-full border p-2 rounded"
//       required
//     />
//     {deptErrors.description && (
//   <p className="text-red-500 text-sm">{deptErrors.description}</p>
// )}

//     <button
//       type="submit"
//       className="bg-purple-600 text-white px-4 py-2 rounded w-full hover:bg-purple-700"
//     >
//       Create Department
//     </button>
//   </form>
// </div>


// </div>

//     </MainLayout>
//   );
// }

// export default SuperAdminDashboard;




import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";

function SuperAdminDashboard() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    aadhaar: "",
    phone: "",
    email: "",
    departmentId: "",
  });

  const [department, setDepartment] = useState({
    name: "",
    description: "",
  });

  const [departments, setDepartments] = useState([]);
  const [activateId, setActivateId] = useState("");
  const [deactivateId, setDeactivateId] = useState("");

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [deptErrors, setDeptErrors] = useState({});

  /* -------------------- LOAD DEPARTMENTS -------------------- */
  useEffect(() => {
    api.get("/api/departments")
      .then(res => setDepartments(res.data.data))
      .catch(() => {});
  }, []);

  /* -------------------- HANDLERS -------------------- */
  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleDepartmentChange = e =>
    setDepartment({ ...department, [e.target.name]: e.target.value });

  /* -------------------- CREATE ADMIN -------------------- */
  const createAdmin = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      await api.post("/admin/create-admin", {
        ...form,
        departmentId: Number(form.departmentId),
      });

      setForm({
        name: "",
        aadhaar: "",
        phone: "",
        email: "",
        departmentId: "",
      });

      navigate("/super-admin/admins");
    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Failed to create admin (check SUPER_ADMIN login)"
      );
    }
  };

  /* -------------------- CREATE DEPARTMENT -------------------- */
  const createDepartment = async (e) => {
    e.preventDefault();
    setDeptErrors({});
    setMessage("");
    setError("");

    const errors = {};
    if (department.name.trim().length < 3) {
      errors.name = "Department name must be at least 3 characters";
    }
    if (department.description.trim().length < 5) {
      errors.description = "Description must be at least 5 characters";
    }

    if (Object.keys(errors).length > 0) {
      setDeptErrors(errors);
      return;
    }

    try {
      await api.post("/api/departments", department);
      setMessage("Department created successfully");
      setDepartment({ name: "", description: "" });

      const res = await api.get("/api/departments");
      setDepartments(res.data.data);
      setMessage("Department created successfully");

setTimeout(() => {
  navigate("/super-admin/departments");
}, 1000);

    } catch {
      setError("Failed to create department");
    }
  };

  /* -------------------- ACTIVATE / DEACTIVATE -------------------- */
  const activateAdmin = async () => {
    setMessage("");
    setError("");
    try {
      await api.put(`/admin/activate/${activateId}`);
      setMessage("Admin activated successfully");
      setActivateId("");
    } catch {
      setError("Failed to activate admin");
    }
  };

  const deactivateAdmin = async () => {
    setMessage("");
    setError("");
    try {
      await api.put(`/admin/deactivate/${deactivateId}`);
      setMessage("Admin deactivated successfully");
      setDeactivateId("");
    } catch {
      setError("Failed to deactivate admin");
    }
  };

  /* -------------------- JSX -------------------- */
  return (
    <MainLayout>
      <div className="p-6">

        {message && <p className="text-green-600 mb-4">{message}</p>}
        {error && <p className="text-red-600 mb-4">{error}</p>}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* CREATE ADMIN */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Create Admin</h2>

            <form onSubmit={createAdmin} className="space-y-3">
              <input name="name" value={form.name} onChange={handleChange} placeholder="Name" className="w-full border p-2 rounded" required />
              <input name="aadhaar" value={form.aadhaar} onChange={handleChange} placeholder="Aadhaar" className="w-full border p-2 rounded" required />
              <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full border p-2 rounded" required />
              <input name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full border p-2 rounded" required />

              <select name="departmentId" value={form.departmentId} onChange={handleChange} className="w-full border p-2 rounded" required>
                <option value="">Select Department</option>
                {departments.map(d => (
                  <option key={d.id} value={d.id}>{d.name}</option>
                ))}
              </select>

              <button className="bg-indigo-600 text-white w-full py-2 rounded">
                Create Admin
              </button>
            </form>
          </div>

          {/* DEACTIVATE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Deactivate Admin</h2>
            <input value={deactivateId} onChange={e => setDeactivateId(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="Admin ID" />
            <button onClick={deactivateAdmin} className="bg-red-600 text-white w-full py-2 rounded">
              Deactivate
            </button>
          </div>

          {/* ACTIVATE */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Activate Admin</h2>
            <input value={activateId} onChange={e => setActivateId(e.target.value)} className="w-full border p-2 rounded mb-3" placeholder="Admin ID" />
            <button onClick={activateAdmin} className="bg-green-600 text-white w-full py-2 rounded">
              Activate
            </button>
          </div>

          {/* CREATE DEPARTMENT */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-xl font-semibold mb-4">Create Department</h2>

            <form onSubmit={createDepartment} className="space-y-3">
              <input name="name" value={department.name} onChange={handleDepartmentChange} placeholder="Department Name" className="w-full border p-2 rounded" />
              {deptErrors.name && <p className="text-red-500 text-sm">{deptErrors.name}</p>}

              <textarea name="description" value={department.description} onChange={handleDepartmentChange} placeholder="Department Description" className="w-full border p-2 rounded" />
              {deptErrors.description && <p className="text-red-500 text-sm">{deptErrors.description}</p>}

              <button className="bg-purple-600 text-white w-full py-2 rounded">
                Create Department
              </button>
            </form>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default SuperAdminDashboard;

