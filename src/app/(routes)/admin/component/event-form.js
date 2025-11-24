"use client";

import React from "react";
import { Formik, Form, Field } from "formik";
import { string, mixed, object } from "yup";
import { Input, TextArea } from "@/components/shared";
import ImageUpload from "@/components/shared/image-upload";
import { Card } from "@/components/ui";
import { Button } from "@/components/ui";
import { formStyles } from "@/styles/formStyles";

const resizeImageToBase64 = (file, maxWidth = 400) =>
  new Promise((resolve) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (e) => {
      img.src = e.target.result;
    };

    img.onload = () => {
      const scale = maxWidth / img.width;
      const canvas = document.createElement("canvas");

      canvas.width = maxWidth;
      canvas.height = img.height * scale;

      const ctx = canvas.getContext("2d");
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const resizedBase64 = canvas.toDataURL("image/jpeg", 0.9);

      resolve(resizedBase64);
    };

    reader.readAsDataURL(file);
  });

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const EventSchema = object().shape({
  title: string().trim().required("Title is required"),
  datetime: string().required("Date & time are required"),
  description: string().trim().required("Description is required"),
  image: mixed()
    .nullable()
    .required("Image is required")
    .test("fileSize", "File too large (max 5MB)", (value) =>
      value ? value.size <= MAX_IMAGE_SIZE : false,
    )
    .test("fileType", "Unsupported file format", (value) =>
      value ? ACCEPTED_IMAGE_TYPES.includes(value.type) : false,
    ),
});

const EventForm = () => {
  const initialValues = {
    title: "",
    datetime: "",
    description: "",
    image: null,
  };

  const handleImageChange = (e, setFieldValue) => {
    const file = e?.target?.files?.[0] || null;
    setFieldValue("image", file);
  };

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus },
  ) => {
    try {
      const base64Thumb = await resizeImageToBase64(values.image, 400);

      const newEvent = {
        title: values.title,
        datetime: values.datetime,
        description: values.description,
        image: base64Thumb,
      };

      const existing = JSON.parse(localStorage.getItem("events")) || [];
      existing.push(newEvent);

      localStorage.setItem("events", JSON.stringify(existing));

      resetForm();
      setStatus({ success: "Event created successfully!" });
    } catch (error) {
      console.error(error);
      setStatus({ error: "Failed to create event. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto p-8">
      <Formik
        initialValues={initialValues}
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ setFieldValue, values, isSubmitting, isValid, dirty, status }) => (
          <Form className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Create New Event
            </h2>

            {/* TITLE */}
            <Field name="title">
              {({ field, meta }) => (
                <Input
                  label="Event Title"
                  value={field.value}
                  onChange={(e) => setFieldValue("title", e.target.value)}
                  error={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            {/* DATE-TIME */}
            <Field name="datetime">
              {({ field, form, meta }) => (
                <Input
                  label="Date & Time"
                  type="datetime-local"
                  value={
                    field.value
                      ? new Date(field.value).toISOString().slice(0, 16)
                      : ""
                  }
                  onChange={(e) =>
                    form.setFieldValue("datetime", e.target.value)
                  }
                  error={meta.touched && meta.error ? meta.error : ""}
                />
              )}
            </Field>

            {/* DESCRIPTION */}
            <Field name="description">
              {({ field, form, meta }) => (
                <TextArea
                  label="Description"
                  value={field.value}
                  onChange={(e) =>
                    form.setFieldValue("description", e.target.value)
                  }
                  error={meta.touched && meta.error ? meta.error : ""}
                  rows={5}
                />
              )}
            </Field>

            {/* IMAGE UPLOAD */}
            <Field name="image">
              {({ meta, form }) => (
                <ImageUpload
                  label="Event Image"
                  value={form.values.image}
                  onChange={(e) => handleImageChange(e, form.setFieldValue)}
                  error={meta.touched && meta.error ? meta.error : ""}
                  required
                />
              )}
            </Field>

            {/* STATUS MESSAGES */}
            {status?.success && (
              <p className={formStyles.statusSuccess}>{status.success}</p>
            )}
            {status?.error && (
              <p className={formStyles.statusError}>{status.error}</p>
            )}

            {/* BUTTONS */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => {
                  setFieldValue("title", "");
                  setFieldValue("datetime", "");
                  setFieldValue("description", "");
                  setFieldValue("image", null);
                }}
              >
                Reset
              </Button>

              <Button
                type="submit"
                disabled={isSubmitting || !(isValid && dirty)}
                className={
                  !isValid || !dirty ? "opacity-50 cursor-not-allowed" : ""
                }
              >
                {isSubmitting ? "Creating..." : "Create Event"}
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Card>
  );
};

export default EventForm;
