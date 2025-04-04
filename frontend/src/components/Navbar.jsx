import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const role = useSelector((state) => state.auth.role);
  const [isNavOpen, setIsNavOpen] = useState(false);

  // Filtered Navigation Links
  const links = [
    { title: "Home", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Cart", link: "/cart" },
    { title: "Profile", link: "/profile", role: "user" },
    { title: "Admin Profile", link: "/profile", role: "admin" },
  ].filter((item) => {
    if (!isLoggedIn && item.title === "Cart") return false;
    if (isLoggedIn && role === "user" && item.title === "Admin Profile")
      return false;
    if (role === "admin" && item.title === "Profile") return false;
    return true;
  });

  // Toggle Mobile Menu
  const toggleNav = () => setIsNavOpen(!isNavOpen);

  return (
    <>
      {/* Navbar */}
      <nav className="relative flex w-full items-center justify-between bg-zinc-800 py-2 text-white lg:py-4">
        <div className="flex w-full items-center justify-between px-3">
          {/* Logo */}
          <div className="w-3/6 lg:w-1/6">
            <Link to="/" className="flex items-center text-2xl font-semibold">
              <img
                src="https://cdn-icons-png.flaticon.com/128/10433/10433049.png"
                alt="logo"
                className="h-10 mr-4"
              />
              BookHeaven
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={toggleNav}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-7 text-white"
            >
              <path d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" />
            </svg>
          </button>

          {/* Desktop Navbar */}
          <div className="hidden lg:flex items-center space-x-6">
            {links.map(({ title, link }, index) => (
              <Link
                key={index}
                to={link}
                className={`px-3 py-1 transition duration-300 ${
                  title.includes("Profile")
                    ? "border border-blue-500 rounded hover:bg-white hover:text-zinc-900"
                    : "hover:text-blue-300"
                }`}
              >
                {title}
              </Link>
            ))}

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  className="border border-blue-500 px-3 py-1 rounded transition hover:bg-white hover:text-zinc-900"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  className="bg-blue-500 px-3 py-1 rounded transition hover:bg-white hover:text-zinc-900"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {isNavOpen && (
        <div className="lg:hidden bg-zinc-800 text-white px-12">
          <div className="flex flex-col items-center">
            {links.map(({ title, link }, index) => (
              <Link
                key={index}
                to={link}
                onClick={toggleNav}
                className={`my-3 px-3 py-1 transition duration-300 ${
                  title.includes("Profile")
                    ? "border border-blue-500 rounded hover:bg-white hover:text-zinc-900"
                    : "hover:text-blue-300"
                }`}
              >
                {title}
              </Link>
            ))}

            {!isLoggedIn && (
              <>
                <Link
                  to="/login"
                  onClick={toggleNav}
                  className="border border-blue-500 px-3 py-1 rounded transition hover:bg-white hover:text-zinc-900"
                >
                  LogIn
                </Link>
                <Link
                  to="/signup"
                  onClick={toggleNav}
                  className="bg-blue-500 px-3 py-1 my-4 rounded transition hover:bg-white hover:text-zinc-900"
                >
                  SignUp
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
