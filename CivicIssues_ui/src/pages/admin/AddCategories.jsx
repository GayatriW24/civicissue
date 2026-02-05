import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import api from "../../api/axiosInstance";


function AddCategories() {
  const departmentId = localStorage.getItem("departmentId");

  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadCategories = async () => {
    try {
      const res = await api.get(
        `/api/categories/department/${departmentId}`
      );
      setCategories(res.data.data || []);
    } catch {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (departmentId) {
      loadCategories();
    }
  }, [departmentId]);

  const createCategory = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (categoryName.trim().length < 3) {
      setError("Category name must be at least 3 characters");
      return;
    }

    try {
      await api.post("/api/categories", {
        name: categoryName,
        departmentId: Number(departmentId), 
      });

      setMessage("Category created successfully");
      setCategoryName("");

      loadCategories();
    } catch {
      setError("Failed to create category");
    }
  };

  return (
    <MainLayout>
      <div className="p-8 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-4">Add Categories</h1>
        <div className="bg-white p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Manage Categories
          </h2>

          {message && <p className="text-green-600 mb-3">{message}</p>}
          {error && <p className="text-red-600 mb-3">{error}</p>}

          <form onSubmit={createCategory} className="flex gap-3 mb-6">
            <input
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              placeholder="Enter category name"
              className="flex-1 border p-2 rounded"
            />

            <button
              type="submit"
              className="bg-indigo-600 text-white px-4 rounded"
            >
              Add
            </button>
          </form>

          {loading && <p className="text-gray-500">Loading categories...</p>}

          {!loading && categories.length === 0 && (
            <p className="text-gray-400">No categories added yet</p>
          )}

          {!loading && categories.length > 0 && (
            <ul className="space-y-2">
              {categories.map((c) => (
                <li
                  key={c.id}
                  className="border rounded px-3 py-2 flex justify-between items-center"
                >
                  <span>{c.name}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </MainLayout>
  );
}

export default AddCategories;
