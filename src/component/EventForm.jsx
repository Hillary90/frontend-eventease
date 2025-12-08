// src/components/Events/EventForm.jsx
// ------------------------------------------------------------
// This form is used for BOTH creating and editing events.
// It receives:
// - initial: event data (only when editing)
// - onSubmit: function that runs when the user submits the form
// - submitting: boolean that shows a loading state
// - submitLabel: text for the submit button
// ------------------------------------------------------------

import React, { useState } from "react";

export default function EventForm({
  initial = null,
  onSubmit,
  submitting = false,
  submitLabel = "Save"
}) {
  // ------------------------------------------------------------
  // FORM STATE
  // We store user input inside React useState hooks.
  // If "initial" data exists (edit mode), we fill the fields with it.
  // ------------------------------------------------------------
  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");

  // Convert backend ISO datetime → "YYYY-MM-DDThh:mm" for the input field
  const [startDatetime, setStartDatetime] = useState(
    initial?.start_datetime ? initial.start_datetime.slice(0, 16) : ""
  );

  const [endDatetime, setEndDatetime] = useState(
    initial?.end_datetime ? initial.end_datetime.slice(0, 16) : ""
  );

  const [category, setCategory] = useState(initial?.category || "");

  // A place to store error messages for each field
  const [errors, setErrors] = useState({});

  // ------------------------------------------------------------
  // VALIDATION FUNCTION
  // Checks if the user filled the form correctly.
  // If anything is wrong, errors are shown under the inputs.
  // ------------------------------------------------------------
  const validate = () => {
    const e = {};

    if (!title.trim()) e.title = "Title is required";
    if (!description.trim()) e.description = "Description is required";
    if (!startDatetime) e.start = "Start date/time is required";
    if (!endDatetime) e.end = "End date/time is required";

    // Make sure the end time is after the start time
    if (startDatetime && endDatetime) {
      if (new Date(endDatetime) <= new Date(startDatetime)) {
        e.end = "End time must be after start time";
      }
    }

    setErrors(e);
    return Object.keys(e).length === 0;
  };

  // ------------------------------------------------------------
  // HANDLE SUBMIT
  // This runs when the user clicks the submit button.
  // We validate → prepare data → pass it to the parent.
  // ------------------------------------------------------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    // Convert to the format backend expects (ISO 8601)
    const payload = {
      title: title.trim(),
      description: description.trim(),
      start_datetime: new Date(startDatetime).toISOString(),
      end_datetime: new Date(endDatetime).toISOString(),
      category: category.trim() || null
    };

    await onSubmit(payload);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-2xl mx-auto bg-white p-4 rounded shadow"
    >
      <h2 className="text-lg font-semibold mb-4">Event Details</h2>

      {/* TITLE FIELD */}
      <div className="mb-4">
        <label className="block font-medium">Title</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.title && (
          <p className="text-sm text-red-600">{errors.title}</p>
        )}
      </div>

      {/* DESCRIPTION FIELD */}
      <div className="mb-4">
        <label className="block font-medium">Description</label>
        <textarea
          rows={6}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description}</p>
        )}
      </div>

      {/* DATE & TIME FIELDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block font-medium">Start Date & Time</label>
          <input
            type="datetime-local"
            value={startDatetime}
            onChange={(e) => setStartDatetime(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.start && (
            <p className="text-sm text-red-600">{errors.start}</p>
          )}
        </div>

        <div>
          <label className="block font-medium">End Date & Time</label>
          <input
            type="datetime-local"
            value={endDatetime}
            onChange={(e) => setEndDatetime(e.target.value)}
            className="w-full border p-2 rounded"
          />
          {errors.end && <p className="text-sm text-red-600">{errors.end}</p>}
        </div>
      </div>

      {/* CATEGORY FIELD */}
      <div className="mb-4">
        <label className="block font-medium">Category</label>
        <input
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full border p-2 rounded"
          placeholder="e.g. workshop, concert"
        />
      </div>

      {/* SUBMIT BUTTON */}
      <button
        type="submit"
        disabled={submitting}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {submitting ? "Saving..." : submitLabel}
      </button>
    </form>
  );
}
