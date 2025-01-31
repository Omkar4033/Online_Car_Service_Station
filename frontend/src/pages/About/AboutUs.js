import React from "react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Omkar Raghu",
      role: "Founder & CEO",
      description:
        "Omkar is a seasoned entrepreneur passionate about revolutionizing the car service industry. With years of experience in automotive services, he leads the vision of our company.",
        image: "https://avataaars.io/?avatarStyle=Circle&topType=WinterHat4&hairColor=BrownDark&clotheType=BlazerShirt",
    },
    {
      name: "Prajwal Shinde",
      role: "CTO",
      description:
        "Prajwal spearheads all technology initiatives, ensuring that our platform remains secure, fast, and user-friendly. He's an expert in full-stack development and cloud technologies.",
      image: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairTheCaesar&hairColor=Brown&clotheType=Hoodie",
    },
    {
      name: "Sanket Devray",
      role: "Marketing Lead",
      description:
        "Sanket crafts engaging campaigns that bring our services closer to our customers. His creativity and strategic approach have significantly grown our user base.",
      image: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairDreads01&hairColor=Black&clotheType=BlazerSweater",
    },
    {
      name: "Sachin",
      role: "Operations Manager",
      description:
        "Sachin ensures that our services run smoothly and efficiently. He coordinates between service centers and customers to provide a seamless experience.",
        image: "https://avataaars.io/?avatarStyle=Circle&topType=ShortHairShortFlat&hairColor=Black&clotheType=CollarSweater",

    },
  ];


  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-100">
      <div className="container mx-auto px-6 py-12">
        <div>

        <h1 className="text-4xl font-bold text-center mb-6">About Us</h1>
        <p className="text-lg text-center max-w-2xl mx-auto mb-8">
          Welcome to the Online Car Service Station – your trusted partner for
          convenient, reliable, and high-quality car maintenance. We provide a
          platform for customers to book car services, track service history, and
          manage payments effortlessly.
        </p>
        </div>

        {/* Mission and Vision */}
        <div className="my-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p>
              Our mission is to make car maintenance hassle-free. With cutting-edge
              technology and customer-first values, we ensure timely and transparent
              service for every vehicle.
            </p>
          </div>
          <div>
            <h2 className="text-2xl font-semibold mb-4">Our Vision</h2>
            <p>
              To be a global leader in car maintenance services by fostering trust,
              transparency, and technological innovation, creating a seamless experience
              for our customers.
            </p>
          </div>
        </div>

     {/* Why Choose Us */}
<div className="my-12">
  <h2 className="text-2xl font-bold text-center mb-6">Why Choose Us?</h2>
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
      <div className="bg-yellow-350 text-white p-4 rounded-full mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m5-2h-5V9h5a2 2 0 100-4h-5V3a4 4 0 014 4z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Convenient Booking</h3>
      <p>Effortlessly book and schedule car maintenance at your convenience, anytime and anywhere.</p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
      <div className="bg-yellow-350 text-white p-4 rounded-full mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Real-time Updates</h3>
      <p>Track your service status with real-time updates to stay informed about your car’s maintenance.</p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
      <div className="bg-yellow-350 text-white p-4 rounded-full mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 3H6a2 2 0 00-2 2v14a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2h-4M10 3v14h8V5h-8z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Secure Payments</h3>
      <p>Enjoy secure and seamless payments for your car services, ensuring peace of mind with every transaction.</p>
    </div>

    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md text-center transform hover:scale-105 transition-transform duration-300">
      <div className="bg-yellow-350 text-white p-4 rounded-full mx-auto mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-8 w-8 mx-auto">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v12h8l-4 4-4-4h4z" />
        </svg>
      </div>
      <h3 className="text-lg font-semibold mb-2">Expert Technicians</h3>
      <p>Our trusted service partners and skilled technicians ensure top-notch service for your car.</p>
    </div>
  </div>
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
                <p className="text-yellow-400 dark:text-yellow-400">{member.role}</p>
                <p className="mt-2 text-sm">{member.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">How It Works</h2>
          <p className="text-center max-w-2xl mx-auto mb-6">
            We make car maintenance easier than ever! Here’s how our process works:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Step 1: Book a Service</h3>
              <p>Simply choose the service you need and schedule a convenient time for the appointment.</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Step 2: Service Completion</h3>
              <p>Our expert technicians will perform the service with the highest quality standards.</p>
            </div>
            <div className="text-center bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-2">Step 3: Enjoy Your Ride</h3>
              <p>Once the service is completed, your car is ready to hit the road again, hassle-free.</p>
            </div>
          </div>
        </div>

        {/* Contact Us */}
        <div className="my-12">
          <h2 className="text-2xl font-semibold mb-4 text-center">Contact Us</h2>
          <p className="text-center max-w-2xl mx-auto mb-6">
            Have any questions? Get in touch with us today!
          </p>
          <div className="text-center">
            <p>Email: contact@carservice.com</p>
            <p>Phone: (123) 456-7890</p>
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
