// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { motion } from "framer-motion";
// import api from "../../api/axiosInstance";
// import MainLayout from "../../layouts/MainLayout";
// import AuthError from "../../components/AuthError";

// const CATEGORY_MAP = {
//   POTHOLE: 1,
//   GARBAGE: 2,
//   STREETLIGHT: 3,
// };

// function ReportIssue() {
//   const { state } = useLocation();
//   const navigate = useNavigate();
//   const issue = state?.issue;

//   const [city, setCity] = useState("");
//   const [area, setArea] = useState("");
//   const [description, setDescription] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [file, setFile] = useState(null);


//   // ❌ MISSING CONTEXT (IMPORTANT)
//   if (!issue) {
//     return (
//       <AuthError
//         title="Missing Issue Selection"
//         message="You reached this page directly. Please select an issue first."
//         actionText="Go to Citizen Dashboard"
//         actionPath="/citizen"
//       />
//     );
//   }

//   const submit = async () => {
//     setLoading(true);
//     try {
//       const res =await api.post("/api/complaints", {
//         departmentId: 1,
//         categoryId: CATEGORY_MAP[issue.id],
//         city,
//         area,
//         description,
//       });
//        const complaintId = res.data.data.id;

//     // 2️⃣ Upload attachment if file is selected
//     if (file) {
//       const formData = new FormData();
//       formData.append("complaintId", complaintId);
//       formData.append("file", file);

//       await api.post("/api/attachments", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//     }
    
//       navigate("/citizen/mycomplaint");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <MainLayout>
//       <motion.div
//         className="p-8 bg-gray-100 min-h-screen"
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//       >

//         <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
//           <h1 className="text-3xl font-bold">
//             Report {issue.label}
//           </h1>
//           <p className="text-indigo-100 mt-1">
//             Provide accurate details to help authorities resolve the issue
//           </p>
//         </div>

//         <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6">
//           <input
//             placeholder="City"
//             onChange={(e) => setCity(e.target.value)}
//             className="w-full border rounded p-2"
//           />
//           <input
//             placeholder="Area"
//             onChange={(e) => setArea(e.target.value)}
//             className="w-full border rounded p-2"
//           />
//           <textarea
//             placeholder="Description"
//             onChange={(e) => setDescription(e.target.value)}
//             className="w-full border rounded p-2"
//           />
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files[0])} // get the first file
//             className="w-full border rounded p-2"
//           />


//           <div className="flex justify-end gap-4">
//             <button onClick={() => navigate(-1)}>Back</button>
//             <button onClick={submit} disabled={loading}>
//               {loading ? "Submitting..." : "Submit"}
//             </button>
//           </div>
//         </div>

//       </motion.div>
//     </MainLayout>
//   );
// }

// export default ReportIssue;

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";
import AuthError from "../../components/AuthError";

function ReportIssue() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const issue = state?.issue;

  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState([]);

  const [departmentId, setDepartmentId] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [city, setCity] = useState("");
  const [area, setArea] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  if (!issue) {
    return (
      <AuthError
        title="Missing Issue Selection"
        message="You reached this page directly. Please select an issue first."
        actionText="Go to Citizen Dashboard"
        actionPath="/citizen"
      />
    );
  }

  useEffect(() => {
    api.get("/api/departments")
      .then(res => setDepartments(res.data.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!departmentId) return;

    api.get(`/api/categories/department/${departmentId}`)
      .then(res => setCategories(res.data.data))
      .catch(console.error);
  }, [departmentId]);


  
  const submit = async () => {
    setLoading(true);
    try {
      const res = await api.post("/api/complaints", {
        departmentId,
        categoryId,
        city,
        area,
        description,
      });

      const complaintId = res.data.data.id;

      if (file) {
        const formData = new FormData();
        formData.append("complaintId", complaintId);
        formData.append("file", file);

        await api.post("/api/attachments", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      navigate("/citizen/mycomplaint");
    } finally {
      setLoading(false);
    }
  };

  return (
    <MainLayout>
      <motion.div
        className="p-8 bg-gray-100 min-h-screen"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <h1 className="text-3xl font-bold">
            Report {issue.label}
          </h1>
          <p className="text-indigo-100 mt-1">
            Provide accurate details to help authorities resolve the issue
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-xl space-y-6">

          {/* Department */}
          <select
            value={departmentId}
            onChange={(e) => {
              setDepartmentId(e.target.value);
              setCategoryId("");
            }}
            className="w-full border rounded p-2"
          >
            <option value="">Select Department</option>
            {departments.map(dep => (
              <option key={dep.id} value={dep.id}>
                {dep.name}
              </option>
            ))}
          </select>

          {/* Category */}
          <select
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
            disabled={!departmentId}
            className="w-full border rounded p-2"
          >
            <option value="">Select Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>

          <input
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            className="w-full border rounded p-2"
          />

          <input
            placeholder="Area"
            onChange={(e) => setArea(e.target.value)}
            className="w-full border rounded p-2"
          />

          <textarea
            placeholder="Description"
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded p-2"
          />

          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full border rounded p-2"
          />

          <div className="flex justify-end gap-4">
            <button onClick={() => navigate(-1)}>Back</button>
            <button
              onClick={submit}
              disabled={loading || !departmentId || !categoryId}
            >
              {loading ? "Submitting..." : "Submit"}
            </button>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
}

export default ReportIssue;
