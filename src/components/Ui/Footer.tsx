// components/Footer.jsx
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-10 b">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between gap-6">
          
          {/* Brand */}
          <div>
            <h2 className="text-xl font-bold text-white">MyApp</h2>
            <p className="text-sm mt-2">
              Built with React Router & React Query 🚀
            </p>
          </div>

          {/* Links */}
          <div className="flex flex-col gap-2">
            <h3 className="text-white font-semibold">Quick Links</h3>
            <Link to="/" className="hover:text-white transition">
              Home
            </Link>
            <Link to="/fetch-old" className="hover:text-white transition">
              Fetch Old
            </Link>
            <Link to="/fetch-react-query" className="hover:text-white transition">
              React Query
            </Link>
          </div>

          {/* Extra */}
          <div>
            <h3 className="text-white font-semibold">Contact</h3>
            <p className="text-sm mt-2">Email: support@myapp.com</p>
            <p className="text-sm">Phone: +91 12345 67890</p>
          </div>

        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom */}
        <div className="text-center text-sm">
          © {new Date().getFullYear()} MyApp. All rights reserved.
        </div>

      </div>
    </footer>
  );
}