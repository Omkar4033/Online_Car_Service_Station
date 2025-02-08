import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setBookingDetails } from "../../../redux/actions/bookingActions"; 
import { useNavigate, Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import axios from "axios";
import ProgressBar from "./ProgressBar";

const Address = () => {
  const darkMode = useSelector((state) => state.darkMode.isDarkMode);
  const user = useSelector((state) => state.userData?.user);
  const booking = useSelector((state) => state.booking);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [newContact, setNewContact] = useState({
    mobile: "",
    landMark: "",
    city: "",
    pinCode: "",
    state: "",
    country: "",
  });

  console.log("contact details -")
  console.log(JSON.stringify(newContact));

  useEffect(() => {
    const fetchContacts = async () => {
      if (user?.userId) {
        try {
          const response = await axios.get(
            `http://localhost:8080/api/address/user/${user.userId}`
          );
          setContacts(response.data);
        } catch (error) {
          console.error("Error fetching contacts:", error);
        }
      }
    };

    fetchContacts();
  }, [user]);

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    dispatch(setBookingDetails({ addressId: contact.addressId }));
    setShowForm(false);
  };

  const handleAddNewContact = () => {
    setShowForm(true);
    setSelectedContact(null);
  };

  const handleInputChange = (e) => {
    setNewContact({ ...newContact, [e.target.name]: e.target.value });
  };

  const handleSubmitNewContact = async (e) => {
    e.preventDefault();
    try {
      const url = `http://localhost:8080/api/address/add/${user?.userId}`;
      const response = await axios.post(url, { ...newContact });
      setContacts([...contacts, response.data]);
      setShowForm(false);
      setNewContact({
        mobile: "",
        landMark: "",
        city: "",
        pinCode: "",
        state: "",
        country: "",
      });
    } catch (error) {
      console.error("Error adding contact:", error);
    }
  };

  const handleNext = () => {
    localStorage.setItem(
      "contactDetails",
      JSON.stringify(selectedContact || newContact)
    );
    navigate("/user/payment");
  };

  return (
    <div
      className={`min-h-screen flex flex-col ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-100 text-gray-800"
      }`}
    >
      <main className="w-full max-w-4xl mx-auto p-6">
        <ProgressBar currentStep="contact-info" darkMode={darkMode} />
        <h2 className="text-2xl font-bold mb-6 text-center">
          Contact Information
        </h2>

        {/* Contact List */}
        {contacts.length > 0 && !showForm && (
          <div className="space-y-4">
            {contacts.map((contact) => (
              <div
                key={contact.addressId}
                className={`p-4 rounded-lg shadow-md cursor-pointer transition-all duration-300 ${
                  selectedContact?.addressId === contact.addressId
                    ? darkMode
                      ? "bg-blue-700 text-white"
                      : "bg-blue-300 text-black"
                    : darkMode
                    ? "bg-gray-800 hover:bg-blue-600"
                    : "bg-white hover:bg-blue-100"
                }`}
                onClick={() => handleSelectContact(contact)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <FaUserCircle size={24} />
                    <div>
                      <h3 className="text-lg font-semibold">{contact.landMark}</h3>
                      <p className="text-sm">{contact.mobile}</p>
                      <p className="text-sm text-gray-500">
                        {`${contact.landMark}, ${contact.city}, ${contact.state}, ${contact.pinCode}, ${contact.country}`}
                      </p>
                    </div>
                  </div>
                  {selectedContact?.addressId === contact.addressId && (
                    <span className="px-3 py-1 bg-blue-500 text-white rounded-full text-xs">
                      Selected
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add New Contact Button */}
        {!showForm && (
          <button
            className="mt-4 px-6 py-2   text-white underline font-semibold   "
            onClick={handleAddNewContact}
          >
           + Add New Contact
          </button>
        )}

        {/* New Contact Form */}
        {showForm && (
          <form
            className={`mt-6 p-6 rounded-lg shadow-lg space-y-6 border-2 ${
              darkMode
                ? "bg-gray-900 text-gray-100 border-gray-700"
                : "bg-gray-100 text-gray-800 border-gray-300"
            }`}
            onSubmit={handleSubmitNewContact}
          >
            <h3 className="text-xl font-semibold mb-4">New Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(newContact).map(([field, value]) => (
                <div key={field} className="flex flex-col">
                  <label
                    htmlFor={field}
                    className="text-sm font-semibold text-gray-700 mb-2"
                  >
                    {field.replace(/([A-Z])/g, " $1").trim()}
                  </label>
                  <input
                    type="text"
                    id={field}
                    name={field}
                    placeholder={`Enter ${field.replace(/([A-Z])/g, " $1").trim()}`}
                    value={value}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-md border ${
                      darkMode
                        ? "bg-gray-700 border-gray-600 text-gray-100"
                        : "bg-gray-100 border-gray-300 text-gray-800"
                    }`}
                    required
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-end space-x-4">
              <button
                type="button"
                className="px-4 py-2 rounded-md font-semibold bg-gray-300 hover:bg-gray-400"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-md font-semibold bg-blue-500 text-white hover:bg-blue-600"
              >
                Save Contact
              </button>
            </div>
          </form>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <Link to="/user/select-car">
            <button className="px-6 py-3 bg-gray-400 text-white rounded-md hover:bg-gray-500">
              Back
            </button>
          </Link>
          <button
            onClick={handleNext}
            className="px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600"
            disabled={!selectedContact && showForm}
          >
            Next
          </button>
        </div>
      </main>
    </div>
  );
};

export default Address;
