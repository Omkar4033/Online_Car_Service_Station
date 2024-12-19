import React from "react";
import { Routes, Route } from "react-router-dom";

// Import Pages
import Home from "../pages/Home";
import Login from "../pages/LoginPage"
import Register from "../pages/RegisterPage";
import CustomerDashboard from "../pages/Dashboard/CustomerPanel/CustomerDashboard";
import AdminDashboard from "../pages/Dashboard/AdminPanel/AdminDashboard";
import AdminAllServices from "../pages/Dashboard/AdminPanel/AdminAllServices";  // Admin All Services
import AddService from "../pages/Dashboard/AdminPanel/AdminAddService"; // Add Service
import ViewReport from "../pages/Dashboard/AdminPanel/AdminReports"; // View Report
import FeedbackResponse from "../pages/Dashboard/AdminPanel/AdminFeedback"; // Feedback Response
import MechanicDashboard from "../pages/Dashboard/MechanicPanel/MechanicDashboard";
import Services from "../pages/ServicesPage";
import AboutUs from "../pages/AboutUs";
import ResetPasswordPage from "../pages/ResetPassword";
import ContactUsPage from "../pages/ContactUs";
import PageNotFound from "../pages/PageNotFound";
import AdminAllBookings from "../pages/Dashboard/AdminPanel/AdminAllBookings";
import AdminAllUsers from "../pages/Dashboard/AdminPanel/AdminAllUsers";
import CartPage from "../pages/Dashboard/CustomerPanel/CartPage";
import PaymentPage from "../pages/Dashboard/CustomerPanel/PaymentPage";
import MyCars from "../pages/Dashboard/CustomerPanel/MyCars";
import UserSettings from "../pages/Dashboard/CustomerPanel/UserSettings"; // Settings page for customer
import CustomerBookings from "../pages/Dashboard/CustomerPanel/CustomerBookings"; // Bookings page for customer

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
    <Route path="/user/dashboard" element={<CustomerDashboard />} /> {/* Customer Dashboard */}
    <Route path="/user/cart" element={<CartPage />} />  {/* Customer Cart */}
    <Route path="/user/payment" element={<PaymentPage />} />
    <Route path="/user/my-cars" element={<MyCars/>} />
    <Route path="/user/settings" element={<UserSettings />} />  {/* Customer Settings */}
    <Route path="/user/bookings" element={<CustomerBookings />} />  {/* Customer Bookings */}

    {/* Admin Routes */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/all-bookings" element={<AdminAllBookings />} />
    <Route path="/admin/all-services" element={<AdminAllServices />} />  {/* Admin All Services */}
    <Route path="/admin/all-users" element={<AdminAllUsers />} />  {/* Admin All Users */}
    <Route path="/admin/add-service" element={<AddService />} />  {/* Admin Add Service */}
    <Route path="/admin/view-report" element={<ViewReport />} />  {/* Admin View Report */}
    <Route path="/admin/feedback-response" element={<FeedbackResponse />} />  {/* Admin Feedback Response */}
    
    {/* Mechanic Routes */}
    <Route path="/dashboard/mechanic" element={<MechanicDashboard />} />
    
    {/* Catch-all for 404 */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>

);

export default AppRoutes;
