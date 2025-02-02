import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProgressBar from "./ProgressBar"; // Import the progress bar component
import { Link } from "react-router-dom";

const ContactInfo = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const [contactDetails, setContactDetails] = React.useState({
    firstName: "",
    lastName: "",
    mobile: "",
    bookingDate: "",
    address: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
  });

  const navigate = useNavigate();

  // Function to handle input changes for contact details
  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactDetails({ ...contactDetails, [name]: value });
  };

  const handleNext = () => {
    localStorage.setItem("contactDetails", JSON.stringify(contactDetails));
    navigate("/user/payment");
  };

  const handleBack = () => {
    navigate("/user/cart"); // Navigate back to the cart page
  };

  return (
    <div
      className={`min-h-screen flex flex-col justify-center items-center p-6 ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >

      <div className="w-full max-w-4xl space-y-6">
      {/* Progress Bar */}
      <ProgressBar currentStep="contact-info" darkMode={darkMode} />

        <div
          className={`p-4 border-2 rounded-lg ${
            darkMode ? "border-gray-700" : "border-gray-300"
          }`}
        >
          <h2 className="text-2xl font-bold mb-4">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.keys(contactDetails).map((key) => (
              <div className="mb-4" key={key}>
                <label className="block text-sm font-medium mb-1">
                  {key.replace(/([A-Z])/g, " $1").replace(/^./, (str) =>
                    str.toUpperCase()
                  )}
                </label>
                <input
                  type="text"
                  name={key}
                  value={contactDetails[key]}
                  onChange={handleContactChange}
                  className={`w-full px-3 py-2 rounded-md border ${
                    darkMode
                      ? "bg-gray-700 border-gray-600 text-gray-100"
                      : "bg-gray-100 border-gray-300 text-gray-800"
                  }`}
                  placeholder={`Enter your ${key}`}
                />
              </div>
            ))}
          </div>

          
        </div>
           <div className="flex justify-between mt-8">
                    <Link to="/user/select-car">
                      <button
                        className={`px-6 py-3 rounded-md font-semibold ${
                          darkMode
                            ? "bg-gray-500 text-gray-900 hover:bg-gray-400"
                            : "bg-gray-300 text-white hover:bg-gray-400"
                        }`}
                      >
                        Back
                      </button>
                    </Link>
          
                    <Link to="/user/payment">
                      <button
                        className={`px-6 py-3 rounded-md font-semibold ${
                          darkMode
                            ? "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
                            : "bg-yellow-400 text-white hover:bg-yellow-500"
                        }`}
                      >
                        Next
                      </button>
                    </Link>
                  </div>
      </div>
    </div>
  );
};

export default ContactInfo;
