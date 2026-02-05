// import { useEffect, useState } from "react";
// import api from "../../api/axiosInstance";
// import MainLayout from "../../layouts/MainLayout";

// const STATUS_STYLES = {
//   OPEN: "bg-red-100 text-red-600",
//   IN_PROGRESS: "bg-yellow-100 text-yellow-700",
//   RESOLVED: "bg-green-100 text-green-600",
// };

// function Admindashboard() {
//   const [complaints, setComplaints] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState("");
//   const [attachments, setAttachments] = useState({});
//   const [openComplaintId, setOpenComplaintId] = useState(null);


//   const loadComplaints = async () => {
//     try {
//       const res = await api.get("/api/complaints");
//       setComplaints(res.data.data || []);
//     } catch (err) {
//       setError("Unable to load complaints");
//     } finally {
//       setLoading(false);
//     }
//   };
// const loadAttachments = async (complaintId) => {
//   if (attachments[complaintId]) return; // cache

//   const res = await api.get(
//     `/api/attachments/complaint/${complaintId}`
//   );

//   setAttachments(prev => ({
//     ...prev,
//     [complaintId]: res.data.data || [],
//   }));
// };

//   useEffect(() => {
//     loadComplaints();
//   }, []);

//   // const changeStatus = async (id, newStatus) => {
//   //   try {
//   //     await api.put(`/api/complaints/${id}/status/${newStatus}`);
//   //     loadComplaints();
//   //   } catch {
//   //     alert("Status update failed");
//   //   }
//   // };

//   const changeStatus = async (id, newStatus) => {
//     try {
//       await api.put(`/api/complaints/${id}/status`, {
//         status: newStatus,
//       });

//       loadComplaints();
//     } catch (err) {
//       alert("Status update failed");
//     }
//   };

//   return (
//     <MainLayout>
//       <div className="p-8 bg-gray-100 min-h-screen">

//         {/* HEADER */}
//         <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
//           <h1 className="text-3xl font-bold">Admin Dashboard</h1>
//           <p className="opacity-90">
//             Manage complaints for your department
//           </p>
//         </div>

//         {/* STATES */}
//         {loading && <p>Loading complaints...</p>}
//         {error && <p className="text-red-600">{error}</p>}

//         {/* TABLE */}
//         {!loading && !error && (
//           <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-indigo-50 text-indigo-700">
//                 <tr>
//                   <th className="p-4 text-left">Citizen Aadhaar</th>
//                   <th className="p-4 text-left">City</th>
//                   <th className="p-4 text-left">Area</th>
//                   <th className="p-4 text-left">Description</th>
//                   <th className="p-4 text-left">Status</th>
//                   <th className="p-4 text-left">Update</th>
//                   <th className="p-4 text-left">Attachments</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {complaints.map((c) => (
//                   <tr key={c.id} className="border-b hover:bg-gray-50">
//                     <td className="p-4">{c.citizenAadhaar}</td>
//                     <td className="p-4">{c.city}</td>
//                     <td className="p-4">{c.area}</td>
//                     <td className="p-4 text-gray-600">
//                       {c.description}
//                     </td>
//                     <td className="p-4">
//                       <span
//                         className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[c.status]}`}
//                       >
//                         {c.status}
//                       </span>
//                     </td>
//                     <td className="p-4">
//                       <select
//                         value={c.status}
//                         onChange={(e) =>
//                           changeStatus(c.id, e.target.value)
//                         }
//                         className="border rounded px-2 py-1"
//                       >
//                         <option value="OPEN">OPEN</option>
//                         {/* <option value="IN_PROGRESS">IN_PROGRESS</option> */}
//                         <option value="RESOLVED">RESOLVED</option>
//                       </select>
//                     </td>
//                     <td className="p-4">
//   <button
//     onClick={() => loadAttachments(c.id)}
//     className="text-indigo-600 underline"
//   >
//     View Attachments
//   </button>

//   {attachments[c.id]?.map(att => (
//     <div key={att.id} className="text-sm text-gray-500">
//       <a href={att.fileUrl} target="_blank">
//         {att.fileName}
//       </a>
//     </div>
//   ))}
// </td>

//                   </tr>
//                 ))}

//                 {complaints.length === 0 && (
//                   <tr>
//                     <td colSpan="6" className="p-6 text-center text-gray-400">
//                       No complaints found
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

// export default Admindashboard;



import { useEffect, useState, useMemo } from "react";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const STATUS_STYLES = {
  OPEN: "bg-red-100 text-red-600",
  IN_PROGRESS: "bg-yellow-100 text-yellow-700",
  RESOLVED: "bg-green-100 text-green-600",
};

function Admindashboard() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [attachments, setAttachments] = useState({});

  const [filters, setFilters] = useState({
    city: "",
    area: "",
    status: "",
  });

  /* ---------------- LOAD COMPLAINTS ---------------- */
  const loadComplaints = async () => {
    try {
      const res = await api.get("/api/complaints");
      setComplaints(res.data.data || []);
    } catch {
      setError("Unable to load complaints");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadComplaints();
  }, []);

  /* ---------------- ATTACHMENTS ---------------- */
  const loadAttachments = async (complaintId) => {
    if (attachments[complaintId]) return;

    const res = await api.get(
      `/api/attachments/complaint/${complaintId}`
    );

    setAttachments((prev) => ({
      ...prev,
      [complaintId]: res.data.data || [],
    }));
  };

  /* ---------------- STATUS UPDATE ---------------- */
  const changeStatus = async (id, newStatus) => {
    try {
      await api.put(`/api/complaints/${id}/status`, {
        status: newStatus,
      });
      loadComplaints();
    } catch {
      alert("Status update failed");
    }
  };

  /* ---------------- FILTER LOGIC (NEW) ---------------- */
  const filteredComplaints = useMemo(() => {
    return complaints.filter((c) => {
      return (
        (!filters.city ||
          c.city?.toLowerCase().includes(filters.city.toLowerCase())) &&
        (!filters.area ||
          c.area?.toLowerCase().includes(filters.area.toLowerCase())) &&
        (!filters.status || c.status === filters.status)
      );
    });
  }, [complaints, filters]);

  /* ---------------- EXCEL EXPORT (NEW) ---------------- */
  const downloadExcel = () => {
    const data = filteredComplaints.map((c) => ({
      ID: c.id,
      Aadhaar: c.citizenAadhaar,
      City: c.city,
      Area: c.area,
      Description: c.description,
      Status: c.status,
      CreatedAt: new Date(c.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([excelBuffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "filtered-complaints.xlsx"
    );
  };

  return (
    <MainLayout>
      <div className="p-8 bg-gray-100 min-h-screen">

        {/* HEADER */}
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="opacity-90">
            Manage complaints for your department
          </p>
        </div>

        <div className="bg-white p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">
          <input
            placeholder="Filter by City"
            className="border p-2 rounded"
            value={filters.city}
            onChange={(e) =>
              setFilters({ ...filters, city: e.target.value })
            }
          />
          <input
            placeholder="Filter by Area"
            className="border p-2 rounded"
            value={filters.area}
            onChange={(e) =>
              setFilters({ ...filters, area: e.target.value })
            }
          />
          <select
            className="border p-2 rounded"
            value={filters.status}
            onChange={(e) =>
              setFilters({ ...filters, status: e.target.value })
            }
          >
            <option value="">All Status</option>
            <option value="OPEN">OPEN</option>
            <option value="RESOLVED">RESOLVED</option>
          </select>

          <button
            onClick={downloadExcel}
            className="ml-auto bg-green-600 text-white px-4 py-2 rounded"
          >
            Download Excel
          </button>
        </div>

        {loading && <p>Loading complaints...</p>}
        {error && <p className="text-red-600">{error}</p>}

        {!loading && !error && (
          <div className="bg-white rounded-xl shadow-lg overflow-x-auto">
            <table className="w-full">
              <thead className="bg-indigo-50 text-indigo-700">
                <tr>
                  <th className="p-4 text-left">Citizen Aadhaar</th>
                  <th className="p-4 text-left">City</th>
                  <th className="p-4 text-left">Area</th>
                  <th className="p-4 text-left">Description</th>
                  <th className="p-4 text-left">Status</th>
                  <th className="p-4 text-left">Update</th>
                  <th className="p-4 text-left">Attachments</th>
                </tr>
              </thead>
              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{c.citizenAadhaar}</td>
                    <td className="p-4">{c.city}</td>
                    <td className="p-4">{c.area}</td>
                    <td className="p-4 text-gray-600">{c.description}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${STATUS_STYLES[c.status]}`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <select
                        value={c.status}
                        onChange={(e) =>
                          changeStatus(c.id, e.target.value)
                        }
                        className="border rounded px-2 py-1"
                      >
                        <option value="OPEN">OPEN</option>
                        <option value="RESOLVED">RESOLVED</option>
                      </select>
                    </td>
                    <td className="p-4">
                      <button
                        onClick={() => loadAttachments(c.id)}
                        className="text-indigo-600 underline"
                      >
                        View Attachments
                      </button>

                      {attachments[c.id]?.map((att) => (
                        <div key={att.id} className="text-sm text-gray-500">
                          <a href={att.fileUrl} target="_blank">
                            {att.fileName}
                          </a>
                        </div>
                      ))}
                    </td>
                  </tr>
                ))}

                {filteredComplaints.length === 0 && (
                  <tr>
                    <td colSpan="7" className="p-6 text-center text-gray-400">
                      No complaints found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default Admindashboard;
