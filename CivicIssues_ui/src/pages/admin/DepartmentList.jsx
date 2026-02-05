import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axiosInstance";
import MainLayout from "../../layouts/MainLayout";

function DepartmentList() {
  const [departments, setDepartments] = useState([]);
  const [categories, setCategories] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/api/departments")
      .then(res => setDepartments(res.data.data));
  }, []);

  const loadCategories = async (deptId) => {
    const res = await api.get(`/api/categories/department/${deptId}`);
    setCategories(prev => ({ ...prev, [deptId]: res.data.data }));
  };

  return (
    <MainLayout>
      <div className="p-8">
        <button onClick={() => navigate("/super-admin")} className="mb-4 underline">
          ← Back
        </button>

        {departments.map(d => (
          <div key={d.id} className="bg-white p-4 rounded shadow mb-4">
            <h3 className="font-bold">{d.name}</h3>
            <p>{d.description}</p>

            <button
              onClick={() => loadCategories(d.id)}
              className="text-indigo-600 underline mt-2"
            >
              View Categories
            </button>

            {categories[d.id]?.length > 0 && (
              <ul className="mt-2 list-disc ml-5">
                {categories[d.id].map(c => (
                  <li key={c.id}>{c.name}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </MainLayout>
  );
}

export default DepartmentList;
