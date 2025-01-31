import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/actions/userActions";
import Loader from "../../components/Loader";
import { Link, useNavigate } from "react-router-dom";

const RegistrationPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNo: "",
    address: "",
    password: "",
    role: "Customer",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    dispatch(registerUser(formData))
      .then(() => {
        setLoading(false);
        navigate("/");
      })
      .catch((err) => {
        setLoading(false);
        setError("Registration failed. Please try again.");
        console.error("Registration Error:", err);
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
        <h2 className="text-2xl font-bold mb-4">Register</h2>
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
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
              }`}
            />
          </div>

          {/* Email Field */}
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

          {/* Phone Number Field */}
          <div>
            <label className="block text-sm font-medium">Phone Number</label>
            <input
              type="text"
              name="phoneNo"
              value={formData.phoneNo}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
              }`}
            />
          </div>

          {/* Address Field */}
          <div>
            <label className="block text-sm font-medium">Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
              }`}
            />
          </div>

          {/* Password Field */}
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

          {/* Role Selection */}
          <div>
            <label className="block text-sm font-medium">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-2 border rounded-md focus:outline-none focus:ring ${
                darkMode ? "bg-gray-700 text-gray-200" : "bg-white text-gray-800"
              }`}
            >
              <option value="Customer">Customer</option>
              <option value="Admin">Admin</option>
              <option value="Mechanic">Mechanic</option>
            </select>
          </div>

          <button
            type="submit"
            className={`w-full py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring ${
              darkMode ? "bg-indigo-600 text-gray-100" : "bg-indigo-600 text-white"
            }`}
          >
            Register
          </button>
        </form>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegistrationPage;
