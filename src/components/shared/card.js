import React from "react";

const Card = ({ children, className = "", padding = "normal" }) => {
  const paddingStyles = {
    small: "p-3",
    normal: "p-4",
    large: "p-6",
  };

  return (
    <div
      className={`bg-white rounded-lg shadow-md ${paddingStyles[padding]} ${className}`}
    >
      {children}
    </div>
  );
};

export default Card;
