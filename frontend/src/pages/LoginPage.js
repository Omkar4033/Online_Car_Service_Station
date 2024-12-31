import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../components/Loader";
import { loginUser } from "../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    dispatch(loginUser(formData))
      .then(() => {
        setLoading(false);
        navigate("/"); 
      })
      .catch(() => {
        setLoading(false);
      });
  };

 
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
