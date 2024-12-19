import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // Hook to access Redux state
import Logo from "./Logo";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  // Access the dark mode state from Redux store
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  useEffect(() => {
    const htmlElement = document.documentElement;

    // Apply dark mode or light mode to the root element based on Redux state
    if (darkMode) {
      htmlElement.classList.add("dark");
      htmlElement.classList.remove("light");
    } else {
      htmlElement.classList.remove("dark");
      htmlElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <footer className={`py-10 ${darkMode ? "bg-gray-900 text-gray-300" : "bg-gray-100 text-gray-800"}`}>
      <div className="container mx-auto px-4">
        {/* Top Section: Logo and Navigation */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          {/* Logo and Tagline */}
          <div className="flex items-center space-x-3 mb-6 md:mb-0">
            <Logo />
            <span className={`text-xl font-bold ${darkMode ? "text-yellow-400" : "text-blue-600"}`}>Wheely</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex space-x-6 text-sm font-medium">
            <li>
              <Link to="/" className="text-yellow-100">
                Home
              </Link>
            </li>
            <li>
              <Link to="/services" className="text-yellow-100">
                Services
              </Link>
            </li>
            <li>
              <Link to="/about" className="text-yellow-100">
                About Us
              </Link>
            </li>
            <li>
              <Link to="/contact" className="text-yellow-100">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Middle Section: Social Media Links */}
        <div className="flex justify-center space-x-6 mb-6">
          <a href="https://www.facebook.com" className={`text-gray-700 hover:text-yellow-300  ${darkMode ? "text-yellow-100" : ""}`}>
            <FaFacebookF size={20} />
          </a>
          <a href="https://www.twitter.com" className={`text-gray-700 hover:text-yellow-300  ${darkMode ? "text-yellow-100" : ""}`}>
            <FaTwitter size={20} />
          </a>
          <a href="https://www.instagram.com" className={`text-gray-700 hover:text-yellow-300 ${darkMode ? "text-yellow-100" : ""}`}>
            <FaInstagram size={20} />
          </a>
          <a href="https://www.linkedin.com" className={`text-gray-700 hover:text-yellow-300 ${darkMode ? "text-yellow-100" : ""}`}>
            <FaLinkedin size={20} />
          </a>
        </div>

        {/* Divider */}
        <hr className="border-gray-700 mb-6" />

        {/* Bottom Section: Copyright */}
        <div className="text-center text-xs">
          <p>
            © {new Date().getFullYear()} Wheely. All Rights Reserved. Built with
            <span className="text-red-500 mx-1">❤</span> by Your Team.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
