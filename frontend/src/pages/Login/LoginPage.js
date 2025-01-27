import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components/Loader";
import { loginUser } from "../../redux/actions/userActions";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [forgotPassword, setForgotPassword] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [message, setMessage] = useState("");

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

  const handleForgotPasswordSubmit = (e) => {
    e.preventDefault();
    setForgotPasswordLoading(true);

    // Make an API call to send a password reset link
    // Replace with actual API call to reset password
    fetch("http://localhost:5000/api/auth/forgot-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: forgotPasswordEmail }),
    })
      .then((res) => res.json())
      .then((data) => {
        setMessage(data.message || "Password reset link sent successfully.");
        setForgotPasswordLoading(false);
        setForgotPassword(false); // Close forgot password form after success
      })
      .catch((error) => {
        setMessage("An error occurred. Please try again.");
        setForgotPasswordLoading(false);
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
        {forgotPassword ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
            <form onSubmit={handleForgotPasswordSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Enter your email</label>
                <input
                  type="email"
                  name="email"
                  value={forgotPasswordEmail}
                  onChange={(e) => setForgotPasswordEmail(e.target.value)}
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
                {forgotPasswordLoading ? "Sending..." : "Send Reset Link"}
              </button>
            </form>
            <div className="mt-4 text-center text-sm">
              <span
                onClick={() => setForgotPassword(false)}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Back to Login
              </span>
            </div>
            {message && (
              <div className="mt-4 text-center text-sm text-gray-500">{message}</div>
            )}
          </>
        ) : (
          <>
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
            <div className="mt-2 text-sm text-center">
              <span
                onClick={() => setForgotPassword(true)}
                className="text-indigo-600 hover:underline cursor-pointer"
              >
                Forgot Password?
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginPage;
