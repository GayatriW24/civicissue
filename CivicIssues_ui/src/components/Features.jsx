import { Link } from "react-router-dom";

function Features() {
  return (
    <section className="w-full bg-gradient-to-b from-white to-emerald-50 py-32">
      <div className="max-w-5xl mx-auto px-6 text-center">
        
        <div className="inline-block mb-6">
          <span className="px-5 py-2 rounded-full bg-emerald-100 text-emerald-700 text-sm font-semibold">
            Features
          </span>
        </div>

        <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
          <span className="text-emerald-600">Everything you need</span>
          <br />
          to improve your community
        </h2>

        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          CivicIssues provides a comprehensive platform for citizens and
          administrators to collaborate on civic issues and build stronger
          communities together.
        </p>
      </div>
    </section>
  );
}

export default Features;
