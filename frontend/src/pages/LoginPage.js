import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../components/Loader";
import { loginUser } from "../redux/actions/userActions"; // Action to handle login
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const darkMode = useSelector((state) => state.darkMode.isDarkMode); // Get dark mode state

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    if (storedUser) {
      console.log("User data from localStorage:", JSON.parse(storedUser));
    } else {
      console.log("No user data found in localStorage.");
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    dispatch(loginUser(formData))
      .then(() => {
        const storedUser = localStorage.getItem("userData");
        if (storedUser) {
          console.log("User data from localStorage:", JSON.parse(storedUser));
        } else {
          console.log("No user data found in localStorage.");
        }

        setLoading(false);
        navigate("/"); // Redirect to the homepage or other page
      })
      .catch((err) => {
        setLoading(false);
        setError("Login failed. Please try again.");
        console.error(err);
      });
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <div
        className={`max-w-md w-full p-8 rounded-lg shadow-md ${
          darkMode ? "bg-gray-800" : "bg-white"
        }`}
      >
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && (
          <div
            className={`${
              darkMode ? "bg-red-800 text-red-100" : "bg-red-100 text-red-700"
            } px-4 py-2 rounded mb-4`}
          >
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
              }`}
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
              }`}
            />
          </div>
          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring ${
              darkMode ? "bg-indigo-600 text-gray-100" : "bg-indigo-600 text-white"
            }`}
          >
            Login
          </button>
        </form>
        <div className="mt-4 text-sm text-center">
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/register")}
            className="text-indigo-600 hover:underline cursor-pointer"
          >
            Register here
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
