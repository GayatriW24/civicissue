import { useEffect, useState } from "react";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";

function MyComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [attachments, setAttachments] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [rating, setRating] = useState({});
  const [comment, setComment] = useState({});
  const [submitting, setSubmitting] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* -------------------- LOAD COMPLAINTS -------------------- */
  useEffect(() => {
    const loadComplaints = async () => {
      try {
        const res = await api.get("/api/complaints/my");
        setComplaints(Array.isArray(res.data.data) ? res.data.data : []);
      } catch {
        setError("Failed to fetch complaints.");
      } finally {
        setLoading(false);
      }
    };

    loadComplaints();
  }, []);

  /* -------------------- FILE URL FIX -------------------- */
  const normalizeFileUrl = (url = "") =>
    url.includes("/files/")
      ? url.replace(
          /^http:\/\/localhost(:\d+)?\/files/,
          "http://localhost:8081/files"
        )
      : url;

  /* -------------------- ATTACHMENTS -------------------- */
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
    } catch {
      setAttachments((prev) => ({ ...prev, [complaintId]: [] }));
    }
  };

  /* -------------------- FEEDBACK -------------------- */
  const loadFeedback = async (complaintId) => {
    if (feedbacks[complaintId]) return;

    try {
      const res = await api.get(
        `/api/feedbacks/complaint/${complaintId}`
      );
      setFeedbacks((prev) => ({
        ...prev,
        [complaintId]: res.data.data,
      }));
    } catch {
    }
  };

  useEffect(() => {
    complaints
      .filter((c) => c.status === "RESOLVED")
      .forEach((c) => loadFeedback(c.id));
  }, [complaints]);

  const submitFeedback = async (complaintId) => {
    if (!rating[complaintId]) return;

    setSubmitting(complaintId);
    try {
      const res = await api.post("/api/feedbacks", {
        complaintId,
        rating: Number(rating[complaintId]),
        comment: comment[complaintId]?.trim() || null,
      });

      setFeedbacks((prev) => ({
        ...prev,
        [complaintId]: res.data.data,
      }));
    } finally {
      setSubmitting(null);
    }
  };

  /* -------------------- UI -------------------- */
  return (
    <MainLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-semibold mb-6">My Complaints</h2>

        {loading && <p className="text-gray-500">Loading complaints...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {!loading && !error && complaints.length === 0 && (
          <p className="text-gray-500">No complaints found.</p>
        )}

        {!loading && !error && complaints.length > 0 && (
          <div className="overflow-x-auto bg-white rounded-xl shadow">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-100">
                <tr>
                  <th className="border px-4 py-2">ID</th>
                  <th className="border px-4 py-2">Description</th>
                  <th className="border px-4 py-2">City</th>
                  <th className="border px-4 py-2">Status</th>
                  <th className="border px-4 py-2">Created</th>
                  <th className="border px-4 py-2">Attachments</th>
                  {/* <th className="border px-4 py-2">Feedback</th> */}
                </tr>
              </thead>

              <tbody>
                {complaints.map((c) => (
                  <tr key={c.id} className="hover:bg-gray-50 align-top">
                    <td className="border px-4 py-2">{c.id}</td>
                    <td className="border px-4 py-2">{c.description}</td>
                    <td className="border px-4 py-2">{c.city}</td>
                    <td className="border px-4 py-2">{c.status}</td>
                    <td className="border px-4 py-2">
                      {new Date(c.createdAt).toLocaleString()}
                    </td>

                    {/* ATTACHMENTS */}
                    <td className="border px-4 py-2">
                      <button
                        onClick={() => loadAttachments(c.id)}
                        className="text-indigo-600 underline text-sm"
                      >
                        View Attachments
                      </button>

                      {attachments[c.id]?.map((a) => (
                        <div key={a.id} className="mt-2">
                          {a.fileName?.match(
                            /\.(jpg|jpeg|png|webp)$/i
                          ) ? (
                            <img
                              src={normalizeFileUrl(a.fileUrl)}
                              alt=""
                              className="w-40 rounded border"
                            />
                          ) : (
                            <a
                              href={normalizeFileUrl(a.fileUrl)}
                              target="_blank"
                              rel="noreferrer"
                              className="text-blue-500 underline text-sm"
                            >
                              {a.fileName}
                            </a>
                          )}
                        </div>
                      ))}
                    </td>

                    {/* FEEDBACK */}
                    {/* <td className="border px-4 py-2">
                      {c.status !== "RESOLVED" && (
                        <span className="text-gray-400 text-sm">
                          Available after resolution
                        </span>
                      )}

                      {c.status === "RESOLVED" && (
                        <>
                          {!feedbacks[c.id] ? (
                            <>
                             
                              <div className="flex gap-1 mb-2">
                                {[1, 2, 3, 4, 5].map((r) => (
                                  <button
                                    key={r}
                                    type="button"
                                    onClick={() =>
                                      setRating((prev) => ({
                                        ...prev,
                                        [c.id]: r,
                                      }))
                                    }
                                    className={`px-2 py-1 text-sm rounded border ${
                                      rating[c.id] === r
                                        ? "bg-indigo-600 text-white"
                                        : "bg-white text-gray-600"
                                    }`}
                                  >
                                    {r}
                                  </button>
                                ))}
                              </div>

                             
                              <textarea
                                rows={2}
                                placeholder="Optional comment"
                                value={comment[c.id] || ""}
                                onChange={(e) =>
                                  setComment((prev) => ({
                                    ...prev,
                                    [c.id]: e.target.value,
                                  }))
                                }
                                className="border rounded w-full p-2 text-sm mb-2"
                              />

                              <button
                                onClick={() => submitFeedback(c.id)}
                                disabled={
                                  submitting === c.id || !rating[c.id]
                                }
                                className="bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                              >
                                {submitting === c.id
                                  ? "Submitting..."
                                  : "Submit"}
                              </button>
                            </>
                          ) : (
                            <span className="text-green-600 font-semibold">
                              ⭐ {feedbacks[c.id].rating} / 5
                            </span>
                          )}
                        </>
                      )}
                    </td> */}
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

export default MyComplaints;
