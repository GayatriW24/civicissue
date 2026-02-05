import { useState } from "react";

const faqs = [
  {
    id: 1,
    question: "What is CivicIssues?",
    answer:
      "CivicIssues is a civic engagement platform that allows citizens to report local issues, track progress, and collaborate with authorities to improve their community.",
    popular: true,
  },
  {
    id: 2,
    question: "How do I report an issue?",
    answer:
      "You can report an issue by logging in, clicking on the 'Report Issue' button, uploading images, selecting a location, and submitting details.",
    popular: false,
  },
  {
    id: 3,
    question: "Is CivicIssues free to use?",
    answer:
      "Yes, CivicIssues is completely free for citizens to report and track issues in their area.",
    popular: true,
  },
  {
    id: 4,
    question: "How can I track the status of my report?",
    answer:
      "Once submitted, you can track the status of your report in real-time from your dashboard.",
    popular: false,
  },
];

export default function FAQ() {
  const [openId, setOpenId] = useState(1);
  const [filter, setFilter] = useState("all"); // 🔹 NEW

  const filteredFaqs =
    filter === "popular"
      ? faqs.filter((faq) => faq.popular)
      : faqs;

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4">
          Frequently Asked Questions
        </h2>
        <p className="text-center text-gray-500 mb-10">
          Find answers to commonly asked questions about Civix platform features
          and services.
        </p>

        <div className="flex justify-center gap-3 mb-10">
          <button
            onClick={() => setFilter("all")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filter === "all"
                ? "bg-emerald-500 text-white"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            All
          </button>

          <button
            onClick={() => setFilter("popular")}
            className={`px-5 py-2 rounded-full font-medium transition ${
              filter === "popular"
                ? "bg-emerald-500 text-white"
                : "bg-emerald-100 text-emerald-700"
            }`}
          >
            Popular
          </button>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq) => (
            <div
              key={faq.id}
              className={`border rounded-2xl transition-all duration-300 ${
                openId === faq.id
                  ? "bg-emerald-50 border-emerald-300"
                  : "bg-white border-gray-200"
              }`}
            >
              <button
                onClick={() =>
                  setOpenId(openId === faq.id ? null : faq.id)
                }
                className="w-full flex justify-between items-center p-5 text-left"
              >
                <div className="flex items-center gap-3">
                  <span className="text-emerald-500 font-bold">?</span>
                  <span className="font-semibold text-lg">
                    {faq.question}
                  </span>

                  {faq.popular && (
                    <span className="text-xs bg-emerald-200 text-emerald-700 px-2 py-1 rounded-full">
                      Popular
                    </span>
                  )}
                </div>

                <span
                  className={`transform transition-transform ${
                    openId === faq.id ? "rotate-180" : ""
                  }`}
                >
                  ⌄
                </span>
              </button>

              {openId === faq.id && (
                <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
