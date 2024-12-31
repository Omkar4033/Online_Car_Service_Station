import React from "react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Omkar Raghu",
      role: "Founder & CEO",
      description:
        "John is a seasoned entrepreneur passionate about revolutionizing the car service industry. With years of experience in automotive services, he leads the vision of our company.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Prajwal Shinde",
      role: "CTO",
      description:
        "Jane spearheads all technology initiatives, ensuring that our platform remains secure, fast, and user-friendly. She's an expert in full-stack development and cloud technologies.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Sanket Devray",
      role: "Marketing Lead",
      description:
        "Emily crafts engaging campaigns that bring our services closer to our customers. Her creativity and strategic approach have significantly grown our user base.",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Sachin ",
      role: "Operations Manager",
      description:
        "Michael ensures that our services run smoothly and efficiently. He coordinates between service centers and customers to provide a seamless experience.",
      image: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto">
          Welcome to the Online Car Service Station – your trusted partner for convenient, reliable, and high-quality car maintenance. We provide a platform for customers to book car services, track service history, and manage payments effortlessly.
        </p>

        {/* Mission and Vision */}
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              Our mission is to make car maintenance hassle-free. With
              cutting-edge technology and customer-first values, we ensure
              timely and transparent service for every vehicle.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To be a global leader in car maintenance services by fostering
              trust, transparency, and technological innovation, creating a
              seamless experience for our customers.
            </p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="bg-blue-50 dark:bg-blue-900 p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-semibold mb-3 text-center">
            Why Choose Us?
          </h3>
          <ul className="list-disc list-inside space-y-2">
            <li>Convenient booking and scheduling for car maintenance.</li>
            <li>Comprehensive service tracking with real-time updates.</li>
            <li>Secure payment gateway for a seamless transaction experience.</li>
            <li>Expert technicians and trusted service partners.</li>
          </ul>
        </div>

        {/* Our Team */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-center mb-8">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <p className="text-blue-600 dark:text-yellow-400">{member.role}</p>
                <p className="mt-2 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-8 text-center">
          <h4 className="text-lg font-semibold">
            Let us take care of your car – so you can focus on the road ahead!
          </h4>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
