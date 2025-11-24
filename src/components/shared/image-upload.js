"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui";
import { ArrowUpTrayIcon } from "@heroicons/react/24/outline";
import { formStyles } from "@/styles/formStyles";

const ImageUpload = ({ label, id, name, onChange, error, required, value }) => {
  // Preview derives from value directly
  const [localPreview, setLocalPreview] = useState(null);
  const preview = value ? localPreview : null;

  const handleFileChange = (e) => {
    const file = e?.target?.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setLocalPreview(reader.result);
      onChange(e);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setLocalPreview(null);
    onChange({ target: { files: [null] } });
  };

  return (
    <div>
      <label htmlFor={id} className={formStyles.label}>
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <div className={formStyles.uploadContainer}>
        {!preview ? (
          <div className={formStyles.uploadInner}>
            <ArrowUpTrayIcon className={formStyles.uploadIcon} />

            <label htmlFor={id} className={formStyles.uploadButton}>
              Upload a file
              <input
                id={id}
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                required={required}
              />
            </label>

            <p className={formStyles.uploadSubText}>or drag and drop</p>
            <p className={formStyles.uploadInfoText}>PNG, JPG, GIF up to 5MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <img
              src={preview}
              alt="Preview"
              className="h-40 w-40 object-cover rounded-xl"
            />

            <Button
              type="button"
              variant="secondary"
              onClick={handleRemove}
              className="mt-2"
            >
              Remove
            </Button>
          </div>
        )}
      </div>

      {error && <p className={formStyles.errorText}>{error}</p>}
    </div>
  );
};

export default ImageUpload;
