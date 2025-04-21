import React, { useEffect, useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const navigate = useNavigate();
  const location = useLocation(); // 👈 detect route change

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserName(decoded.Name || decoded.name || "User");
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("authToken");
        setIsLoggedIn(false);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, [location]); // 👈 re-check token whenever route changes

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
    navigate("/"); // redirect to home after logout
  };

  return (
    <nav className="bg-white bg-opacity-90 backdrop-blur-md sticky top-0 z-50 shadow-md font-title3 font-bold">
      <div className="container flex items-center justify-between mx-auto h-20 px-6 md:px-12">
        {/* Logo */}
        <div className="h-[70px] w-[70px]">
          <NavLink to="/">
            <img src="/images/1.png" alt="Logo" className="h-full w-full object-contain" />
          </NavLink>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-3xl text-green-600 hover:text-green-700 transition-colors"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* Navigation Links */}
        <div
          className={`absolute md:static top-20 left-0 w-full md:w-auto md:flex bg-white md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen
              ? "translate-x-0 opacity-100 shadow-lg"
              : "-translate-x-full opacity-0 md:opacity-100 md:translate-x-0"
          }`}
        >
          <ul className="flex flex-col md:flex-row md:items-center space-y-6 md:space-y-0 md:space-x-8 text-lg font-medium p-6 md:p-0 text-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `relative transition-all duration-300 group ${
                    isActive ? "text-green-600 font-bold" : "text-gray-800"
                  } hover:text-green-500`
                }
              >
                Home
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `relative transition-all duration-300 group ${
                    isActive ? "text-green-600 font-bold" : "text-gray-800"
                  } hover:text-green-500`
                }
              >
                About us
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/foodblog"
                className={({ isActive }) =>
                  `relative transition-all duration-300 group ${
                    isActive ? "text-green-600 font-bold" : "text-gray-800"
                  } hover:text-green-500`
                }
              >
                Food blog
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/contactus"
                className={({ isActive }) =>
                  `relative transition-all duration-300 group ${
                    isActive ? "text-green-600 font-bold" : "text-gray-800"
                  } hover:text-green-500`
                }
              >
                Contact us
                <span className="absolute left-0 bottom-0 w-0 h-[2px] bg-green-500 transition-all duration-300 group-hover:w-full"></span>
              </NavLink>
            </li>

            {/* Auth Links */}
            <li className="flex items-center space-x-3">
              {!isLoggedIn ? (
                <>
                  <NavLink to="/login" className="p-1 hover:text-green-600 transition-colors">
                    Login /
                  </NavLink>
                  <NavLink to="/signup" className="p-1 hover:text-green-600 transition-colors">
                    Sign up
                  </NavLink>
                </>
              ) : (
                <>
                  <span className="text-green-700">Hi, {userName.split(" ")[0]}</span>
                  <button
                    onClick={handleLogout}
                    className="p-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sign out
                  </button>
                </>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
