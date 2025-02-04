import React from "react";

const Button = ({ children, handleButtonClick }) => {
  return (
    <button
      className="bg-primary_color text-secondary_text_color py-2 border border-transparent px-5 hover:bg-transparent hover:border-primary_color hover:text-primary_color smooth_transition rounded-sm  active:scale-95"
      onClick={handleButtonClick}
    >
      {children}
    </button>
  );
};

export default Button;
