import React from "react";
import { Routes, Route } from "react-router-dom";

// Public Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Login/LoginPage";
import Register from "../pages/Login/RegisterPage";
import ResetPasswordPage from "../pages/Login/ResetPassword";
import AboutUs from "../pages/About/AboutUs";
import ContactUsPage from "../pages/Contact/ContactUs";
import Services from "../pages/Service/ServicesPage";
import PageNotFound from "../pages/PageNotFound";

// Customer Panel
import CustomerDashboard from "../pages/Dashboard/CustomerPanel/CustomerDashboard";
import CartPage from "../pages/Dashboard/CustomerPanel/CartPage";
import PaymentPage from "../pages/Dashboard/CustomerPanel/PaymentPage";
import MyCars from "../pages/Dashboard/CustomerPanel/MyCars";
import UserSettings from "../pages/Dashboard/CustomerPanel/Settings";
import CustomerBookings from "../pages/Dashboard/CustomerPanel/CustomerBookings";

// Admin Panel
import AdminDashboard from "../pages/Dashboard/AdminPanel/AdminDashboard";
import AdminAllBookings from "../pages/Dashboard/AdminPanel/AdminAllBookings";
import AdminAllServices from "../pages/Dashboard/AdminPanel/AdminAllServices";
import AddService from "../pages/Dashboard/AdminPanel/AdminAddService";
import ViewReport from "../pages/Dashboard/AdminPanel/AdminReports";
import FeedbackResponse from "../pages/Dashboard/AdminPanel/AdminFeedback";
import AdminAllUsers from "../pages/Dashboard/AdminPanel/AdminAllUsers";

// Mechanic Panel
import MechanicDashboard from "../pages/Dashboard/MechanicPanel/MechanicDashboard";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/about" element={<AboutUs />} />
    <Route path="/contact" element={<ContactUsPage />} />
    <Route path="/reset-password" element={<ResetPasswordPage />} />
    <Route path="/services" element={<Services />} />

    {/* Customer Routes */}
    <Route path="/user/dashboard" element={<CustomerDashboard />} />
    <Route path="/user/cart" element={<CartPage />} />
    <Route path="/user/payment" element={<PaymentPage />} />
    <Route path="/user/my-cars" element={<MyCars />} />
    <Route path="/user/settings" element={<UserSettings />} />
    <Route path="/user/bookings" element={<CustomerBookings />} />

    {/* Admin Routes */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/all-bookings" element={<AdminAllBookings />} />
    <Route path="/admin/all-services" element={<AdminAllServices />} />
    <Route path="/admin/all-users" element={<AdminAllUsers />} />
    <Route path="/admin/add-service" element={<AddService />} />
    <Route path="/admin/view-report" element={<ViewReport />} />
    <Route path="/admin/feedback-response" element={<FeedbackResponse />} />

    {/* Mechanic Routes */}
    <Route path="/dashboard/mechanic" element={<MechanicDashboard />} />

    {/* Catch-all for 404 */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
