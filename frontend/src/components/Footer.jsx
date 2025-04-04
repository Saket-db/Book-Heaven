import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  const links = [
    { title: "Home", link: "/" },
    { title: "About Us", link: "/" },
    { title: "All Books", link: "/all-books" },
    { title: "Contact", link: "/" },
  ];

  return (
    <div className="bg-gradient-to-r from-blue-700 to-indigo-900 text-white px-12 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between">
        
        {/* Logo Section */}
        <h2 className="text-4xl font-bold text-white drop-shadow-lg">
          BookHeaven
        </h2>

        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center mt-4 md:mt-0 space-x-6">
          {links.map((item, i) => (
            <Link
              to={item.link}
              key={i}
              className="text-lg text-gray-200 hover:text-white transition duration-300 hover:scale-105"
            >
              {item.title}
            </Link>
          ))}
        </div>

        {/* Social Media Icons */}
        <div className="flex mt-4 md:mt-0 space-x-4">
          <a href="https://github.com/Saket-db" className="text-xl hover:text-gray-300 transition duration-300">
            <FaGithub />
          </a>
          <a href="https://x.com/Saket_db" className="text-xl hover:text-blue-400 transition duration-300">
            <FaTwitter />
          </a>
          <a href="https://www.instagram.com/saket_db/" className="text-xl hover:text-pink-400 transition duration-300">
            <FaInstagram />
          </a>
          <a href="https://www.linkedin.com/in/saket-dwaraka-bhamidipaati-97b56b252/" className="text-xl hover:text-blue-500 transition duration-300">
            <FaLinkedin />
          </a>
        </div>
      </div>

      <hr className="my-6 border-gray-500" />

      {/* Copyright Section */}
      <p className="text-center text-gray-300 text-sm">
        © {new Date().getFullYear()} BookHeaven. All Rights Reserved.
      </p>
    </div>
  );
};

export default Footer;
