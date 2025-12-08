// src/pages/CreateEventPage.jsx
// ------------------------------------------------------------
// This page is shown when the organizer wants to create a new event.
// It uses EventForm and sends the data to the backend.
// ------------------------------------------------------------

import { useState, useContext } from "react";
import EventForm from "../component/EventForm";
import { createEvent } from "../api/eventService";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function CreateEventPage() {
  const navigate = useNavigate();
  const { token } = useContext(AuthContext);

  // Local state for UI feedback
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  // ------------------------------------------------------------
  // Runs when the form submits valid data
  // ------------------------------------------------------------
  const handleCreate = async (payload) => {
    try {
      setError(null);
      setSubmitting(true);

      // Send data to the backend
      const event = await createEvent(payload, token);

      // Redirect to the event details page
      navigate(`/event/${event.id}`);
    } catch (err) {
      setError(err.body?.detail || "Failed to create event");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-4">
      {/* Error message (if any) */}
      {error && <p className="text-red-600">{error}</p>}

      {/* Reuse EventForm for creating */}
      <EventForm
        onSubmit={handleCreate}
        submitting={submitting}
        submitLabel="Create Event"
      />
    </div>
  );
}
