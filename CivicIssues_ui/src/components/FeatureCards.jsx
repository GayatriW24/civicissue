import { Camera, TrendingUp, Users } from "lucide-react";

function FeatureCards() {
  return (
    <section className="bg-emerald-50 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

          <div className="group bg-white rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-100 mb-6">
              <Camera className="text-emerald-600" size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Report Issues
            </h3>

            <p className="text-gray-600 mb-6">
              Easily report problems with photos, location data, and detailed
              descriptions for faster resolution.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Photo uploads
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Map integration
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Categorized issues
              </li>
            </ul>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-100 mb-6">
              <TrendingUp className="text-emerald-600" size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Track Progress
            </h3>

            <p className="text-gray-600 mb-6">
              Follow the status of your reports from submission to resolution
              with real-time insights.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Real-time updates
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Status notifications
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Resolution timeline
              </li>
            </ul>
          </div>

          <div className="group bg-white rounded-2xl p-8 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
            <div className="w-14 h-14 flex items-center justify-center rounded-xl bg-emerald-100 mb-6">
              <Users className="text-emerald-600" size={28} />
            </div>

            <h3 className="text-xl font-bold text-gray-900 mb-3">
              Community Voting
            </h3>

            <p className="text-gray-600 mb-6">
              Upvote issues in your area to help prioritize what matters most to
              your community.
            </p>

            <ul className="space-y-3 text-gray-700">
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Issue upvoting
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Trending issues
              </li>
              <li className="flex items-center gap-3">
                <span className="text-emerald-500">✔</span> Community feedback
              </li>
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}

export default FeatureCards;
