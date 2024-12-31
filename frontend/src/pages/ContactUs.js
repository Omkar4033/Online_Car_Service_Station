import React, { useState } from "react";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    console.log("Form submitted:", formData);
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">Contact Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-12">
          Have questions or need assistance? Feel free to reach out to us. We're here to help!
        </p>

        <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
          {submitted && (
            <p className="text-green-500 text-center font-semibold mb-4">
              Thank you for your message! We’ll get back to you soon.
            </p>
          )}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                placeholder="Your Name"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="Your Email"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows="5"
                placeholder="Your Message"
                className="w-full px-4 py-2 rounded-md bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 focus:ring-2 focus:ring-blue-400 dark:focus:ring-yellow-500 outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition duration-200 font-semibold"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Map Section */}
        <div className="mt-12 text-center">
          <h2 className="text-lg font-bold mb-4">Our Location</h2>
          <div className="relative overflow-hidden h-72 md:h-96 rounded-lg shadow-md">
            <iframe
              className="w-full h-full"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d55218.136638937605!2d73.71423443042137!3d18.597442053123242!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1735648135462!5m2!1sen!2sin"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              title="Company Head Office Location"
            ></iframe>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-lg font-bold">Our Address</h2>
          <p>Hinjewadi Phase2 , pune ,411002</p>
          <p>Email: support@wheely.com | Phone: +1 234-567-890</p>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
