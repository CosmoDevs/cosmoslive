import React from "react";
import { formStyles } from "@/styles/formStyles";

const Input = ({
  label,
  type = "text",
  name,
  value,
  onChange,
  placeholder,
  required = false,
  error,
}) => (
  <div className="space-y-1">
    {label && (
      <label className={formStyles.label}>
        {label}
        {required && <span className={formStyles.requiredMark}>*</span>}
      </label>
    )}

    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      className={`${formStyles.input} ${
        error ? formStyles.inputError : formStyles.inputNormal
      }`}
    />

    {error && <p className={formStyles.errorText}>{error}</p>}
  </div>
);

export default Input;
