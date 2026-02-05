// 

import { useEffect, useMemo, useState } from "react";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

function ComplaintList() {
  const [complaints, setComplaints] = useState([]);
  const [attachments, setAttachments] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filters, setFilters] = useState({
    city: "",
    area: "",
    status: "",
  });

  useEffect(() => {
    api
      .get("/api/complaints/allComplaints")
      .then((res) => {
        const data = res.data.data;
        setComplaints(Array.isArray(data) ? data : []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch complaints.");
      })
      .finally(() => setLoading(false));
  }, []);

  const normalizeFileUrl = (url) => {
    if (!url) return "";
    if (url.includes("/files/")) {
      return url.replace(
        /^http:\/\/localhost(:\d+)?\/files/,
        "http://localhost:8081/files"
      );
    }
    return url;
  };

  const loadAttachments = async (complaintId) => {
    if (attachments[complaintId]) return;

    try {
      const res = await api.get(
        `/api/attachments/complaint/${complaintId}`
      );

      setAttachments((prev) => ({
        ...prev,
        [complaintId]: res.data.data || [],
      }));
    } catch (err) {
      console.error("Failed to load attachments", err);
      setAttachments((prev) => ({
        ...prev,
        [complaintId]: [],
      }));
    }
  };

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

  const downloadExcel = () => {
    if (filteredComplaints.length === 0) {
      alert("No data to export");
      return;
    }

    const excelData = filteredComplaints.map((c) => ({
      ID: c.id,
      City: c.city,
      Area: c.area,
      Description: c.description,
      Status: c.status,
      "Created At": new Date(c.createdAt).toLocaleString(),
    }));

    const worksheet = XLSX.utils.json_to_sheet(excelData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Complaints");

    const buffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    saveAs(
      new Blob([buffer], {
        type:
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      }),
      "complaints.xlsx"
    );
  };

  return (
    <MainLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">My Complaints</h2>

        <div className="bg-white p-4 rounded-xl shadow mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
          <input
            placeholder="Filter by city"
            className="border rounded p-2"
            value={filters.city}
            onChange={(e) =>
              setFilters({ ...filters, city: e.target.value })
            }
          />

          <input
            placeholder="Filter by area"
            className="border rounded p-2"
            value={filters.area}
            onChange={(e) =>
              setFilters({ ...filters, area: e.target.value })
            }
          />

          <select
            className="border rounded p-2"
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
            className="bg-green-600 text-white rounded px-4 py-2 hover:bg-green-700"
          >
            Download Excel
          </button>
        </div>

        {loading && <p className="text-gray-500">Loading complaints...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {!loading && !error && filteredComplaints.length === 0 && (
          <p className="text-gray-500">No complaints found.</p>
        )}

        {!loading && !error && filteredComplaints.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2 text-left">ID</th>
                  <th className="border px-4 py-2 text-left">Description</th>
                  <th className="border px-4 py-2 text-left">City</th>
                  <th className="border px-4 py-2 text-left">Area</th>
                  <th className="border px-4 py-2 text-left">Status</th>
                  <th className="border px-4 py-2 text-left">Created At</th>
                  <th className="border px-4 py-2 text-left">Attachments</th>
                </tr>
              </thead>

              <tbody>
                {filteredComplaints.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 align-top">
                    <td className="border px-4 py-2">{c.id}</td>
                    <td className="border px-4 py-2">{c.description}</td>
                    <td className="border px-4 py-2">{c.city}</td>
                    <td className="border px-4 py-2">{c.area}</td>
                    <td className="border px-4 py-2">
                      <span
                        className={`px-2 py-1 rounded-full text-white text-xs ${
                          c.status === "OPEN"
                            ? "bg-green-500"
                            : c.status === "RESOLVED"
                            ? "bg-gray-500"
                            : "bg-yellow-500"
                        }`}
                      >
                        {c.status}
                      </span>
                    </td>
                    <td className="border px-4 py-2">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>

                    <td className="border px-4 py-2">
                      <button
                        onClick={() => loadAttachments(c.id)}
                        className="text-indigo-600 underline text-sm"
                      >
                        View Attachments
                      </button>

                      {attachments[c.id]?.length === 0 && (
                        <div className="text-gray-400 text-sm mt-2">
                          No files
                        </div>
                      )}

                      {attachments[c.id]?.map((a) => {
                        const isImage = a.fileName?.match(
                          /\.(jpg|jpeg|png|gif|webp)$/i
                        );

                        return (
                          <div key={a.id} className="mt-2">
                            {isImage ? (
                              <img
                                src={normalizeFileUrl(a.fileUrl)}
                                alt={a.fileName}
                                className="w-40 h-auto rounded border"
                                crossOrigin="anonymous"
                              />
                            ) : (
                              <a
                                href={normalizeFileUrl(a.fileUrl)}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline text-sm"
                              >
                                {a.fileName}
                              </a>
                            )}
                          </div>
                        );
                      })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default ComplaintList;
