import React from "react";

const TextArea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  error,
  required = false,
  rows = 4,
  className = "",
}) => {
  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        rows={rows}
        className={`
          w-full px-3 py-2 border rounded-md shadow-sm
          placeholder-gray-400
          focus:outline-none focus:ring-blue-500 focus:border-blue-500
          ${error ? "border-red-500" : "border-gray-300"}
          ${className}
        `}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};

export default TextArea;
