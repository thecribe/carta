import React from "react";

const Button = ({ children, handleButtonClick }) => {
  return (
    <button
      className="bg-gray-100 py-2 px-5 hover:bg-gray-200 smooth_transition rounded-sm  active:scale-95"
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
