import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle, FaBars, FaTimes } from "react-icons/fa";


const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const navigate=useNavigate();
  const user=JSON.parse(sessionStorage.getItem("loggedInuser"));

  const handleLogout = ()=>{
    sessionStorage.removeItem("loggedInuser");
    window.location.reload();
  }
  return  <nav className="sticky top-0 z-50 bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        {/* LOGO */}
        <h1
          onClick={() => navigate("/")}
          className="text-lg sm:text-xl font-bold cursor-pointer bg-linear-to-r from-amber-400 to-red-500 bg-clip-text text-transparent"
        >
          AI Career Assistant
        </h1>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-6">
          {/* NAV LINKS */}
          <Link to="/" className="hover:text-amber-400 transition">
            Home
          </Link>
          <Link
            to="/resume-analyzer"
            className="hover:text-amber-400 transition"
          >
            Resume
          </Link>
          <Link to="/chatwithpdf" className="hover:text-amber-400 transition">
            Chat PDF
          </Link>

          {/* USER */}
          <div className="flex items-center gap-3 ml-4">
            <FaUserCircle className="text-2xl text-amber-400" />

            <span className="text-sm">{user?.name || "Guest"}</span>

            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded text-sm"
              >
                Logout
              </button>
            )}
          </div>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-2xl"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* MOBILE MENU */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          menuOpen ? "max-h-96" : "max-h-0"
        }`}
      >
        <div className="bg-slate-900/95 backdrop-blur-lg px-4 py-4 space-y-4 text-center border-t border-white/10">
          {/* LINKS */}
          <Link
            to="/"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-amber-400"
          >
            Home
          </Link>

          <Link
            to="/resume-analyzer"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-amber-400"
          >
            Resume Analyzer
          </Link>

          <Link
            to="/chatwithpdf"
            onClick={() => setMenuOpen(false)}
            className="block hover:text-amber-400"
          >
            Chat with PDF
          </Link>

          {/* USER */}
          <div className="flex flex-col items-center gap-2 pt-2 border-t border-white/10">
            <FaUserCircle className="text-3xl text-amber-400" />
            <span>{user?.name || "Guest"}</span>

            {user && (
              <button
                onClick={handleLogout}
                className="bg-red-500 px-4 py-2 rounded text-white"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>;
};

export default Navbar;
