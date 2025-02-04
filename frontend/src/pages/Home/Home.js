import React, { useState } from 'react';
import HeroSection from '../../components/HeroSection';

const Home = () => {
  // Initialize state for each data array
  const [features, setFeatures] = useState([
    {
      title: 'Service Management',
      description: 'Easily book, reschedule, and track services like oil changes, tire rotations, and more.',
    },
    {
      title: 'Payment Integration',
      description: 'Pay securely with our integrated payment gateways supporting multiple payment methods.',
    },
    {
      title: 'Service History',
      description: 'Access detailed records of your vehicle\'s past services to make informed decisions.',
    },
  ]);

  const [services, setServices] = useState([
    'Oil Change',
    'Tire Rotation',
    'Brake Inspection',
    'Battery Replacement',
    'Engine Tuning',
    'AC Repair',
  ]);

  const [testimonials, setTestimonials] = useState([
    {
      name: 'John Doe',
      feedback:
        'Wheely made it so easy to book my car maintenance. The process was seamless, and the service was top-notch!',
    },
    {
      name: 'Jane Smith',
      feedback:
        'I love how transparent the entire process is. I could track my service in real-time. Highly recommended!',
    },
    {
      name: 'Robert Brown',
      feedback:
        'The loyalty program is fantastic. I earned points for services and redeemed them for discounts.',
    },
  ]);

  const [faqs, setFaqs] = useState([
    {
      question: 'How do I book a service?',
      answer: 'You can book a service by signing into your account, selecting the service, and choosing a convenient date and time.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept major credit cards, debit cards, and digital wallets.',
    },
    {
      question: 'Can I cancel or reschedule a booking?',
      answer: 'Yes, you can cancel or reschedule a booking from your dashboard up to 24 hours before the scheduled time.',
    },
  ]);

  return (
    <div>
      <HeroSection />

      {/* Key Features Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-grey-100 dark:bg-gray-800 p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-semibold mb-4">{feature.title || "Feature Title"}</h3>
                <p className="text-gray-700 dark:text-gray-300">{feature.description || "Feature Description"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Services Section */}
      <section className="bg-blue-50 dark:bg-blue-900 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Popular Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md text-center hover:shadow-lg transition"
              >
                <h3 className="text-xl font-semibold">{service || "Service Name"}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Customers Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <p className="italic text-gray-700 dark:text-gray-300 mb-4">
                  "{testimonial.feedback || "No feedback available."}"
                </p>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-200">
                  - {testimonial.name || "Anonymous"}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-gray-100 dark:bg-gray-900 py-12">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold mb-2">{faq.question || "FAQ Question"}</h3>
                <p className="text-gray-700 dark:text-gray-300">{faq.answer || "FAQ Answer"}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-12">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to experience effortless car maintenance?</h2>
          <p className="text-lg mb-6">
            Join thousands of happy customers today. Sign up to explore our services and enjoy exclusive benefits!
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 dark:bg-yellow-500 dark:hover:bg-yellow-600 transition duration-200">
            Get Started Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
