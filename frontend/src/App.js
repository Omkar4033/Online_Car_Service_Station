import React from 'react';
import { useSelector } from 'react-redux'; // Import the useSelector hook to access Redux state
import Navbar from './components/Navbar';
import AppRoutes from './routes/AppRoutes';
import Footer from './components/Footer';

const App = () => {
  // Get user data from the Redux store (assuming user data is stored in 'state.user')
  const user = useSelector((state) => state.auth.user); // Adjust 'state.auth.user' to match your Redux state
  const isLoggedIn = (user !== null) ? !!user : false ; // Check if user is logged in (i.e., if user data exists)
  const userRole = user!==null ? user.role : "Customer"; // Assuming user data has a role field, otherwise default to "Customer"

  return (
    <div className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100 min-h-screen">
      {/* Pass dynamic data to Navbar */}
      <Navbar userRole={userRole} isLoggedIn={isLoggedIn} />

      {/* Main Routes */}
      <div className="container mx-auto px-4 py-6">
        <AppRoutes />
      </div>

      <Footer />
    </div>
  );
};

export default App;
