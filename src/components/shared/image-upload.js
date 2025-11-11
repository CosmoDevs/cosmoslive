"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { formStyles } from "@/styles/formStyles";

const DEFAULT_ACCEPT_TYPE = "image/*";
const MAX_FILE_SIZE_MB = 5;
const MAX_FILE_SIZE = MAX_FILE_SIZE_MB * 1024 * 1024; // 5MB

const ImageUpload = ({
  label,
  id,
  name,
  onChange,
  error,
  required = false,
  accept = DEFAULT_ACCEPT_TYPE,
  maxSize = MAX_FILE_SIZE,
  className = "",
}) => {
  const [preview, setPreview] = useState(null);
  const [localError, setLocalError] = useState("");

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    if (file.size > maxSize) {
      setLocalError(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
      setPreview(null);
      onChange(null);
      return;
    }

    setLocalError("");
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onChange(e);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setLocalError("");
    onChange({ target: { files: [null] } });
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label htmlFor={id} className={formStyles.label}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className={formStyles.inputContainer}>
        <div className="space-y-1 text-center">
          {preview ? (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className={formStyles.previewImage}
              />
              <Button
                type="button"
                variant="secondary"
                className="mt-2"
                onClick={handleRemove}
              >
                Remove
              </Button>
            </div>
          ) : (
            <>
              <ArrowUpTrayIcon className={formStyles.uploadIcon} />
              <div className="flex text-sm text-gray-600">
                <label htmlFor={id} className={formStyles.uploadButton}>
                  <span>Upload a file</span>
                  <input
                    id={id}
                    name={name}
                    type="file"
                    accept={accept}
                    required={required}
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">
                PNG, JPG, GIF up to {MAX_FILE_SIZE_MB}MB
              </p>
            </>
          )}
        </div>
      </div>

      {(error || localError) && (
        <p className={formStyles.errorText}>{error || localError}</p>
      )}
    </div>
  );
};

export default ImageUpload;
