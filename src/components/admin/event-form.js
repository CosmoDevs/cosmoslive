"use client";
import React, { useState } from "react";
import { Card, Input, TextArea, ImageUpload, Button } from "../shared";

const EventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    description: "",
    image: null,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleImageChange = ({ file, preview, error }) => {
    if (error) {
      setErrors((prev) => ({
        ...prev,
        image: error,
      }));
      return;
    }
    setFormData((prev) => ({
      ...prev,
      image: { file, preview },
    }));
    if (errors.image) {
      setErrors((prev) => ({
        ...prev,
        image: "",
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!formData.date) {
      newErrors.date = "Date is required";
    }

    if (!formData.time) {
      newErrors.time = "Time is required";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      // Format date and time for API
      const datetime = new Date(
        `${formData.date}T${formData.time}`,
      ).toISOString();

      // Create FormData for file upload
      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("datetime", datetime);
      submitData.append("description", formData.description);
      if (formData.image?.file) {
        submitData.append("image", formData.image.file);
      }

      // TODO: Replace with your API endpoint
      // const response = await fetch('/api/events', {
      //   method: 'POST',
      //   body: submitData
      // });

      // Clear form on success
      setFormData({
        title: "",
        date: "",
        time: "",
        description: "",
        image: null,
      });

      // Show success message
      alert("Event created successfully!");
    } catch (error) {
      console.error("Error creating event:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create event. Please try again.",
      }));
    }
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Event
        </h2>

        <Input
          label="Event Title"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter event title"
          error={errors.title}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Date"
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            error={errors.date}
            required
          />

          <Input
            label="Time"
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            error={errors.time}
            required
          />
        </div>

        <TextArea
          label="Description"
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Enter event description"
          error={errors.description}
          required
          rows={6}
        />

        <ImageUpload
          label="Event Image"
          id="event-image"
          name="image"
          onChange={handleImageChange}
          error={errors.image}
        />

        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        <div className="flex justify-end space-x-4">
          <Button
            type="button"
            variant="secondary"
            onClick={() => {
              setFormData({
                title: "",
                date: "",
                time: "",
                description: "",
                image: null,
              });
              setErrors({});
            }}
          >
            Reset
          </Button>

          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Card>
  );
};

export default EventForm;
