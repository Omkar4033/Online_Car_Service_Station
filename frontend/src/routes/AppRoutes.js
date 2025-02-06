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
import ContactInfo from "../pages/Dashboard/CustomerPanel/ContactInfo";
import PaymentPage from "../pages/Dashboard/CustomerPanel/PaymentPage";
import MyCars from "../pages/Dashboard/CustomerPanel/MyCars";
import UserSettings from "../pages/Dashboard/CustomerPanel/Settings";
import CustomerBookings from "../pages/Dashboard/CustomerPanel/CustomerBookings";
import OrderConfirmationPage from "../pages/Dashboard/CustomerPanel/OrderConfirmation";
import SelectCar from "../pages/Dashboard/CustomerPanel/SelectCar";
import BookingDetails from "../pages/Dashboard/CustomerPanel/BookingDetails";

// Admin Panel
import AdminDashboard from "../pages/Dashboard/AdminPanel/AdminDashboard";
import AdminAllBookings from "../pages/Dashboard/AdminPanel/AdminAllBookings";
import AdminAllServices from "../pages/Dashboard/AdminPanel/AdminAllServices";
import AddService from "../pages/Dashboard/AdminPanel/AdminAddService";
import ViewReport from "../pages/Dashboard/AdminPanel/AdminReports";
import FeedbackResponse from "../pages/Dashboard/AdminPanel/AdminFeedback";
import AdminAllUsers from "../pages/Dashboard/AdminPanel/AdminAllUsers";
import AdminAllMechanics from "../pages/Dashboard/AdminPanel/AdminAllMechanics";
import AdminAllCars from "../pages/Dashboard/AdminPanel/AdminAllCars";

// Mechanic Panel
import MechanicDashboard from "../pages/Dashboard/MechanicPanel/MechanicDashboard";
import MechanicPendingJobs from "../pages/Dashboard/MechanicPanel/MechanicPendingJobs";
import MechanicFeedback from "../pages/Dashboard/MechanicPanel/MechanicFeedback";
import MechanicJobHistory from "../pages/Dashboard/MechanicPanel/MechanicJobHistory";
import MechanicAcceptedJobs from "../pages/Dashboard/MechanicPanel/MechanicAcceptedJobs";
import MechanicUpdateJobStatus from "../pages/Dashboard/MechanicPanel/MechanicUpdateJobStatus";

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
    <Route path="/user/contact-info" element={<ContactInfo />} />
    <Route path="/user/confirmation" element={<OrderConfirmationPage />} />
    <Route path="/user/select-car" element={<SelectCar />} />
    <Route path="/user/booking/:bookingId" element={<BookingDetails />} />

    {/* Admin Routes */}
    <Route path="/admin/dashboard" element={<AdminDashboard />} />
    <Route path="/admin/all-bookings" element={<AdminAllBookings />} />
    <Route path="/admin/all-services" element={<AdminAllServices />} />
    <Route path="/admin/all-users" element={<AdminAllUsers />} />
    <Route path="/admin/all-mechanics" element={<AdminAllMechanics />} />
    <Route path="/admin/all-cars" element={<AdminAllCars />} />
    <Route path="/admin/add-service" element={<AddService />} />
    <Route path="/admin/view-report" element={<ViewReport />} />
    <Route path="/admin/feedback-response" element={<FeedbackResponse />} />

    {/* mechanic Routes */}
    <Route path="/mechanic/dashboard" element={<MechanicDashboard />} />
    <Route path="/mechanic/pending-jobs" element={<MechanicPendingJobs />} />
    <Route path="/mechanic/job-history" element={<MechanicJobHistory />} />
    <Route path="/mechanic/update-job-status" element={<MechanicUpdateJobStatus />}/>
    <Route path="/mechanic/accepted-jobs" element={<MechanicAcceptedJobs />} />
    <Route path="/mechanic/feedback" element={<MechanicFeedback />} />

    {/* Catch-all for 404 */}
    <Route path="*" element={<PageNotFound />} />
  </Routes>
);

export default AppRoutes;
