import React from "react";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  onClick,
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
  };

  const styles = `${baseStyles} ${variants[variant]} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  return (
    <button
      type={type}
      className={styles}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
