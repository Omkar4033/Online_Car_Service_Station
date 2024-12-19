import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section
      className="relative bg-cover bg-center text-white"
      style={{
        backgroundImage: "url('/assets/images/hero.jpg')",
        height: "100vh", // Full-screen height
      }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 flex flex-col items-center justify-center h-full text-center">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6 drop-shadow-md">
          Welcome to <span className="text-yellow-300">Wheely</span>
        </h1>
        <p className="text-lg md:text-2xl mb-8 max-w-2xl drop-shadow-md">
          Your one-stop platform for seamless vehicle services. Explore, book,
          and enjoy effortless rides with our reliable mechanics and service
          providers.
        </p>
        <div className="space-x-4">
          <Link
            to="/services"
            className="bg-yellow-300 text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition shadow-lg"
          >
            Explore Services
          </Link>
          <Link
            to="/about"
            className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition shadow-lg"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
