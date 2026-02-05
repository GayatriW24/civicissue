import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";

const ISSUES = [
  { id: "POTHOLE", label: "Water", icon: "💧" },
  { id: "GARBAGE", label: "Garbage", icon: "🗑️" },
  { id: "STREETLIGHT", label: "Street Light", icon: "💡" },
];

function CitizenDashboard() {
  const navigate = useNavigate();

  return (
    <MainLayout>
      <div className="p-8 bg-gray-100 min-h-screen">

        <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg">
          <h1 className="text-3xl font-bold">Citizen Dashboard</h1>
          <p className="text-indigo-100 mt-1">
            Report civic issues in your area quickly and easily
          </p>
        </div>

        <h2 className="text-xl font-semibold mb-4 text-gray-700">
          Select an issue to report
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {ISSUES.map((issue) => (
            <button
              key={issue.id}
              onClick={() =>
                navigate("/citizen/report", { state: { issue } })
              }
              className="bg-white p-6 rounded-xl shadow
                         hover:shadow-lg hover:-translate-y-1
                         transition transform text-center"
            >
              <div className="text-4xl mb-3">{issue.icon}</div>
              <div className="text-lg font-semibold text-gray-800">
                {issue.label}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                Click to report this issue
              </p>
            </button>
          ))}
        </div>

      </div>
    </MainLayout>
  );
}

export default CitizenDashboard;
