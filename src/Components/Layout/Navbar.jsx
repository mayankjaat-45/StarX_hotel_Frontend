import { Menu, X, UserCircle, LogOut } from "lucide-react";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";
import logo from "../../assets/logo.png";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  return (
    <nav className="fixed top-0 z-50 w-full bg-(--secondary-beige)/90 backdrop-blur-md shadow-md">
      <div className="max-w-7xl mx-auto px-2 py-3 md:px-1 flex items-center justify-between">
        {/* Logo */}
        {/* <h1
          onClick={() => navigate("/")}
          className="text-2xl font-bold cursor-pointer tracking-wide hover:text-(--primary-orange) transition"
        >
          StarX Hotels
        </h1> */}

        <Link className="w-23 sm:w-32.5" onClick={() => navigate("/")}>
          <img src={logo} alt="StarX Hotels" className="w-full object-fill" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-6 text-sm font-semibold">
          <Link to="/" className="hover:text-(--primary-orange)">
            Home
          </Link>
          <Link to="/hotels" className="hover:text-(--primary-orange)">
            Hotels
          </Link>
          <Link to="/services" className="hover:text-(--primary-orange)">
            Services
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <>
              {/* Avatar */}
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className="flex items-center gap-2 bg-white/60 px-3 py-1.5 rounded-full shadow hover:bg-white transition"
              >
                <div className="w-8 h-8 rounded-full bg-(--primary-orange) text-white flex items-center justify-center font-bold">
                  {user.name?.charAt(0).toUpperCase()}
                </div>
                <span className="text-sm font-semibold">{user.name}</span>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <div className="absolute right-0 top-12 w-40 bg-white rounded-xl shadow-lg overflow-hidden">
                  <button
                    onClick={() => navigate("/profile")}
                    className="w-full px-4 py-2 flex items-center gap-2 text-sm hover:bg-gray-100"
                  >
                    <UserCircle size={16} /> Profile
                  </button>
                  <button
                    onClick={() => {
                      logout();
                      navigate("/login");
                    }}
                    className="w-full px-4 py-2 flex items-center gap-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <>
              <button
                onClick={() => navigate("/login")}
                className="px-4 py-2 rounded-lg border border-(--primary-orange) text-(--primary-orange) font-semibold hover:bg-(--primary-orange) hover:text-white transition"
              >
                Login
              </button>
              <button
                onClick={() => navigate("/register")}
                className="px-4 py-2 rounded-lg bg-(--primary-orange) text-white font-semibold hover:bg-(--hover-orange)"
              >
                Register
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-(--secondary-beige) text-center shadow-xl rounded-b-3xl px-6 py-6 space-y-5">
          <Link
            onClick={() => setIsOpen(false)}
            to="/"
            className="block font-semibold"
          >
            Home
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/hotels"
            className="block font-semibold"
          >
            Hotels
          </Link>
          <Link
            onClick={() => setIsOpen(false)}
            to="/services"
            className="block font-semibold"
          >
            Services
          </Link>

          <div className="pt-4 border-t">
            {user ? (
              <>
                <p className="text-sm mb-2">
                  Hello, <b>{user.name}</b>
                </p>
                <button
                  onClick={() => {
                    logout();
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="w-full py-2 rounded-lg bg-red-500 text-white font-semibold"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    navigate("/login");
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg border border-(--primary-orange) text-(--primary-orange)"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate("/register");
                    setIsOpen(false);
                  }}
                  className="flex-1 py-2 rounded-lg bg-(--primary-orange) text-white"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
