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

  /** 🔹 Handle text and date/time input changes */
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  /** 🔹 Handle image uploads */
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

  /** 🔹 Validate form fields */
  const validateForm = () => {
    const newErrors = {};
    const now = new Date();

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

    // 🔸 Combine and validate date/time
    if (formData.date && formData.time) {
      const selectedDateTime = new Date(`${formData.date}T${formData.time}`);
      if (selectedDateTime < now) {
        newErrors.date = "Event date/time cannot be in the past";
        newErrors.time = "Event date/time cannot be in the past";
      }
    }

    return newErrors;
  };

  /** 🔹 Handle submit event */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const datetime = new Date(
        `${formData.date}T${formData.time}`,
      ).toISOString();

      const submitData = new FormData();
      submitData.append("title", formData.title);
      submitData.append("datetime", datetime);
      submitData.append("description", formData.description);
      if (formData.image?.file) {
        submitData.append("image", formData.image.file);
      }

      alert("Event created successfully!");

      // Reset form
      setFormData({
        title: "",
        date: "",
        time: "",
        description: "",
        image: null,
      });
      setErrors({});
    } catch (error) {
      console.error("Error creating event:", error);
      setErrors((prev) => ({
        ...prev,
        submit: "Failed to create event. Please try again.",
      }));
    }
  };

  /** 🔹 Handle form reset */
  const handleReset = () => {
    setFormData({
      title: "",
      date: "",
      time: "",
      description: "",
      image: null,
    });
    setErrors({});
  };

  return (
    <Card className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          Create New Event
        </h2>

        {/* Event Title */}
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

        {/* Date and Time */}
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
            min={new Date().toISOString().split("T")[0]} // Prevent past dates
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

        {/* Description */}
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

        {/* Image Upload */}
        <ImageUpload
          label="Event Image"
          id="event-image"
          name="image"
          onChange={handleImageChange}
          error={errors.image}
        />

        {/* Submit Error */}
        {errors.submit && (
          <p className="text-red-500 text-sm">{errors.submit}</p>
        )}

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <Button type="button" variant="secondary" onClick={handleReset}>
            Reset
          </Button>

          <Button type="submit">Create Event</Button>
        </div>
      </form>
    </Card>
  );
};

export default EventForm;
