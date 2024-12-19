import React from "react";


const Logo = (darkMode) => (
  <img
    src={darkMode ? "/assets/images/logo-dark.png" :"/assets/images/logo-light.png"}
    alt="Logo"
    className="h-12 w-15 mr-2"
  />
);

export default Logo;
