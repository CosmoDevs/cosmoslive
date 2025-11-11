import React from "react";
import { formStyles } from "@/styles/formStyles";

const TextArea = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  required = false,
  rows = 4,
  error,
}) => (
  <div className="space-y-1">
    {label && (
      <label className={formStyles.label}>
        {label}
        {required && <span className={formStyles.requiredMark}>*</span>}
      </label>
    )}

    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      rows={rows}
      className={`${formStyles.textArea} ${
        error ? formStyles.inputError : formStyles.inputNormal
      }`}
    />

    {error && <p className={formStyles.errorText}>{error}</p>}
  </div>
);

export default TextArea;
