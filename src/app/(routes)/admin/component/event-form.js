"use client";

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { string, mixed, object } from "yup";
import { Input, TextArea, ImageUpload } from "@/components/shared";
import { Card, Button } from "@/components/ui";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/jpg",
  "image/webp",
];

const EventSchema = object().shape({
  title: string().trim().required("Title is required"),
  datetime: string().required("Date and time are required"),
  description: string().trim().required("Description is required"),
  image: mixed()
    .required("Image is required")
    .test("fileSize", "File size too large (max 5MB)", (value) =>
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

  const handleImageChange = (e, setFieldValue, setFieldError) => {
    // Case 1: Custom object with error (from ImageUpload)
    if (e && e.error) {
      setFieldError("image", e.error);
      return;
    }

    // Case 2: Normal browser event (real upload)
    if (e && e.target && e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setFieldValue("image", file);
    }
  };

  const handleSubmit = async (
    values,
    { resetForm, setSubmitting, setStatus },
  ) => {
    try {
      const submitData = new FormData();
      submitData.append("title", values.title);
      submitData.append("datetime", new Date(values.datetime).toISOString());
      submitData.append("description", values.description);
      submitData.append("image", values.image);

      resetForm();
      setStatus({ success: "Event created successfully!" });
    } catch (error) {
      console.error("Error creating event:", error);
      setStatus({ error: "Failed to create event. Please try again." });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <Formik
        initialValues={initialValues}
        validationSchema={EventSchema}
        onSubmit={handleSubmit}
      >
        {({ setFieldValue, isSubmitting, isValid, dirty, status }) => (
          <Form className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Create New Event
            </h2>

            {/* Event Title */}
            <Field name="title">
              {({ field, meta }) => (
                <Input
                  label="Event Title"
                  id="title"
                  name="title"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter event title"
                  error={meta.touched && meta.error ? meta.error : ""}
                  required
                />
              )}
            </Field>

            {/* Date & Time */}
            <Field name="datetime">
              {({ field, meta }) => (
                <Input
                  label="Date & Time"
                  type="datetime-local"
                  id="datetime"
                  name="datetime"
                  value={field.value}
                  onChange={field.onChange}
                  error={meta.touched && meta.error ? meta.error : ""}
                  required
                />
              )}
            </Field>

            {/* Description */}
            <Field name="description">
              {({ field, meta }) => (
                <TextArea
                  label="Description"
                  id="description"
                  name="description"
                  value={field.value}
                  onChange={field.onChange}
                  placeholder="Enter event description"
                  error={meta.touched && meta.error ? meta.error : ""}
                  required
                  rows={6}
                />
              )}
            </Field>

            <Field name="image">
              {({ meta, form }) => (
                <ImageUpload
                  label="Event Image"
                  id="event-image"
                  name="image"
                  onChange={(e) =>
                    handleImageChange(e, form.setFieldValue, form.setFieldError)
                  }
                  error={meta.touched && meta.error ? meta.error : ""}
                  required
                />
              )}
            </Field>

            {/* Global status messages */}
            {status?.error && (
              <p className="text-red-500 text-sm">{status.error}</p>
            )}
            {status?.success && (
              <p className="text-green-600 text-sm">{status.success}</p>
            )}

            <div className="flex justify-end space-x-4">
              <Button
                type="reset"
                variant="secondary"
                onClick={() => {
                  window.location.reload(); // Simple reset to clear file preview too
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
