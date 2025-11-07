"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";

// Constants
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

    // Validate file size
    if (file.size > maxSize) {
      setLocalError(`File size must be less than ${MAX_FILE_SIZE_MB}MB`);
      setPreview(null);
      onChange(null); // clear the field value in form
      return;
    }

    // Clear any previous errors
    setLocalError("");

    // Generate preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onChange(e); // pass the event to Formik’s setFieldValue
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setPreview(null);
    setLocalError("");
    onChange({ target: { files: [null] } }); // mimic file clear
  };

  return (
    <div className={`mb-4 ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}

      <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
        <div className="space-y-1 text-center">
          {preview ? (
            <div className="mb-4">
              <img
                src={preview}
                alt="Preview"
                className="mx-auto h-32 w-32 object-cover rounded"
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
              <ArrowUpTrayIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label
                  htmlFor={id}
                  className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                >
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

      {/* Error Message */}
      {(error || localError) && (
        <p className="mt-1 text-sm text-red-500">{error || localError}</p>
      )}
    </div>
  );
};

export default ImageUpload;
