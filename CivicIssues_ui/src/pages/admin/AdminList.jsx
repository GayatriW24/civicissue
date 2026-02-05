// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../../api/axiosInstance";
// import MainLayout from "../../layouts/MainLayout";

// function AdminList() {
//   const [admins, setAdmins] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");

//   const navigate = useNavigate();

//   const loadAdmins = async () => {
//     setLoading(true);
//     setError("");

//     try {
//       const res = await api.get("/admin/list");
//       setAdmins(res.data?.data || []);
//     } catch (err) {
//       console.error(err);
//       setError("Failed to load admins");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     loadAdmins();
//   }, []);

//   const handleDeactivate = async (adminId) => {
//     if (!adminId) {
//       alert("Invalid admin ID");
//       return;
//     }

//     const confirm = window.confirm(
//       "Are you sure you want to deactivate this admin?"
//     );
//     if (!confirm) return;

//     try {
//       await api.put(`/admin/deactivate/${adminId}`);
//       await loadAdmins();
//     } catch (err) {
//       console.error(err);
//       alert("Failed to deactivate admin");
//     }
//   };

//   return (
//     <MainLayout>
//           <button
//       onClick={() => navigate("/super-admin")}
//       className="mb-4 text-indigo-600 underline"
//     >
//       ← Back to Dashboard
//     </button>

//       <div className="p-8 bg-gray-100 min-h-screen">

        
//         <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
//           <h1 className="text-3xl font-bold">All Admins</h1>
//           <p className="opacity-90">Manage department admins</p>
//         </div>

//         {loading && <p>Loading admins...</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         {!loading && !error && (
//           <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-indigo-50 text-indigo-700">
//                 <tr>
//                   <th className="p-4 text-left">ID</th>
//                   <th className="p-4 text-left">Name</th>
//                   <th className="p-4 text-left">Email</th>
//                   <th className="p-4 text-left">Department</th>
//                   <th className="p-4 text-left">Status</th>
//                   <th className="p-4 text-left">Action</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {admins.map((admin) => (
//                   <tr key={admin.id} className="border-b hover:bg-gray-50">
//                     <td className="p-4">{admin.id}</td>
//                     <td className="p-4">{admin.name}</td>
//                     <td className="p-4">{admin.email}</td>
//                     <td className="p-4">{admin.departmentId}</td>

//                     <td className="p-4">
//                       {admin.active ? (
//                         <span className="text-green-600 font-semibold">
//                           Active
//                         </span>
//                       ) : (
//                         <span className="text-red-600 font-semibold">
//                           Inactive
//                         </span>
//                       )}
//                     </td>

//                     <td className="p-4">
//                       {admin.active && (
//                         <button
//                           onClick={() => handleDeactivate(admin.id)}
//                           className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
//                         >
//                           Deactivate
//                         </button>
//                       )}
//                     </td>
//                   </tr>
//                 ))}

//                 {admins.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="p-6 text-center text-gray-400">
//                       No admins found
//                     </td>
//                   </tr>
//                 )}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </MainLayout>
//   );
// }

// export default AdminList;



import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";

function AdminList() {
  const [admins, setAdmins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const loadAdmins = async () => {
    setLoading(true);
    setError("");

    try {
      const res = await api.get("/admin/list");
      setAdmins(res.data?.data || []);
    } catch {
      setError("Failed to load admins");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdmins();
  }, []);

  const handleDeactivate = async (adminId) => {
    if (!window.confirm("Deactivate this admin?")) return;

    try {
      await api.put(`/admin/deactivate/${adminId}`);
      loadAdmins();
    } catch {
      alert("Failed to deactivate admin");
    }
  };

  const handleActivate = async (adminId) => {
    if (!window.confirm("Activate this admin?")) return;

    try {
      await api.put(`/admin/activate/${adminId}`);
      loadAdmins();
    } catch {
      alert("Failed to activate admin");
    }
  };

  return (
    <MainLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <button
          onClick={() => navigate("/super-admin")}
          className="mb-4 text-indigo-600 underline"
        >
          ← Back to Dashboard
        </button>

        <h1 className="text-3xl font-bold mb-6">All Admins</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <table className="w-full bg-white shadow rounded">
            <thead className="bg-indigo-50">
              <tr>
                <th className="p-4">ID</th>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Aadhaar</th>
                <th className="p-4">Department</th>
                <th className="p-4">Status</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody >
              {admins.map((a) => (
                <tr key={a.id} className="border-b">
                  <td className="p-4">{a.id}</td>
                  <td className="p-4">{a.name}</td>
                  <td className="p-4">{a.email}</td>
                  <td className="p-4">{a.aadhaar}</td>
                  <td className="p-4">
                    {a.departmentName || a.departmentId}
                  </td>
                  <td className="p-4">
                    {a.active ? "Active" : "Inactive"}
                  </td>
                  <td className="p-4 space-x-2">
                    {a.active ? (
                      <button
                        onClick={() => handleDeactivate(a.id)}
                        className="bg-red-600 text-white px-3 py-1 rounded"
                      >
                        Deactivate
                      </button>
                    ) : (
                      <button
                        onClick={() => handleActivate(a.id)}
                        className="bg-green-600 text-white px-3 py-1 rounded"
                      >
                        Activate
                      </button>
                    )}
                  </td>
                </tr>
              ))}

              {admins.length === 0 && (
                <tr>
                  <td colSpan="6" className="p-6 text-center text-gray-400">
                    No admins found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </MainLayout>
  );
}

export default AdminList;
