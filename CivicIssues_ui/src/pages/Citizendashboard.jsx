import { useState } from "react";
import MainLayout from "../layouts/MainLayout";

const issues = [
  { id: "POTHOLE", label: "Pothole", icon: "🕳️" },
  { id: "GARBAGE", label: "Roadside Garbage", icon: "🗑️" },
  { id: "STREETLIGHT", label: "Broken Streetlight", icon: "💡" },
  { id: "WATERLOGGING", label: "Waterlogging", icon: "💧" },
  { id: "FLOOD", label: "Flood", icon: "🌊" },
  { id: "DUMPING", label: "Illegal Dumping", icon: "🚫" },
  { id: "PARKING", label: "Illegal Parking", icon: "🚗" },
  { id: "OTHER", label: "Other", icon: "❓" },
];

function CitizenDashboard() {
  const [selectedIssue, setSelectedIssue] = useState(null);

  return (
    <MainLayout>
      {/* HEADER */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 py-12 text-center text-white">
        <h1 className="text-3xl font-bold mb-2">
          Report by clicking Photo & Get Leader-
          <br />
          Giotag, Certificate, Complaint & Legal Notice
        </h1>
        <p className="text-sm opacity-90">
          Help improve our India by reporting civic issues
        </p>
      </div>

      {/* CONTENT */}
      <div className="max-w-5xl mx-auto px-6 py-10">
        <h2 className="text-xl font-semibold mb-1">
          What type of civic issue are you reporting?
        </h2>
        <p className="text-gray-500 mb-6">
          Select the category that best describes the issue
        </p>

        {/* ISSUE GRID */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {issues.map((issue) => (
            <button
              key={issue.id}
              onClick={() => setSelectedIssue(issue)}
              className={`border rounded-xl p-6 flex flex-col items-center gap-3 transition
                ${
                  selectedIssue?.id === issue.id
                    ? "border-indigo-600 bg-indigo-50"
                    : "hover:border-indigo-400"
                }`}
            >
              <span className="text-3xl">{issue.icon}</span>
              <span className="text-sm font-medium text-gray-700">
                {issue.label}
              </span>
            </button>
          ))}
        </div>

        {/* SELECTED INFO */}
        {selectedIssue && (
          <div className="mt-8 bg-gray-50 p-4 rounded text-gray-700">
            <strong>{selectedIssue.label}</strong>
            <p className="text-sm mt-1">
              Continue to report a {selectedIssue.label.toLowerCase()} issue.
            </p>

            <button className="mt-4 bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
              Continue
            </button>
          </div>
        )}
      </div>
    </MainLayout>
  );
}

export default CitizenDashboard;
