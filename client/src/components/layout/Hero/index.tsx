import { ArrowRight, ShieldCheck, Users } from "lucide-react";
import { Link } from "react-router-dom";

export default function index() {
  return (
    <div className="container mx-auto px-6 py-16 text-center">
      <h2 className="text-5xl font-bold text-gray-800 mb-8">
        Role-Based Candidate Management System
      </h2>
      <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea nobis
        possimus saepe culpa corrupti cupiditate placeat, ut aliquam assumenda
        rerum maxime reiciendis, adipisci tempora? Animi soluta eius
        perspiciatis quis. Deserunt.
      </p>

      {/* Login Buttons */}
      <div className="flex justify-center space-x-6">
        <Link to="/admin/login">
          <button
            className="group bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold 
        flex items-center space-x-2 hover:bg-blue-700 transition-colors"
          >
            <ShieldCheck className="w-5 h-5" />
            <span>Admin Login</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
        <Link to="/login">
          <button
            className="group bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold 
        flex items-center space-x-2 border-2 border-blue-600 hover:bg-blue-50 transition-colors"
          >
            <Users className="w-5 h-5" />
            <span>User Login</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </Link>
      </div>
    </div>
  );
}
