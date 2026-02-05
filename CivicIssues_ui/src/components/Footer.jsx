import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-16">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        <div>
          <h2 className="text-xl font-bold text-white mb-2">
            CivicIssues
          </h2>
          <p className="text-sm text-gray-400">
            A nationwide civic grievance management platform empowering citizens
            to report and track civic issues across India.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/" className="hover:text-white">
                Home
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-white">
                Login
              </Link>
            </li>
            <li>
              <Link to="/register" className="hover:text-white">
                Register
              </Link>
            </li>
            <li>
              <Link to="/citizen/dashboard" className="hover:text-white">
                Report Issue
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Support</h3>
          <p className="text-sm text-gray-400">
            Email: support@civicissues.in
          </p>
          <p className="text-sm text-gray-400">
            Helpline: +91 99999 88888
          </p>
        </div>
      </div>

      <div className="border-t border-gray-800 py-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} CivicIssues. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
